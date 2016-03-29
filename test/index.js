import path from 'path'
import fs from 'fs'
import tape from 'tape'
import gutil from 'gulp-util'
import gettext from '../src'

const createVinyl = function (filename, contents) {
	const base = path.join(__dirname, 'fixtures')
	const filePath = path.join(base, filename)

	return new gutil.File({
		cwd: __dirname,
		base: base,
		path: filePath,
		contents: contents || fs.readFileSync(filePath)
	})
}

tape('empty file', t => {
	const stream = gettext()
	const emptyFile = {
		isNull: () => true
	}

	stream.on('data', data => {
		t.equal(data, emptyFile)
		t.end()
	})

	stream.write(emptyFile)
})

tape('stream file', t => {
	const stream = gettext()
	const streamFile = {
		isNull: () => false,
		isStream: () => true
	}

	stream.on('error', err => {
		t.equal(err.message, 'Streaming not supported.')
		t.end()
	})

	stream.write(streamFile)
})

tape('compile empty file', t => {
	const stream = gettext()
	const poFile = createVinyl('empty.po')
	const expected = path.join(__dirname, 'expected/empty.mo')

	stream.on('data', data => {
		t.ok(data, 'should exists')
		t.ok(data.path, 'should have path property')
		t.ok(data.relative, 'should have relative property')
		t.ok(data.contents, 'should have contents property')
		t.equal(
			String(data.contents),
			fs.readFileSync(expected, 'utf-8'), 'file.contents should be as expected.')
		t.end()
	})

	stream.write(poFile)
})

tape('compile a valid file', t => {
	const stream = gettext()
	const poFile = createVinyl('normal.po')
	const expected = path.join(__dirname, 'expected/normal.mo')

	stream.on('data', data => {
		t.ok(data, 'should exists')
		t.ok(data.path, 'should have path property')
		t.ok(data.relative, 'should have relative property')
		t.ok(data.contents, 'should have contents property')
		t.equal(
			String(data.contents),
			fs.readFileSync(expected, 'utf-8'), 'file.contents should be as expected.')
		t.end()
	})

	stream.write(poFile)
})

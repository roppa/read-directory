const fsMock = require('mock-fs');
const test = require('tape').test;
let fr = require('../');

test('Build', t => {
  fsMock({
    files: {
      'a.pdf': 'a file',
      'x.xyz': 'an ignored file',
      'empty-dir': {},
      'a-2015': {
        jan: {
          'b.pdf': 'b file',
          'c.pdf': 'c file',
          'd.pdf': 'd file',
        },
        feb: {
          'e.pdf': 'e file',
          'f.pdf': 'f file',
          'g.pdf': 'g file',
        },
        march: {
          'h.pdf': 'h file',
          'i.pdf': 'i file',
          'j.pdf': 'j file',
        },
        'ignore.xyz': 'should be ignored',
      },
    },
    ignored: {},
  });
  t.end();
});

test('readDeepDirectory function', assert => {

  assert.plan(8);

  fr.readDeepDirectory()
    .catch(error => {
      assert.equal(typeof error === 'object', true, 'should reject when no folder');
    });

  fr.readDeepDirectory('files')
    .then(result => {
      assert.equals(Array.isArray(result), true, 'should return an array');
      assert.equals(result.length, 12, 'should be 12 elements');
    });

  fr.readDeepDirectory('files', { xyz: null })
    .then(result => {
      assert.equals(Array.isArray(result), true, 'should return an array');
      assert.equals(result.length, 10, 'should be 10 elements');
    });

  fr.readDeepDirectory('files', { xyz: null }, fileObj => ({ filePath: fileObj.file }))
    .then(result => {
      assert.equals(Array.isArray(result), true, 'should return an array');
      assert.equals(result.length, 10, 'should be 3 elements');
      assert.equals(result[0].hasOwnProperty('filePath'), true, 'should massage data');
    });

});

test('Teardown', t => {
  fsMock.restore();
  t.end();
});

'use strict';

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

test('readDirectory function', assert => {

  assert.plan(5);

  fr.readDirectory()
    .catch(error => {
      assert.equal(typeof error === 'object', true, 'should reject when no folder');
    });

  fr.readDirectory('files')
    .then(result => {
      assert.equals(Array.isArray(result), true, 'should return an array');
      assert.equals(result.length, 4, 'should be 3 elements');
    });

  fr.readDirectory('files', { xyz: null })
    .then(result => {
      assert.equals(Array.isArray(result), true, 'should return an array');
      assert.equals(result.length, 3, 'should be 3 elements');
    });

});

test('Teardown', t => {
  fsMock.restore();
  t.end();
});

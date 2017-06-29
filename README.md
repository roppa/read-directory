# read-directory

[![Build Status](https://travis-ci.org/roppa/read-directory.svg?branch=master)](https://travis-ci.org/roppa/read-directory)

[![Coverage Status](https://coveralls.io/repos/github/roppa/read-directory/badge.svg?branch=master)](https://coveralls.io/github/roppa/read-directory?branch=master)

Read a folder recursively and get a list of all files.

##readDirectory('path/to/folder'[,ignoreObject])

Where ignoreObject is something like:

```javascript
{
  pdf: null,
  doc: null,
  docx: null
}
```

Returns a promise which resolves an array of file paths.

## readDeepDirectory('path/to/folder'[,ignoreObject,readCallback])

Returns a promise which resolves an array of file paths.

If a callback is supplied, the stat object is returned along with a 'file' attribute with the full file path.

## Test

```javascript
npm run test
```

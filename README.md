#read-directory

Read a folder recursively and get a list of all files.

##readDirectory('path/to/folder'[,ignoreObject])

Where ignoreObject is something like:

```
{
  pdf: null,
  doc: null,
  docx: null
}
```

Returns a promise which resolves an array of file paths.

##readDeepDirectory('path/to/folder'[,ignoreObject,readCallback])

Returns a promise which resolves an array of file paths.

If a callback is supplied, the stat object is returned along with a 'file' attribute with the full file path.

##Test

```
npm run test
```

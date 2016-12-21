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

##readDeepDirectory('path/to/folder'[,ignoreObject])

Returns a promise which resolves an array of file paths.

##Test

```
npm run test
```

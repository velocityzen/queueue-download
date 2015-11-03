# queueue-download
## File download queue with unique file names support

## Instalation

`npm install queueue-download`

## Usage
```js
let download = require("queueue-download").download;

let files = [
  {
    remote: 'url://to/remote/file',
    local: '/localpath/to/file'
  },
  {
    remote: 'url://to/remote/file',
    local: '/localpath/to/file'
  }
];

download(files, function(err, res) {
  //res is an array of {path: 'filepath', error: 'error if occurred'}
  cb(err, res);
});
```

### Options
#### download(files, opts, cb);

* force — force path creation
* concurrency — is a cuncurrency, 'auto' or undefined is equals to cpus number

### Id
Also you can add an `id` field to the files, and it will be returned in the result.


License: MIT

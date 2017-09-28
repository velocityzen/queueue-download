# queueue-download

[![NPM Version](https://img.shields.io/npm/v/queueue-download.svg?style=flat-square)](https://www.npmjs.com/package/queueue-download)
[![NPM Downloads](https://img.shields.io/npm/dt/queueue-download.svg?style=flat-square)](https://www.npmjs.com/package/queueue-download)

## File download queue with unique file names support

## Instalation

`npm i queueue-download`

## Usage
```js
const download = require('queueue-download').download;

const files = [
  {
    remote: 'url://to/remote/file',
    local: '/localpath/to/file'
  },
  {
    remote: 'url://to/remote/file',
    local: '/localpath/to/file'
  }
];

download(files, (err, res) => {
  //res is an array of {path: 'filepath', error: 'error if occurred'}
  console.log(err, res);
});
```

### Options
#### download(files, opts, cb);

* force — force path creation
* concurrency — number of simultaneous downloads, 'auto' or undefined are equals to cpus number

### Id
Also you can add an `id` field to the files, and it will be returned in the result.

## Unique file names

You can use pattern in the local file name as described in the [fsu](https://github.com/velocityzen/fsu) module

License: MIT

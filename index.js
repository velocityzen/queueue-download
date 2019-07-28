'use strict';
const Q = require('queueue');
const fsu = require('fsu');
const got = require('got');

function createResult(file, data) {
  const res = {
    ...data
  }

  if (file.id) {
    res.id = file.id
  }

  return res;
}

function downloadFile(result, index, file, force) {
  return new Promise(resolve => {
    const fileStream = fsu.createWriteStreamUnique(file.local, { force });

    got(file.remote, {
      stream: true
    })
      .on('error', error => {
        result[index] = createResult(file, { error });
        resolve();
      })
      .pipe(fileStream)
      .on('finish', () => {
        result[index] = createResult(file, { path: fileStream.path });
        resolve();
      })
      .on('error', error => {
        result[index] = createResult(file, { error });
        resolve();
      });
  });
}

function download(files, opts = {}) {
  return new Promise(resolve => {
    const result = [];
    const q = new Q(opts.concurrency)
      .bind(null, downloadFile)
      .on('drain', () => resolve(result));

    files.forEach((file, index) => q.push({ args: [ result, index, file, opts.force ] }));
  });
}

module.exports = download;

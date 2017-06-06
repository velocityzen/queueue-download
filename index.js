'use strict';
const Q = require('queueue');
const fsu = require('fsu');
const got = require('got');

const Download = function(files, opts, cb) {
  if (!cb) {
    cb = opts;
    opts = {};
  }

  this.force = opts.force;
  this.res = [];
  let error;

  const q = new Q(opts.concurrency)
    .bind(this)
    .on('drain', () => cb(error, this.res))
    .on('error', err => {
      error = err
    });

  for (var i in files) {
    q.push({
      method: 'download',
      args: [ i, files[i] ]
    });
  }
}

Download.prototype.download = function(index, file, cb) {
  const fileStream = fsu.createWriteStreamUnique(file.local, { force: this.force });

  got
    .stream(file.remote)
    .pipe(fileStream)
    .on('finish', () => {
      this.res[index] = { path: fileStream.path };

      if (file.id) {
        this.res[index].id = file.id;
      }

      cb();
    })
    .on('error', cb);
};

const download = function(files, opts, cb) {
  return new Download(files, opts, cb);
};

module.exports = {
  Download,
  download
};

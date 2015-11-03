'use strict';
let Q = require('queueue');
let fsu = require('fsu');
let request = require('request');

let Download = function(files, opts, cb) {
  if (!cb) {
    cb = opts;
    opts = {};
  }

  this.force = opts.force;
  this.res = [];
  let self = this;
  let error;

  let q = new Q(opts.concurrency)
    .bind(this)
    .on('drain', function() {
      cb(error, self.res);
    })
    .on('error', function(err) {
      error = err;
    });

  for (var i in files) {
    q.push({
      method: 'download',
      args: [ i, files[i] ]
    });
  }
}

Download.prototype.download = function(index, file, cb) {
  let self = this;
  let fileStream = fsu.createWriteStreamUnique(file.local, { force: this.force });

  request(file.remote)
    .pipe(fileStream)
    .on('finish', function() {
      self.res[index] = {
        id: file.id,
        path: fileStream.path
      };
      cb();
    })
    .on('error', cb);
};

let download = function(files, opts, cb) {
  return new Download(files, opts, cb);
};

module.exports = {
  Download,
  download
};

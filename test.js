'use strict';
const download = require('./index').download;

const files = [
  {
    remote: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    local: './google{_###}.png'
  },
  {
    remote: 'https://s.yimg.com/zz/nn/lib/metro/g/my/yahoo_en-US_f_p_190x45_2x.png',
    local: './google{_###}.png'
  }
];

download(files, (err, res) => {
  //res is an array of {path: 'filepath', error: 'error if occurred'}
  console.log(err, res);
});

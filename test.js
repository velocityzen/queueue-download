'use strict';
const del = require('del');
const test = require('ava');
const download = require('./index');

test.after.always(() => del([ './test' ]));

const files = [
  {
    remote: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    local: './test/local{_###}.png',
    id: 'first'
  },
  {
    remote: 'https://s.yimg.com/zz/nn/lib/metro/g/my/yahoo_en-US_f_p_190x45_2x.png',
    local: './test/local{_###}.png'
  },
  {
    remote: 'https://example.com/doesntexist',
    local: './test/local{_###}.png'
  }
];

test('downloads files', async t => {
  const res = await download(files, { concurrency: 1, force: true });
  t.is(res.length, 3);
  t.is(res[0].id, 'first');
  t.truthy(res[0].path);
  t.truthy(res[1].path);
  t.truthy(res[2].error);
})

test('failed to create files', async t => {
  const res = await download([
    {
      remote: 'doesntexist',
      local: './doesntexist/file'
    }
  ]);

  t.is(res.length, 1);
  t.truthy(res[0].error);
})


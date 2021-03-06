#!/usr/bin/env node

/* eslint-env node */
/* eslint-disable no-console */

'use strict';

const path = require('path');
const localSetting = require('./../setting/setting.server.local');

const baseDir = path.resolve(__dirname, '..');
const port = localSetting.front.port || 8007;
const staticHost = localSetting.site.static.host || 'localhost';

const front = require('gap-node-front')({
  baseDir: baseDir,
  port: port,
  staticHost: staticHost,
  webpack: {
    publicSlug: {
      dev: 'front/dev/js',
      dist: 'front/dist/js'
    },
    contextDir: 'src/js/web',
    outputDir: {
      dev: 'site/static/front/dev/js',
      dist: 'site/static/front/dist/js'
    },
    alias: {},
    modules: [
      'node_modules',
      'src/js/lib',
      'src/js/internal',
      'src/js/third'
    ],
    entry: {
      main: './main.js'
    },
  },
  public: {
    publicSlug: {
      dev: '*',
      dist: '*'
    },
    publicDir: 'site/public'
  }
});

const cmd = process.argv[2];

if (cmd === 'server') {
  front.runServer();
} else if (cmd === 'release') {
  front.release();
}

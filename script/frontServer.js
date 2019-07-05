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
            dev: 'dev/js',
            dist: 'dist/js'
        },
        contextDir: 'src/js/web',
        outputDir: {
            dev: 'site/static/dev/js',
            dist: 'site/static/dist/js'
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
    scss: {
        publicSlug: {
            dev: 'dev/css',
            dist: 'dist/css'
        },
        inputDir: 'src/scss',
        outputDir: {
            dev: 'site/static/dev/css',
            dist: 'site/static/dist/css'
        },
        includePaths: []
    },
    public: {
        publicSlug: '',
        publicDir: 'site/public'
    }
});

const cmd = process.argv[2];

if (cmd === 'server') {
    front.runServer();
} else if (cmd === 'release') {
    front.release();
}

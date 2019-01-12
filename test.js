#!/usr/bin/env node

'use strict';

const nomnom = require('nomnom');
const gitTag = require('git-tag-version');
const opts = nomnom
    .option('directory', {
        required: true,
        abbr: 'd',
        full: 'directory',
        help: 'Directory'
    })
    .option('baseVersion', {
        abbr: 'b',
        full: 'baseVersion',
        required: true,
        type: 'string',
        help: 'Base version (<MAJOR>.<MINOR> format; i.e.: "1.2")'
    })
    .option('release', {
        abbr: 'r',
        full: 'release',
        help: 'Release type to bump the version with ("major", "minor", "patch", or "prerelease")(default "patch")'
    })
    .option('identifier', {
        abbr: 'i',
        help: 'Extra identifier to be appended to prereleases (only required for prerelease)'
    })
    .option('prefix', {
        abbr: 'p',
        default: 'v',
        help: 'Prefix in front of versions for tags (default "v")'
    })
    .option('tag', {
        abbr: 't',
        help: 'Should generate a new Git tag (default "false")'
    })
    .option('filename', {
        abbr: 'f',
        help: 'Path to write the version out to'
    })
    .parse();
const {
    directory,
    baseVersion,
    release,
    identifier,
    prefix,
    tag,
    filename
} = opts;
const config = {
    directory,
    baseVersion
};

console.log('config: ', config);

if (release) {
    config.release = release;
}
if (identifier) {
    config.identifier = identifier;
}
if (prefix) {
    config.prefix = prefix;
}
if (tag) {
    config.tag = tag;
}
if (filename) {
    config.filename = filename;
}

return Promise.resolve(gitTag(config))
    .then((version) => {
        console.log(JSON.stringify(version));
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

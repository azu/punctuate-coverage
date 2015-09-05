#!/usr/bin/env node
var pattern = process.argv[2];
var glob = require("glob");
var coverage = require("../lib/punctuate-coverage").coverage;
var jsoncovToLcov = require('json2lcov');
var files = glob.sync(pattern);
var results = coverage(files);
console.log(jsoncovToLcov(results));
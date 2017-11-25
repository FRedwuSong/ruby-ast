'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var childProcess = require('child_process');
var util = require('util');

const exec = util.promisify(childProcess.exec);

function normalize (source) {
  return source.replace(/"/g, '\\"').replace(/'/g, "\\'")
}

function convert (source, options = {}) {
  const program = options.program || 'ruby';
  const script = `Ripper.sexp('${normalize(source)}').to_json`;
  const command = `${program} -r ripper -r json -e "print ${script}"`;
  return exec(command).then(function ({ stdout, stderr }) {
    return JSON.parse(stdout)
  })
}

exports.convert = convert;

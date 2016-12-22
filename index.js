'use strict';

const fs = require('fs');
const path = require('path');
const flatten = require('array-flatten');

/**
 * @param {string} path to top level directory
 * @param {object} lookup object, each key should be file to ignore
 * @returns {promise} an array of strings with file
 */
function readDeepDirectory(dir, ignore, readCallback) {

  function readDeep(dir, ignore) {
    return readDirectory(dir, ignore)
      .then(files => Promise.all(files.map(file => new Promise((resolve, reject) =>
        fs.stat(path.join(dir, file), (error, stats) => {
          if (error) {
            return reject(error);
          }

          if (stats.isDirectory()) {
            return readDeep(path.join(dir, file), ignore)
              .then(resolve);
          }

          if (isCallback(readCallback)) {
            return resolve(readCallback(
              Object.assign({ file: path.join(dir, file) }, stats)));
          }

          resolve(path.join(dir, file));
        }))
      )));
  }

  return new Promise((resolve, reject) => {
    readDeep(dir, ignore)
      .then(result => {
        resolve(flatten(result));
      })
      .catch(reject);
  });

};

/**
 * @param {string} path to top level directory
 * @param {object} lookup object, each key should be file extension to ignore
 * @returns {promise} resolves an array of files
 */
function readDirectory(dir, ignore) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (error, files) => {
      if (error) {
        return reject(error);
      }

      if (ignore) {
        return resolve(files.filter(file => !isIgnored(file, ignore)));
      }

      resolve(files);
    });
  });
}

function isIgnored(file, ignore) {
  return file.substring(file.lastIndexOf('.') + 1, file.length) in ignore;
}

function isCallback(cb) {
  return typeof cb === 'function';
}

module.exports = {
  readDirectory,
  readDeepDirectory,
};

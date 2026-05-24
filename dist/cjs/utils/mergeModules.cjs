'use strict';

var mergeObjects = require('./mergeObjects.cjs');

const mergeModules = (...modules) => cx => modules.reduce((accu, curr) => mergeObjects.mergeObjects(accu, curr(cx)), {});

exports.mergeModules = mergeModules;

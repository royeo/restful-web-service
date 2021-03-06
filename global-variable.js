'use strict';

global.fs   = require('fs');
global.path = require('path');

global._       = require('lodash');
global.config  = require('config');
global.Promise = require('bluebird');

global.db          = require('./models');
global.utils       = require('./utils');
global.cache       = require('./cache');
global.logger      = require('./tools/logger');
global.handleError = require('./middlewares/error-handle');

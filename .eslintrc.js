const eslint = require('@packages/configs');

module.exports = {
  ...eslint,
  globals: {
    __DEV_HOST__: 'readonly',
    __DEV_PORT__: 'readonly',
    __NODE_ENV__: 'readonly',
  }
};


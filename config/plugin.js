'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mysql: {
    enable: true,
    package: 'egg-mysql'
  },
  validate: {
    enable: true,
    package: 'egg-validate'
  },
  cors: {
    enable: true,
    package: 'egg-cors'
  },
  ejs:{
    enable:true,
    package:'egg-view-ejs'
  }
};
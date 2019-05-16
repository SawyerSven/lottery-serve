/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1553760455022_5044';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: false,
    domainWhiteList: ['*']
  }

  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '',
      database: 'lottery1'
    },
    app: true,
    agent: true
  }

  config.view = {
    mapping:{'.html':'ejs'}
  }



  config.validate = {
    widelyUndefined: true
  }


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
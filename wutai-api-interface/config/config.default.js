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
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1634198282734_2514';

  // add your middleware config here
  config.middleware = [ 'adminauth' ];
  // 配置管理端权限验证
  config.adminauth = {
    enable: true,
    match: '/admin',
  };
  // 关闭csrf
  config.security = {
    csrf: false,
    domainWhiteList: [ 'http://localhost:8080' ],
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  // jwt
  config.jwt = {
    secret: 'aishe',
  };
  // 配置数据库
  config.mysql = {
    client: {
      host: 'localhost',
      user: 'root',
      password: 'root',
      port: '3306',
      database: 'aishe',
    },
    app: true,
  };
  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'aishe',
    timezone: '+08:00',
    define: {
      // 模型名字 和 表名统一
      // freezeTableName:true
    },

  };
  // 数据验证
  config.validate = {
    convert: true,
    validateRoot: true,
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    code: {
      SUCCESS: 200,
      FAIL: 404,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};

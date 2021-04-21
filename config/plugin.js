'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  csrf: {
    enable: false,
  },

  cors:{
    enable: true,
    package: 'egg-cors',
  },
  sequelize : {
    enable: true,
    package: 'egg-sequelize',
  },
  jwt:{
    enable:true,
    package:'egg-jwt'
  },
  //开启redis
  redis: {
	  enable: true,
	  package: 'egg-redis',
  },
};

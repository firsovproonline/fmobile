module.exports = (sequelize, Sequelize) => {
  const impression = sequelize.define(
    'impression', {
      // Здесь определяются атрибуты модели
/*
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

 */
      calldate: {
        type: Sequelize.INTEGER(12)
      },
      src_number: {
        type: Sequelize.STRING
      },
      plin: {
        type: Sequelize.FLOAT
      },
      plout: {
        type: Sequelize.FLOAT
      },
      user: {
        type: Sequelize.STRING(64),
      },
      category: {
        type: Sequelize.STRING(64),
      },
      uid: {
        type: Sequelize.STRING(64),
        unique: 'compositeIndex',
        primaryKey: true,
      },
      rem: {
          type: Sequelize.TEXT,
      },
      destination: {
          type: Sequelize.JSON,
      },
      city: {
        type: Sequelize.STRING,
      },
      district: {
        type: Sequelize.JSON,
      },
      highway: {
        type: Sequelize.JSON,
      },
      underground: {
        type: Sequelize.JSON,
      },
      street: {
        type: Sequelize.JSON,
      },
      title: {
        type: Sequelize.STRING,
      },
      suburban: {
        type: Sequelize.JSON
      },
      residential: {
        type: Sequelize.JSON
      },
      commercial: {
        type: Sequelize.JSON
      },
      wlog: {
        type: Sequelize.JSON
      },
      phone: {
        type: Sequelize.JSON
      },
      access: {
        type: Sequelize.JSON
      }
    }, {
      // Здесь определяются другие настройки модели

    }
  )
  return impression;
};

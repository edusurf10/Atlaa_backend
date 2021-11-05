'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ficha extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Ficha.init({
    roomID: DataTypes.INTEGER,
    username: DataTypes.STRING,
    avatar: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    inventory: DataTypes.TEXT,
    equipment: DataTypes.TEXT,
    lvl: DataTypes.INTEGER,
    xp: DataTypes.INTEGER,
    hp: DataTypes.INTEGER,
    mp: DataTypes.INTEGER,
    sp: DataTypes.INTEGER,
    class: DataTypes.STRING,
    race: DataTypes.STRING,
    skills: DataTypes.TEXT,
    attributes: DataTypes.TEXT,
    locX: DataTypes.INTEGER,
    locY: DataTypes.INTEGER,
    gold: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Ficha',
  });
  return Ficha;
};
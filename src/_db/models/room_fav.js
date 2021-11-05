'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room_Fav extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Room_Fav.init({
    userID: DataTypes.INTEGER,
    roomID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Room_Fav',
  });
  return Room_Fav;
};
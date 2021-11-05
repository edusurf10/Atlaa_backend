'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Room, {through: 'Rooms_Favs', foreignKey: 'userID', onDelete: 'CASCADE'})
    }
  };
  User.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    observation: DataTypes.STRING,
    atlaaCoins: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    cellphone: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
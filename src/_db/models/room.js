'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: 'owner', onDelete: 'CASCADE'});
      this.belongsToMany(models.User, {through: 'Rooms_Favs', foreignKey: 'roomID', onDelete: 'CASCADE'})
    }
  };
  Room.init({
    owner: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    descrition: DataTypes.STRING,
    systemType: DataTypes.STRING,
    maxUser: DataTypes.INTEGER,
    cape: DataTypes.STRING,
    state: DataTypes.STRING,
    tableState: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};
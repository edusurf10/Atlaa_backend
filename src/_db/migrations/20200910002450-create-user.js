'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        defaultValue: "Free"
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "disabled"
      },
      observation: {
        type: Sequelize.STRING,
        defaultValue: ""
      },
      atlaaCoins: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      avatar: {
        type: Sequelize.STRING,
        defaultValue: "https://profileavatar.blob.core.windows.net/avatar/noimg.png"
      },
      cellphone: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
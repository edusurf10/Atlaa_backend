'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      owner: {
        type: Sequelize.STRING,
        references: { model: 'Users', key: 'username'},
        onDelete:  'CASCADE',
        allowNull: false
      },
      password: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descrition: {
        type: Sequelize.STRING,
        allowNull: false
      },
      systemType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      maxUser: {
        type: Sequelize.INTEGER,
        defaultValue: 10
      },
      cape: {
        type: Sequelize.STRING,
        defaultValue: "https://profileavatar.blob.core.windows.net/avatar/noimg.png"
      },
      state: {
        type: Sequelize.STRING,
        defaultValue: "open"
      },
      tableState: {
        type: Sequelize.STRING,
        defaultValue: "close"
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
    await queryInterface.dropTable('Rooms');
  }
};
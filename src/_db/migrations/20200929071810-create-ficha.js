'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Fichas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roomID: {
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      inventory: {
        type: Sequelize.TEXT
      },
      equipment: {
        type: Sequelize.TEXT
      },
      lvl: {
        type: Sequelize.INTEGER
      },
      xp: {
        type: Sequelize.INTEGER
      },
      hp: {
        type: Sequelize.INTEGER
      },
      mp: {
        type: Sequelize.INTEGER
      },
      sp: {
        type: Sequelize.INTEGER
      },
      class: {
        type: Sequelize.STRING
      },
      race: {
        type: Sequelize.STRING
      },
      skills: {
        type: Sequelize.TEXT
      },
      attributes: {
        type: Sequelize.TEXT
      },
      locX: {
        type: Sequelize.INTEGER
      },
      locY: {
        type: Sequelize.INTEGER
      },
      gold: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Fichas');
  }
};
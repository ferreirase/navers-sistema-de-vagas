'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('jobs', {
        id: {
          type: Sequelize.INTEGER, 
          allowNull: false, 
          autoIncrement: true, 
          primaryKey: true
        },
        description: {
          type: Sequelize.TEXT, 
          allowNull: false, 
        },
        locale: {
          type: Sequelize.STRING, 
          allowNull: false, 
        },
        office: {
          type: Sequelize.STRING, 
          allowNull: false,
        },
        salary: {
          type: Sequelize.REAL, 
          allowNull: false,
        },
        active:{
          type: Sequelize.BOOLEAN, 
          allowNull: false, 
          defaultValue: true
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        }
      });
    
  },
  down: (queryInterface) => {

    return queryInterface.dropTable('jobs');

  }
};

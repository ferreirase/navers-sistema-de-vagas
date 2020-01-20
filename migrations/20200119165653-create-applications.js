'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('applications', {
        id: {
          type: Sequelize.INTEGER, 
          allowNull: false, 
          autoIncrement: true, 
          primaryKey: true
        },
        user_id: {
          type: Sequelize.INTEGER, 
          references: {model: 'users', key: 'id'},
          onUpdate: 'CASCADE', //quando cadastro de usuário atualizar, ela herda as alterações em cascata
          onDelete: 'CASCADE',
          allowNull: true, 
        },
        job_id: {
          type: Sequelize.INTEGER, 
          references: {model: 'jobs', key: 'id'},
          onUpdate: 'CASCADE', //quando cadastro de usuário atualizar, ela herda as alterações em cascata
          onDelete: 'SET NULL',
          allowNull: true, 
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

    return queryInterface.dropTable('applications');

  }
};

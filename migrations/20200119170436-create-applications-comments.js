'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('CommentsApplications', {
        id: {
          type: Sequelize.INTEGER, 
          allowNull: false, 
          autoIncrement: true, 
          primaryKey: true
        },
        application_id: {
          type: Sequelize.INTEGER, 
          references: {model: 'applications', key: 'id'},
          onUpdate: 'CASCADE', //quando cadastro de usuário atualizar, ela herda as alterações em cascata
          onDelete: 'SET NULL',
          allowNull: true, 
        },
        comment_id: {
          type: Sequelize.INTEGER, 
          references: {model: 'comments', key: 'id'},
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

    return queryInterface.dropTable('CommentsApplications');

  }
};

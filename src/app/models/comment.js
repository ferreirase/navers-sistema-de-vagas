import Sequelize, {Model} from 'sequelize';

class Comment extends Model{
  static init(sequelize){
    super.init(
      {
        content: Sequelize.TEXT,
      }, 
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models){
    //1-model do relacionamento, 2-chave estrangeira, 3-nome do relacionamento criado
    this.belongsToMany(models.Application, {
      through: 'CommentsApplications', 
      as: 'applications', 
      foreignKey: 'comment_id'
    });
  }
}

export default Comment;
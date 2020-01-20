import Sequelize, {Model} from 'sequelize';

class Application extends Model{
  static init(sequelize){
    super.init(
      {
        user_id: Sequelize.INTEGER, 
        job_id: Sequelize.INTEGER,
      }, 
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models){
    //1-model do relacionamento, 2-chave estrangeira, 3-nome do relacionamento criado
    this.belongsTo(models.User, {foreignKey: 'user_id', as: 'users'});
    this.belongsTo(models.Job, {foreignKey: 'job_id', as: 'jobs'});
    this.belongsToMany(models.Comment, {
      through: 'CommentsApplications', 
      as: 'comments', 
      foreignKey: 'application_id'
    });
  }
}

export default Application;
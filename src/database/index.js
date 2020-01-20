import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/user';
import Job from '../app/models/job';
import Application from '../app/models/application';
import Comment from '../app/models/comment';


const models = [User, Job, Application, Comment];

class Database{
  constructor(){
    this.init();
  }

  init(){
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
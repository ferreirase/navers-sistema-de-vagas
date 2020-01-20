import Sequelize, {Model} from 'sequelize';

class Job extends Model{
  static init(sequelize){
    super.init(
      {
        description: Sequelize.TEXT,
        locale: Sequelize.STRING,
        office: Sequelize.STRING,
        salary: Sequelize.REAL,
        active: Sequelize.BOOLEAN,
      }, 
      {
        sequelize,
      }
    );
  }
}

export default Job;
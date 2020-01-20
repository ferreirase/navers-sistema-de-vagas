import Sequelize, {Model} from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model{
  static init(sequelize){
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        cpf: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
        //um tipo VIRTUAL não vai para o banco de dados, é só pra receber e tratar um dado
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING
      }, 
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if(user.password){
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password){
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
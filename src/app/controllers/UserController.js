import User from '../models/user';
//usa-se * para importar tudo de dentro do Yup pq ele não tem um export default;
import * as Yup from 'yup';

class UserController{
  async store(req, res){

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      phone: Yup.string().required(),
      cpf: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      repeatPass: Yup.string().min(6).required(),
      admin: Yup.boolean().required(),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Erro de Validação: Verifique os campos enviados.'});
    }

    if(req.body.password !== req.body.repeatPass){
      return res.status(400).json({error: 'As senhas informadas não são iguais.'});
    }

    const userExists = await User.findOne({where: {email: req.body.email}});

    if(userExists){
      return res.status(401).json({error: 'Email já cadastrado por outro usuário!', code: '1'});
    }

    const {name, email} = await User.create(req.body);

    return res.json({
      name, email
    });
  }

  async show(req, res){
    const users = await User.findAll({
      attributes: ['id', 'name', 'email']
    });
    return res.json(users);
  }
}

export default new UserController();
import jwt from 'jsonwebtoken';
import User from '../models/user';
import AuthConfig from '../../config/auth';
import * as Yup from 'yup';

class SessionController{
  async authenticate(req, res){
    
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    });

    if(!await schema.isValid(req.body)){
      return res.status(400).json({error: "Erro de validação. Verifique os campos enviados."});
    }

    const {email, password} = req.body;

    const user = await User.findOne({where: {email}});

    if(!user){
      return res.status(401).json({error: "Usuário não encontrado!", code: 1});
    }

    if(!(await user.checkPassword(password))){
      return res.status(401).json({error: "Senha incorreta!", code: 2});
    }

    const {id, name} = user;

    return res.status(200).json({
      //primeiro parametro: dado do usuário q quero manipular ou agregar no token
      token: jwt.sign({id}, AuthConfig.secret, {
        //data de expiração do token
        expiresIn: AuthConfig.expiresIn,
      }),
      name: name, 
    });
  }
}

export default new SessionController();
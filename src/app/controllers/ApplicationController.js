import Application from '../models/application';
import User from '../models/user';
import Job from '../models/job';
import Comment from '../models/comment';
//usa-se * para importar tudo de dentro do Yup pq ele não tem um export default;
import * as Yup from 'yup';

class ApplicationController{
  async store(req, res){

    const {job_id} = req.params;
    const user_id = req.userID;

    const user = await User.findByPk(user_id);

    if(user.admin){
      return res.status(401).json({error: 'Usuário Administradores não podem se candidatar.'});
    }

    const jobExists = await Job.findByPk(job_id);

    if(!jobExists){
      return res.status(404).json({error: 'Vaga não localizada.'});
    }

    const applicationExists = await Application.findOne({where: {
      user_id, job_id
    }});

    if(applicationExists){
      
      return res.json({error: 'Você já se candidatou à essa vaga.', code: '1'});
    }

    await Application.create({user_id, job_id});

    return res.status(201).json({message: 'Candidatura efetuada com sucesso!'}); 
  }

  async show(req, res){
    const application = await Application.findAll({
      attributes: [],
      include: [
        {
          model: User, 
          as: 'users', 
          attributes: ['name', 'email', 'phone']
        },
        {
          model: Job, 
          as: 'jobs', 
          attributes: ['description', 'locale', 'office', 'salary']
        },
        {
          model: Comment, 
          as: 'comments', 
          through: {
            attributes: ['content']
          }
        },
      ]
    });

    if(!application || application.length === 0){
      return res.status(404).json({error: 'Nenhuma candidatura encontrada!'});
    }

    return res.status(200).json(application.map(ap => [
      {
        'Dados do Aplicante': ap.users, 
        'Dados da Vaga': ap.jobs,
        'Comentários': ap.comments
      }
    ]));
      
  }
}

export default new ApplicationController();
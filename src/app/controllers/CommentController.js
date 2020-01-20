import Comment from '../models/comment';
import User from '../models/user';
import Application from '../models/application';
//usa-se * para importar tudo de dentro do Yup pq ele não tem um export default;
import * as Yup from 'yup';

class CommentController{
  async store(req, res){

    const application_id = req.params.application_id;

  
    const schema = Yup.object().shape({
      content: Yup.string().required()
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Erro de Validação: Verifique os campos enviados.'});
    }

    const application = await Application.findByPk(application_id);

    if(!application){
      return res.status(404).json({error: 'Candidatura não encontrada.'});
    }

    const user = await User.findByPk(req.userID);

    if(!(user.admin)){
      return res.status(401).json({error: 'Usuário não é Administrador. Apenas Administradores podem comentar candidaturas.'});
    } 

    const comment = await Comment.create({
      content: req.body.content
    });

    comment.setApplications(application_id);

    return res.status(201).json({message: "Comentário adicionado com sucesso!"});
  }

  async showJobsActive(req, res){

    const {active} = req.query;

    const jobs = await Job.findAll({
      where: {active},
      attributes: ['description', 'locale', 'salary', 'office']
    });

    if(!jobs || jobs.length === 0){
      return res.status(200).json({message: 'Nenhuma vaga ativa'});
    }

    return res.status(200).json(jobs);
   
  }

  async show(req, res){

    const jobs = await Job.findAll({
      attributes: ['description', 'locale', 'salary', 'office']
    });

    if(!jobs || jobs.length === 0){
      return res.status(200).json({message: 'Nenhuma vaga cadastrada.'});
    }

    return res.status(200).json(jobs);
  }
}

export default new CommentController();
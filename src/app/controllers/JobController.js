import Job from '../models/job';
import User from '../models/user';
//usa-se * para importar tudo de dentro do Yup pq ele não tem um export default;
import * as Yup from 'yup';

class JobController{
  async store(req, res){

    const {description, locale, office, salary, active} = req.body;

    const schema = Yup.object().shape({
      description: Yup.string().required(),
      locale: Yup.string().required(),
      office: Yup.string().required(),
      salary: Yup.number().required(),
      active: Yup.boolean().required(),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Erro de Validação: Verifique os campos enviados.'});
    }

    const user = await User.findByPk(req.userID);

    if(!(user.admin)){
      return res.status(401).json({error: 'Usuário não é Administrador. Apenas Administradores podem criar vagas.'});
    } 

    await Job.create({
      description, locale, office, salary, active
    });

    return res.status(201).json({message: "Vaga criada com sucesso!"});
  }

  async showJobsActive(req, res){

    const {active} = req.query;

    const boolValue = active === "true" || active === true ? 1 : 0;

    const jobs = await Job.findAll({
      where: {active: boolValue},
      attributes: ['description', 'locale', 'salary', 'office']
    });

    if(!jobs || jobs.length === 0){
      return res.status(404).json({error: 'Nenhuma vaga encontrada com os parâmetros passados.'});
    }

    return res.status(200).json(jobs);
   
  }

  async show(req, res){

    const jobs = await Job.findAll({
      attributes: ['description', 'locale', 'salary', 'office']
    });

    if(!jobs || jobs.length === 0){
      return res.status(404).json({message: 'Nenhuma vaga cadastrada.'});
    }

    return res.status(200).json(jobs);
  }

  async desactive(req, res){

    const {id} = req.query;

    const user = await User.findByPk(req.userID);

    if(!(user.admin)){
      return res.status(401).json({error: 'Você não é Administrador. Apenas Administradores podem destivar vagas.'});
    }

    const job = await Job.findByPk(id);

    if(!job){
      return res.status(404).json({error: 'Vaga não encontrada.'});
    }

    await job.update({
      active: 0
    });

    return res.status(200).json({message: 'Vaga desativada com sucesso.'});
  }

  async active(req, res){

    const {id} = req.query;

    const user = await User.findByPk(req.userID);

    if(!(user.admin)){
      return res.status(401).json({error: 'Você não é Administrador. Apenas Administradores podem destivar vagas.'});
    }

    const job = await Job.findByPk(id);

    if(!job){
      return res.status(404).json({error: 'Vaga não encontrada.'});
    }

    await job.update({
      active: 1
    });

    return res.status(200).json({message: 'Vaga reativada com sucesso.'});
  }
}

export default new JobController();
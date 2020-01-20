import {Router} from 'express';

import UserController from './src/app/controllers/UserController';
import SessionController from './src/app/controllers/SessionController';
import JobController from './src/app/controllers/JobController';
import ApplicationController from './src/app/controllers/ApplicationController';
import CommentController from './src/app/controllers/CommentController';

import MiddlewareAuth from './src/app/middlewares/auth';


const routes = new Router();

//rota raiz do sistema
routes.get('/', (req, res) => {
  console.log('Server is running...');
  return res.status(200).json('Server is running...');
}); 


//rota para cadastro de usuário do sistema
routes.post('/users/create', UserController.store);

//rota para autenticação de usuário do sistema ou login
routes.post('/users/auth', SessionController.authenticate);

//rota para criação de vaga
routes.post('/jobs/create', MiddlewareAuth, JobController.store);

//rota para listagem de todas as vagas
routes.get('/jobs/show', JobController.show);

//rota para listagem de vagas ativas ou inativas
//passar o parâmetro "?active=false ou true"
routes.get('/jobs', JobController.showJobsActive);

//rota para desativar vaga
routes.patch('/jobs/desactivate', MiddlewareAuth, JobController.desactive);

//rota para reativar vaga
routes.patch('/jobs/active', MiddlewareAuth, JobController.active);

//rota para candidatar às vagas
routes.post('/application/:job_id/create', MiddlewareAuth, ApplicationController.store);

//rota para exibição das candidaturas
routes.get('/applications/show', ApplicationController.show);

//rota para adicionar comentário à candidatura
routes.post('/application/:application_id/comment', MiddlewareAuth, CommentController.store);

export default routes;
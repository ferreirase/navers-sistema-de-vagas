import express from 'express';
import routes from './routes';
import './src/database';

import 'dotenv/config';

class App{
  constructor(){
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.server.use(express.json());
    this.server.use(function (req, res, next){
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  }

  routes(){
    this.server.use(routes);
  }
}

export default new App().server;
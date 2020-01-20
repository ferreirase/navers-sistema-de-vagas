import app from './app';
import 'dotenv/config';

app.all('/', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');

  next();
});

app.listen(process.env.APP_PORT);
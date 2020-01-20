export default {
  //md5 gerado. nesse caso, gerado on-line da string 'navrs#sistemadevagas'
  secret: process.env.APP_SECRET, 
  //data de expiração do token
  expiresIn: '30d'
}
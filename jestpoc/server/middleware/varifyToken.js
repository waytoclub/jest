const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
   const token = req.header('authtoken')
   if(!token) return res.status(401).send('Access Denied')

   try{
      const varified = jwt.verify(token, process.env.TOKEN_SECRET)
      req.user = varified
      next()
   }catch(err){
       res.status(401).send('invalid Token')
   }
}

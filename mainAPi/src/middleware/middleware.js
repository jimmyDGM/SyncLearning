const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';


const withAuth = function(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.email = decoded.email;
        
        res.sendStatus(200);
        next();
      }
    });
  }
}

const checkToken = (req, res, next) => {
  const header = req.headers.token;
  jwt.verify(header, secret, (err, authorizedData) => {

    if(err){
      console.log(err)
        //If error send Forbidden (403)
        console.log('ERROR: Could not connect to the protected route');
        res.sendStatus(403);
    } else {
        //If token is successfully verified, we can send the autorized data 
        if( authorizedData !== 'undefined') {
    
        req.token = header
    
          console.log('success')
      } else {
          //If header is undefined return Forbidden (403)
          res.sendStatus(403)
      }

    }


  })
  next();
}


module.exports = {
  withAuth: withAuth,
  checkToken: checkToken
} 
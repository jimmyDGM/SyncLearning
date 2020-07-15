const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const validateRegister = require('../validation/register')
const validateLogin = require('../validation/login')
const UserProfile = require("../models/UserProfileModel");
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';
const multer = require('multer');
const path = require('path');
const validation = require('../middleware/middleware.js')
const checkToken = validation.checkToken;
const withAuth = validation.withAuth;

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb){
     cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000000},
}).single("myImage");



router.get('/user/data', checkToken, (req, res) => {
  //verify the JWT token generated for the user
  //console.log(req)
  jwt.verify(req.token, secret, (err, authorizedData) => {
      if(err){
        console.log(err)
          //If error send Forbidden (403)
          console.log('ERROR: Could not connect to the protected route');
          res.sendStatus(403);
      } else {
          //If token is successfully verified, we can send the autorized data 
    
          UserProfile.findOne({ eMail: authorizedData.eMail})
          .then(userProfile => {
              userProfile.pswd = ''
              userProfile._id = ''
          return res.status(200).json( userProfile )

          })
          .catch( err => {
            console.error(err)
            return res.status(400).json({ errors: err })
        });

      }
  })
});


router.post('/user/details', checkToken, (req, res) => {
  //verify the JWT token generated for the user
  //console.log(req)
    jwt.verify(req.token, secret, (err, authorizedData) => {
      if(err){
        console.log(err)
          //If error send Forbidden (403)
          console.log('ERROR: Could not connect to the protected route');
          res.sendStatus(403);
      } else {
          UserProfile.findOneAndUpdate({ eMail: authorizedData.eMail}, {
            name:req.body.name,
            jobTitle: req.body.jobTitle,
            description: req.body.description,
            skillList: req.body.skillList,
            experience: req.body.experience,
            formations: req.body.formations,
            

          })
          .then(userProfile => {
            console.log(userProfile)
            return res.status(200).json( userProfile )
          })
          .catch( err => {
            console.error(err)
            return res.status(400).json({ errors: err })
        });
          console.log('SUCCESS: Connected to protected route');
      }
  })
});

//admin route to get people list
router.post('/user/userList',checkToken, (req, res) => {
  //verify the JWT token generated for the user
  console.log('token',req.token)
  jwt.verify(req.token, secret, (err, authorizedData) => {
      if(err){
        console.log(err)
          //If error send Forbidden (403)
          console.log('ERROR: Could not connect to the protected route');
          res.sendStatus(403);
      } else {
          //If token is successfully verified, we can send the autorized data 
          UserProfile.find({})
          .then(function(users) {
            profiles = []
            let user = users.map( use => {
              let data = {name: use.name, mail: use.eMail}
              profiles.push(data)
            })
              res.send(profiles)
          })
          .catch( err => {
            console.error(err)
            return res.status(400).json({ errors: err })
        });
          console.log('SUCCESS: Connected to protected route');
      }
  })
});

/******************
 * 
 * Profile 
 * 
 ******************/


router.post('/user/experience', checkToken, (req, res) => {
  //verify the JWT token generated for the user
  jwt.verify(req.token, secret, (err, authorizedData) => {
      if(err){
        console.log(err)
          //If error send Forbidden (403)
          console.log('ERROR: Could not connect to the protected route');
          res.sendStatus(403);
      } else {
          UserProfile.findOneAndUpdate({ eMail: authorizedData.eMail}, {experience:req.body})
          .then(userProfile => {
            console.log(userProfile)
            return res.status(200).json( userProfile )
          })
          .catch( err => {
            console.error(err)
            return res.status(400).json({ errors: err })
        });
          console.log('SUCCESS: Connected to protected route');
      }
  })
});

router.post('/user/settings', checkToken, (req, res) => {
  //verify the JWT token generated for the user
  jwt.verify(req.token, secret, (err, authorizedData) => {
      if(err){
        console.log(err)
          //If error send Forbidden (403)
          console.log('ERROR: Could not connect to the protected route');
          res.sendStatus(403);
      } else {
          UserProfile.findOneAndUpdate({ eMail: authorizedData.eMail}, {settings:req.body})
          .then(userProfile => {
            console.log(userProfile)
            return res.status(200).json( userProfile )
          })
          .catch( err => {
            console.error(err)
            return res.status(400).json({ errors: err })
        });
          console.log('SUCCESS: Connected to protected route');
      }
  })
});


router.post('/uploadProfile', checkToken, (req, res) => {
//set user

  upload(req, res, function(err) {

      if (req.fileValidationError) {
          return res.send(req.fileValidationError);
      }
      else if (!req.file) {
          return res.send('Please select an image to upload');
      }
      else if (err instanceof multer.MulterError) {
          return res.send(err);
      }
      else if (err) {
          return res.send(err);
      }

      jwt.verify(req.token, secret, (err, authorizedData) => {
        if(err){
          console.log(err)
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            //If token is successfully verified, we can send the autorized data 

            UserProfile.findOneAndUpdate({ eMail: authorizedData.eMail}, {photo: req.file.path})
            .then(userProfile => {
              return res.status(200).json( userProfile )
  
            })    
            console.log('SUCCESS: Connected to protected route');
        }
    })

  });
});

/********************************
 * 
 *  TODO
 * 
 ****************************/

router.post('/user/todo', checkToken, (req, res) => {
  //verify the JWT token generated for the user
  jwt.verify(req.token, secret, (err, authorizedData) => {
      if(err){
        console.log(err)
          //If error send Forbidden (403)
          console.log('ERROR: Could not connect to the protected route');
          res.sendStatus(403);
      } else {
          UserProfile.findOneAndUpdate({ eMail: authorizedData.eMail}, {todos:req.body})
          .then(userProfile => {
            console.log(userProfile)
            return res.status(200).json( userProfile )
          })
          .catch( err => {
            console.error(err)
            return res.status(400).json({ errors: err })
        });
          console.log('SUCCESS: Connected to protected route');
      }
  })
});


router.get('/user/todo', checkToken, (req, res) => {
  //verify the JWT token generated for the user
  //console.log(req)
  jwt.verify(req.token, secret, (err, authorizedData) => {
      if(err){
        console.log(err)
          //If error send Forbidden (403)
          console.log('ERROR: Could not connect to the protected route');
          res.sendStatus(403);
      } else {
          //If token is successfully verified, we can send the autorized data 
    
          UserProfile.findOne({ eMail: authorizedData.eMail})
          .then(userProfile => {

          return res.status(200).json( userProfile.todos )

          })
          .catch( err => {
            console.error(err)
            return res.status(400).json({ errors: err })
        });

      }
  })
});


/********************************
 * 
 * auth & register
 * 
 ****************************/

router.post("/register", (req, res) => {
  let { eMail, pswd, name } = req.body;
  eMail = eMail.toLowerCase()
    UserProfile.findOne({ email: eMail })
    .then(userProfile => {
        if (userProfile) {
          return res.status(400).json({ email: "Email already exists" });
        } else {
          var userTemp = { name:'', eMail:'', pswd:''}
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(pswd, salt, (err, hash) => {
                  if (err) throw err;
                  userTemp.pswd = hash;
                  userTemp.name = name;
                  userTemp.eMail = eMail;
                  UserProfile.create(userTemp)
                  .then(response => {   
                 
                                // Issue token
                      const payload = { eMail: eMail, name: name };
                      const token = jwt.sign(payload, secret, {
                        expiresIn: '4h'
                      });
                      res.status(200).json({ token: token})
                        
                  })
                  .catch( err => {
                      console.error(err)
                      return res.status(400).json({ errors: err })
                  });
                });

              });

        }
    })
    .catch((err) => {
        console.error(err)
        return res.status(500).json({error: 'unknown error'})
    });

});


router.get('/checkToken', checkToken, function(req, res) {
  return res.status(200).json( {msg:'yop'} )

});


router.post('/authenticate', function(req, res) {
  let { eMail, pswd } = req.body;
  eMail = eMail.toLowerCase()
  UserProfile.findOne({ eMail }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {

      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(pswd, function(err, same) {
        if (err) {
          console.log(err)
          res.status(500)
            .json({
              error: 'Internal error please try again other'
          });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
          });
        } else {
          const name = user.name
          // Issue token
          const payload = {eMail: eMail, name:name };
          const token = jwt.sign(payload, secret, {
            expiresIn: '4h'
          });
          res.status(200).json({ token: token})

        }
      });
    }
  });
});




module.exports = router;

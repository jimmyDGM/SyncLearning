const express = require('express');
const router = express.Router();
const Project = require('../models/ProjectModel')
const UserProfile = require("../models/UserProfileModel");
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';
const validation = require('../middleware/middleware.js')
const checkToken = validation.checkToken;



/******************************
 *  create a project + Proposal
 *****************************/


router.post('/Project', checkToken, function(req, res){


        jwt.verify(req.token, secret, (err, authorizedData) => {
            if(err){
              console.log(err)
                //If error send Forbidden (403)
                console.log('ERROR: Could not connect to the protected route');
                res.sendStatus(403);
            } else {

                Project.create({
                    name:req.body.name,
                    owner: req.body.email,
                    team: [{mail:authorizedData.eMail, name: authorizedData.name}],
                    details:{level:0, part:0, name:req.body.name, description:''}
                })
                .then(project => {   
                    console.log(project)
                    UserProfile.findOneAndUpdate({ eMail: authorizedData.eMail}, { $push: { projects: {name:req.body.name, uuid: project._id} } })
                    .then(userProfile => {
                     
                      return res.status(200).json( project )
                    })
                    .catch( err => {
                        console.error(err)
                        return res.status(500).json({ errors: err })
                    });

                })

                .catch( err => {
                    console.error(err)
                    return res.status(500).json({ errors: err })
                });

            }
        })                 

    })




router.post('/Project/Info/:id', function(req, res, next){
    Project.findByIdAndUpdate({_id: req.params.id}, {details:req.body})
    .then(response => {   
        return res.status(200).json(response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});


router.get('/Project/Info/:id', function(req, res, next){
    Project.findById({_id: req.params.id}, req.body)
    .then(function(project) {
        res.send({details:project.details, team:project.team, temporaryTeam: project.temporaryTeam})
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});
/************************************
 *          Invite
 ************************************/

router.get('/project/invite/:id', checkToken, function(req, res, next){

    jwt.verify(req.token, secret, (err, authorizedData) => {
        if(err){
          console.log(err)
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            console.log('invite',authorizedData.eMail)
            Project.findOneAndUpdate({_id: req.params.id},{ $push: { team: { mail:authorizedData.eMail, name:authorizedData.name } }})
            .then(project => {   
                console.log('invite', project)
                if(project!==null) {
                    UserProfile.findOneAndUpdate({ eMail: authorizedData.eMail}, { $push: { projects: {name:project.name, uuid: project._id} } })
                    .then(userProfile => {
                     
                      return res.status(200).json( project )
                    })
                    .catch( err => {
                        console.error(err)
                        return res.status(500).json({ errors: err })
                    });
                } else {
                    return res.status(400).json({ errors: err })
                    
                }

            })
            .catch( err => {
                console.error(err)
                return res.status(500).json({ errors: err })
            });



        }
    }) 




});

router.post('/project/invite/:id', checkToken, function(req, res, next){
    console.log(req.body)

    Project.findByIdAndUpdate({_id: req.params.id}, { $push: { temporaryTeam: {
        mail:req.body.eMail ,
        createdAt: new Date(),

    } }})
    .then(response => {   
        return res.status(200).json(response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});



/************************************
 *          Product
 ************************************/
router.post('/Project/Product/processes/:id', function(req, res, next){
    Project.findByIdAndUpdate({_id: req.params.id}, {product: req.body})
    .then(response => {   
        return res.status(200).json(response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});

router.get('/Project/Product/processes/:id', function(req, res, next){
    Project.findById({_id: req.params.id}, req.body)
    .then(function(table) {
        res.status(200).json(table.product)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});


/************************************
 *          Team
 ************************************/

router.post('/Project/Team/:id', function(req, res, next){
    Project.findByIdAndUpdate({_id: req.params.id}, {team:req.body})
    .then(response => {   
        return res.status(200).json(response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});

router.get('/Project/Team/:id', function(req, res, next){
    Project.findById({_id: req.params.id}, req.body)
    .then(function(project) {
        res.send(project.team)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});


router.post('/Project/Market/:id', function(req, res, next){
    Project.findByIdAndUpdate({_id: req.params.id}, {activitySector:req.body})
    .then(response => {   
        return res.status(200).json(response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});


/************************************
 *          BMC
 ************************************/


router.post('/Project/bmc/:id', function(req, res, next){
    Project.findByIdAndUpdate({_id: req.params.id}, {bmc:req.body})
    .then(response => {   
        return res.status(200).json(response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});

router.get('/Project/bmc/:id', function(req, res, next){
    Project.findById({_id: req.params.id}, req.body)
    .then(function(table) {
        res.send(table)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});

/************************************
 *          Finance
 ************************************/

router.get('/Project/finance/:id', function(req, res, next){
    Project.findById({_id: req.params.id}, req.body)
    .then(function(table) {
        res.send(table.finance)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});


router.post('/Project/finance/:id', function(req, res, next){
    Project.findByIdAndUpdate({_id: req.params.id}, {finance:req.body})
    .then(response => {   
        return res.status(200).json(response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});



router.post('/Project/simpleFinance/:id', function(req, res, next){
    Project.findByIdAndUpdate({_id: req.params.id}, {simpleFinance:req.body})
    .then(response => {   
        return res.status(200).json(response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});


router.get('/Project/simpleFinance/:id', function(req, res, next){
    Project.findById({_id: req.params.id}, req.body)
    .then(function(table) {
        res.send(table.simpleFinance)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});
/************************************
 *          revenue
 ************************************/

router.get('/Project/revenue/:id', function(req, res, next){
    Project.findById({_id: req.params.id}, req.body)
    .then(function(table) {
        res.send(table.finance)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});


router.post('/Project/revenue/:id', function(req, res, next){
    Project.findByIdAndUpdate({_id: req.params.id},   {$set: {'finance.revenue': req.body}},)
    .then(response => {   
        return res.status(200).json(response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });


});



/************************************
 *          marketing
 ************************************/


router.post('/Project/marketing/:id', function(req, res, next){
    Project.findByIdAndUpdate({_id: req.params.id}, {marketing:req.body})
    .then(response => {   
        return res.status(200).json(response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});

router.get('/Project/marketing/:id', function(req, res, next){
    Project.findById({_id: req.params.id}, req.body)
    .then(function(table) {
        res.send(table.marketing)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});



router.post('/Project/product/:id', function(req, res, next){
    Project.findByIdAndUpdate({_id: req.params.id}, {product:req.body})
    .then(response => {   
        return res.status(200).json(response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});

router.get('/Project/product/:id', function(req, res, next){
    Project.findById({_id: req.params.id}, req.body)
    .then(function(table) {
        res.send(table.product)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});



router.get('/Project/business/:id', function(req, res, next){
    Project.findById({_id: req.params.id}, req.body)
    .then(function(table) {
        res.send(table.bmc)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});

router.get('/Project/Segment/:id', function(req, res, next){
    Project.findById({_id: req.params.id}, req.body)
    .then(function(table) {
        res.send(table.marketAnalysis)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});


/************************************
 *          valuePropStatements
 ************************************/

router.post('/Project/statements/:id', function(req, res, next){

    Project.findById({_id: req.params.id}, req.body)
    .then(function(table) {
        
       // let bmc= table.bmc
        // adding a value in the bmc when adding value statement
        //should alo be added to lean canvas and marketing canvas, as well as for product features
        // 
       // bmc.push(req.body)
        /*bmc.push({ 
            title: rq.title,
            type: req.type,
            uuid: req.title.length,
            description:'',
            personna:''
        })

        */
        
        Project.findByIdAndUpdate({_id: req.params.id},   {$set: {'marketAnalysis.statements': req.body } },)
        .then(response => {   
            return res.status(200).json(response)
        })
        .catch( err => {
            console.error(err)
            return res.status(500).json({ errors: err })
        });


    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});


router.post('/Project/Personna/:id', function(req, res, next){
    Project.findByIdAndUpdate({_id: req.params.id},   {$set: {'marketAnalysis.personna': req.body}},)
    .then(response => {   
        return res.status(200).json(response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});

router.post('/Project/ValueProp/:id', function(req, res, next){
    Project.findByIdAndUpdate({_id: req.params.id},   {$set: {'marketAnalysis.valueProp': req.body}},)
    .then(response => {   
        return res.status(200).json(response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});

router.get('/Project/ValueProp/:id', function(req, res, next){
    Project.findById({_id: req.params.id}, req.body)
    .then(function(table) {
        res.send(table.marketAnalysis)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});


router.post('/Project/SegmentMatrice/:id', function(req, res, next){
    Project.findByIdAndUpdate({_id: req.params.id},   {$set: {'marketAnalysis.SegmentMatrice': req.body}},)
    .then(response => {   
        return res.status(200).json(response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});

router.get('/Project/SegmentMatrice/:id', function(req, res, next){
    Project.findById({_id: req.params.id}, req.body)
    .then(function(table) {
        res.send(table.marketAnalysis)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});


router.post('/Project/SegmentsContent/:id', function(req, res, next){
    Project.findByIdAndUpdate({_id: req.params.id},   {$set: {'marketAnalysis.segment': req.body}},)
    .then(response => {   
        return res.status(200).json(response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});


/**************************
 * 
 *          Objectives
 * 
 **************************/

router.get('/project/objectives/:id', function(req, res, next){
    Project.findById({_id: req.params.id})
    .then(function(project) {
        res.send(project.objectifs)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});

router.post('/project/objectives/:id', function(req, res, next){
    Project.findByIdAndUpdate({_id: req.params.id}, {$set: {"objectifs": req.body}})
    .then(function(table) {
        res.send(table.objectifs)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });
});

router.post('/project/objectives/self/:id', function(req, res, next){
    Project.findByIdAndUpdate({_id: req.params.id}, {$set: {"objectifs.self": req.body.mainForMe}})
    .then(function(table) {
        res.send(table.objectifs)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });
});

router.post('/project/objectives/client/:id', function(req, res, next){
    Project.findByIdAndUpdate({_id: req.params.id}, {$set: {"objectifs.client": req.body.mainForClient}})
    .then(function(table) {
        res.send(table.objectifs)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });
});




router.post('/projectsToValidate', function(req, res, next){
    Projects.create(req.body)
    .then(function(project){   
        res.send(project);
    })
    .catch(next);

});

router.get('/Project/:id', function(req, res, next){
    Project.findById({_id: req.params.id}, req.body)
    .then(function(project) {
        res.send(project)
    })

});

router.put('/projects/:id', function(req, res){
    Projects.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(function(project) {
        res.send(project)
    })
});

router.delete('/projects/:id', function(req, res, next){ 
    Projects.findByIdAndRemove({_id: req.params.id})
    .then(function(project) {
        res.send(project)
    })
    
});


module.exports = router;
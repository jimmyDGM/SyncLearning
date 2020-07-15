const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';
const validation = require('../middleware/middleware.js')

const checkToken = validation.checkToken;
const Boards = require('../models/BoardModel')
const Project = require('../models/ProjectModel')
const UserProfile = require("../models/UserProfileModel");

router.get('/kanban/list/:id',checkToken, function(req, res, next){

    jwt.verify(req.token, secret, (err, authorizedData) => {
        if(err){
          console.log(err)
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            console.log(authorizedData)
            Boards.find({members: {mail:authorizedData.eMail, name:authorizedData.name}, project: req.params.id })
            .then(response => {   

                return res.status(200).json(response)
            })
            .catch( err => {
                console.error(err)
                return res.status(500).json({ errors: err })
            });
      
        }
    })

});

router.post('/kanban', checkToken, function(req, res){
    jwt.verify(req.token, secret, (err, authorizedData) => {
        if(err) {
            console.log(err)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            Boards.create({
                name:req.body.name,
                owner: authorizedData.eMail,
                members:[{mail: authorizedData.eMail, name:authorizedData.name}],
                indexTable: req.body.indexTable, 
                imgUri: req.body.imgUri, 
                color: req.body.color, 
                id: req.body.id, 
                pageUrl: req.body.pageUrl,
                project: req.body.project,
            })
            .then(response => {   
                Project.findByIdAndUpdate({_id: req.body.project}, { $push: { kanban: {name:req.body.name, uuid: response._id} } })
                .then(project => {
                    return res.status(200).json({ msg: response })
                })
                .catch(err => {
                    console.log(err)
                    return res.status(500).json({ errors: err })
                })
            })
            .catch( err => {
                console.error(err)
                return res.status(500).json({ errors: err })
            });
        }
    })
});

router.post('/kanban/table/:id', function(req, res){
    Boards.findByIdAndUpdate({_id: req.params.id}, {columns:req.body})
    .then(response => {   
        return res.status(200).json({ msg: response })
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});

router.post('/kanban/table/members/:id', function(req, res){
    Boards.findByIdAndUpdate({_id: req.params.id}, { $push: { members: { mail:req.body.email, name:req.body.name} } })
    .then(response => {   
        return res.status(200).json({ msg: response })
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });
});

router.get('/kanban/:id', function(req, res, next){
    Boards.findById({_id: req.params.id}, req.body)
    .then(function(table) {
        res.send(table)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});

//Card Handling

router.post('/kanban/card/description/:id', function(req, res){
    Boards.update({_id: req.params.id, "cards.uuid" : req.body.uuid}, {'$set': {
        
        'cards.$.description': req.body.description
    }})
    .then(response => {   
        return res.status(200).json( response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});


router.post('/kanban/card/members/:id', function(req, res){
    // on prend les cards du tableau on  
    Boards.update({_id: req.params.id, "cards.uuid" : req.body.uuid}, {'$set': {
        
        'cards.$.members': req.body.members
    }})
    .then(response => {   
        return res.status(200).json( response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});

router.post('/kanban/card/comments/:id', checkToken, function(req, res){
    // on prend les cards du tableau on  

    jwt.verify(req.token, secret, (err, authorizedData) => {
        if(err) {
            console.log(err)
                        //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            req.body.author = authorizedData.name
            Boards.update({_id: req.params.id, "cards.uuid" : req.body.uuid}, {'$push': {
        
                'cards.$.comments': req.body
            }})
            .then(response => {   
                return res.status(200).json( response)
            })
            .catch( err => {
                console.error(err)
                return res.status(500).json({ errors: err })
            });
        }
    })

});

router.post('/kanban/card/badges/:id', function(req, res){
    Boards.update({_id: req.params.id, "cards.uuid" : req.body.uuid}, {'$set': {
        
        'cards.$.categories': req.body.category
    }})
    .then(response => {   
        return res.status(200).json( response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});


router.post('/kanban/card/checkList/:id', function(req, res){
    Boards.update({ _id: req.params.id, "cards.uuid": req.body.uuid }, {'$set': {
        
        'cards.$.checklists': req.body.checklist
    }})
    .then(response => {   
        return res.status(200).json( response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});

router.post('/kanban/card/create/:id', function(req, res){
    Boards.findByIdAndUpdate({_id: req.params.id}, {cards:req.body})
    .then(response => {   
        return res.status(200).json( response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});

router.post('/kanban/card/delete/:id', function(req, res){
    Boards.findByIdAndUpdate(req.params.id, { $pull: { cards: { uuid:req.body.uuid } } }, { safe: true, upsert: true })
    .then(response => {   
        return res.status(200).json( response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });
 

    

});

router.post('/kanban/cardUpdate/:id', function(req, res){
    Boards.update({_id: req.params.id, "cards.uuid" : req.body.uuid}, {'$set': {
        'cards.$.columnId': req.body.columnId
    }})
    .then(response => {   
        return res.status(200).json( response)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});


router.get('/kanban/card/:id', function(req, res, next){
    Boards.findById({_id: req.params.id}, req.body)
    .then(function(table) {
        res.send(table)
    })
    .catch( err => {
        console.error(err)
        return res.status(500).json({ errors: err })
    });

});


module.exports = router;

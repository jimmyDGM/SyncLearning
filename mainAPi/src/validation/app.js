const Validator = require('validator')
const isEmpty = require('is-empty')
const _ = require('lodash')

const User = require('../models/User')

function validateCreate(req, res, next) {
  if (isEmpty(req.body.name)){
    return res.status(400).json({errors: 'App name is required'})
  }

  if (Validator.isEmpty(req.body.name)) {
    return res.status(400).json({errors: 'App name is required'})
  }

  if(_.find(req.user.apps, app => app.name === req.body.name)){
    return res.status(400).json({errors: 'An app with that name already exists'})
  }

  next()

}

function validateDelete(req, res, next) {

  if (isEmpty(req.params.name)){
    return res.status(400).json({errors: 'An app name as param is required'})
  }

  if(!_.find(req.user.apps, app => app.name === req.params.name)){
    return res.status(400).json({errors: 'App name not found'})
  }

  next()

}

function validateByName(req, res, next) {

  if (isEmpty(req.params.name)){
    return res.status(400).json({errors: 'An app name as param is required'})
  }

  if(!_.find(req.user.apps, app => app.name === req.params.name)){
    return res.status(400).json({errors: 'App name not found'})
  }

  next()

}

module.exports = {
  validateCreate,
  validateDelete,
  validateByName
}

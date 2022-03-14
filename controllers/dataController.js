const Fruit = require('../models/fruits.js');

const dataController = {
  index(req, res, next){
    Fruit.find({}, (err, allFruits) => {
      if(err){
        res.status(404).send({
          msg: err.message
        })
      }else {
        res.locals.data.fruits = allFruits
        next()
      }
    })
  },
  
  create(req, res, next){
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
    // Use Model to create Fruit Document
    Fruit.create(req.body, (err, createdFruit) => {
        // Once created - respond to client
        if(err){
          res.status(404).send({
            msg: err.message
          })
        }else {
          res.locals.data.fruit = createdFruit
          next()
        }
    })
  },
  show(req, res, next){
    Fruit.findById(req.params.id, (err, foundFruit)=>{
      if(err){
        res.status(404).send({
          msg: err.message
        })
      } else {
        res.locals.data.fruit = foundFruit
        next()
      }
    })
  },
  update(req, res, next){
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
    Fruit.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedFruit) => {
      if(err){
        res.status(404).send({
          msg: err.message
        })
      } else {
        res.locals.data.fruit = updatedFruit
        next()
      }
    });
  },
  destroy(req, res, next){
    Fruit.findByIdAndRemove(req.params.id, (err, fruit) => {
      if(err){
        res.status(404).send({
          msg: err.message
        })
      } else {
        res.locals.data.fruit = fruit
        next()
      }
    });
  }
}

module.exports = dataController
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Fruit = require('./models/fruits.js')
const methodOverride= require('method-override')
const PORT = process.env.PORT || 3000
const app = express()



//make server.js use Show.jsx
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())


//Middelware!!!Always put first before app.gets!!!
app.use((req, res, next)=>{
    console.log('I run for all routes')
    next()
})
//near the top, around other app.use() calls
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static('public')) //tells express to try to match requests with files in the directory called 'public'

app.get('/fruits/seed', (req, res)=>{
    Fruit.create([
        {
            name:'grapefruit',
            color:'pink',
            readyToEat:true
        },
        {
            name:'grape',
            color:'purple',
            readyToEat:false
        },
        {
            name:'avocado',
            color:'green',
            readyToEat:true
        }
    ], (err, data)=>{
        res.redirect('/fruits')
    })
})

//add index route
app.get('/fruits', (req, res) => {
    Fruit.find({}, (error, allFruits)=>{
        res.render('Index', {fruits: allFruits})
    })
})

//put this above your Show route adds page to add new fruit
app.get('/fruits/new', (req, res) => {
    res.render('New')
})

//add post route to create new fruit
app.post('/fruits/', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true; //set readyToEat to true insted of on so it will display correctly
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; //set readyToEat to false insted of on so it will display correctly
    }
    Fruit.create(req.body, (error, createdFruit)=>{
        //res.send(createdFruit)
        res.redirect('/fruits')//send user back to index page
    })
    console.log(req.body)
})

//add show route
app.get('/fruits/:id', (req,res) =>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{
        res.render('Show', {fruit:foundFruit})
    })
})

//delete: delete one
app.delete('/fruits/:id', (req, res)=>{
    Fruit.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/fruits')//redirect back to fruits index
    })
})

//get form prepopulated with selected fruit
app.get('/fruits/:id/edit', (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{ //find the fruit
        if(!err){
            res.render('Edit', {fruit: foundFruit}) //pass in found fruit
        } else {
            res.send({ msg: err.message })
        }
    })
})

//send the edited info back to DB
app.put('/fruits/:id', (req, res)=>{
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }
    Fruit.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
        res.redirect('/fruits')
    })
})

//Replaced by the show route
// app.get('/fruits/:indexOfFruitsArray', (req, res) => {
//     res.send(fruits[req.params.indexOfFruitsArray])
// })


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo')
})
app.listen(PORT, () => {
    console.log('Making the money on port: ' + PORT)
})
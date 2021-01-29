require("dotenv").config()
const mongoose = require('mongoose')
const express = require ('express')
const app = express()
const bodyParser = require ('body-parser')
let jsonParser = bodyParser.json()
var cors = require('cors')

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true } )
const todoSchema = {content: String, done: Boolean}
const Todo = mongoose.model('Todo',todoSchema)



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors())


app.get('/todo',function(req,res){
 Todo.find(function(err,todos){
  if(err){
    console.log(err)
    }
  else{
    res.send(todos)
  }
 })
})

app.post('/todo',jsonParser,function(req,res){
  const todo = new Todo({content: req.body.content, done: false})
  todo.save(function(err){
    if(err){
      console.log(err)
      }
    else{
      res.send('entrada adicionada')
    }
  })
})

app.delete('/todo/:id',jsonParser,function(req,res){
  Todo.deleteOne({_id: req.params.id},function(err){
    if(err){
      console.log(err)
      }
    else{
      res.send('entrada deletada')
    }
  })
})

app.put('/todo/:id',jsonParser,function(req,res){
  Todo.updateOne({_id: req.params.id},{done: req.body.done},function(err){
    if(err){
      console.log(err)
      }
    else{
      res.send('entrada alterada')
    }
  })
})

app.get('/',function(req,res){
  res.send('hello world')
})

app.listen(3001,function(req,res){
  console.log('app started on port 3001')
})


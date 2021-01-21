require("dotenv").config()
const mongoose = require('mongoose')
const express = require ('express')
const app = express()
const bodyParser = require ('body-parser')
let jsonParser = bodyParser.json()

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true } )
const todoSchema = {content: String}
const Todo = mongoose.model('Todo',todoSchema)


app.use(bodyParser.urlencoded({
  extended: true
}));

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
  const todo = new Todo({content: req.body.content})
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


app.get('/',function(req,res){
  res.send('hello world')
})




app.listen(3000,function(req,res){
  console.log('app started on port 3000')
})
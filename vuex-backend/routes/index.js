var express = require('express');
var router = express.Router();
const mysql = require('mysql');


router.get('/todos/:limit', function(req,res,next){
  var con = mysql.createConnection({
    host: "localhost",
    user: "aczepiel",
    password: "Pa55w.rd"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(`select * from todo.todos LIMIT ${req.params.limit}`, function(err,result, fields){
      if(err) throw err;
      let data = JSON.stringify(result);
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(data)
    });
  });
})

router.post('/todoadd', function(req, res, next) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "aczepiel",
    password: "Pa55w.rd"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    let data = req.body;
    con.query(`insert into todo.todos (title, description, priority, completed) values ("${data.title}", "none", 2, 0)`, function(err,result, fields){
      if(err) throw err;
      con.query(`select * from todo.todos where id=${result.insertId}`, function(err,resultSelect, fields){
        if(err) throw err;
        let data = JSON.stringify(result);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(JSON.stringify(resultSelect[0]))
      });
    });
  });
});

router.delete('/todos/:id', function(req, res, next) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "aczepiel",
    password: "Pa55w.rd"
  });

  const id = req.params.id
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(`delete from todo.todos where id=${id}`, function(err,result, fields){
      if(err) throw err;
      let data = JSON.stringify(result);
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(data)
    });
    
  });
});

router.put('/todos/update/:id', function(req, res, next) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "aczepiel",
    password: "Pa55w.rd"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    con.query(`select completed from todo.todos where id=${req.params.id}`, function(err,result, fields){
      if(err) throw err;
      console.log(result.completed)
      if(result.completed == 1){
        con.query(`update todo.todos set completed=0 where id=${req.params.id}`, function(err,result, fields){
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
          res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Request-With');
          res.json(result)
        });
      }else{
        con.query(`update todo.todos set completed=0 where id=${req.params.id}`, function(err,result, fields){
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
          res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Request-With');
          res.json(result)
        });
      }
    });
  });
});

router.put('/todos/updateall/:id', function(req, res, next) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "aczepiel",
    password: "Pa55w.rd"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    let queryString = `update todo.todos set priority="${req.body.updTodo.priority}", description="${req.body.updTodo.description}", title="${req.body.updTodo.title}" where id=${req.params.id}`;
    console.log(queryString);
      con.query(queryString, function(err,result, fields){
      let data = JSON.stringify(result);
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Request-With');
      console.log(data);
      res.json(data)
    });
  });
});

/* GET home page. */
router.get('/todos', function(req, res, next) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "aczepiel",
    password: "Pa55w.rd"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    con.query("select * from todo.todos order by priority desc", function(err,result, fields){
      if(err) throw err;
      let data = JSON.stringify(result);
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(data)
    });
    
  });
});

router.get('/todos/get/:id', function(req, res, next) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "aczepiel",
    password: "Pa55w.rd"
  });

  const id = req.params.id
  console.log(`Id is ${id}`);

  con.connect(function(err) {
    if (err) throw err;
    con.query(`select * from todo.todos where id=${id}`, function(err,result, fields){
      if(err) throw err;
      let data = JSON.stringify(result);
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(data)
    });
  });
})

router.get('/todos/updatepriority/:id/:prio', function(req, res, next) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "aczepiel",
    password: "Pa55w.rd"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    con.query(`update todo.todos set priority=${req.params.prio} where id=${req.params.id}`, function(err,result, fields){
      if(err) throw err;
      con.query(`select * from todo.todos order by priority desc`, function(err,resultSelect, fields){
        if(err) throw err;
        let data = JSON.stringify(result);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(JSON.stringify(resultSelect))
      });
    });
  });
});

module.exports = router;

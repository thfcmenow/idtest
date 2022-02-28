//tracking?id=9924591

var Engine = require('tingodb')(),
 assert = require('assert')

 var db = new Engine.Db('./', {});

 var collection = db.collection("ediLOAD");
 /* collection.insert([{tracking:'9999',received:'02/10/2022',completed:'03/02/2022',status:'Received'}], {w:1}, 
 function(err, result) {
  assert.equal(null, err)
 }) */

 

//import express from 'express';
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = express.Router();
const path = require('path');
// import path from 'path';

//setting middleware
app.use('/js',express.static(path.join(__dirname, '/js'))); //Serves resources from public folder
app.use('/css',express.static(path.join(__dirname, '/css')));
app.use('/img',express.static(path.join(__dirname, '/img')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

router.get("/tracking",(request,response) => {

      if (request.query.id == "" || request.query.id == null || request.query.id == undefined ) {
        response.send({"error":true})
      } else {

      collection.findOne({tracking:request.query.id}, function(err, item) {
        if (err) {
          response.send({"error":true})
          return false
        }
        assert.equal(null, err);
        assert.equal(request.query.id, item.tracking);
        item.error = false
        response.send(item)
      })
     
    }

    // response.send(temp)

});

// add router in the Express app.
app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


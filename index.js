const express = require('express');
const bluebird = require('bluebird');

// https://www.npmjs.com/package/sqlite3
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = express();
const port = process.env.PORT || 3000;

db.serialize(function() {
  db.run("CREATE TABLE lorem (info TEXT)");
 
  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();
 
  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});
 
db.close();
 
app.get('/post/:id', async (req, res, next) => {
  try {
    const db = await dbPromise;
    const [post, categories] = await Promise.all([
      db.get('SELECT * FROM Post WHERE id = ?', req.params.id),
      db.all('SELECT * FROM Category')
    ]);
    res.render('post', { post, categories });
  } catch (err) {
    next(err);
  }
});
 
app.listen(port);
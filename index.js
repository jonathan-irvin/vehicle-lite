const express = require("express");
const nSQL = require("nano-sql").nSQL;
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

var lastAdded = 0;

const eventFn = (event, db) => {
  //console.log(event);
  lastAdded = event.affectedRowPKS[0];
}

nSQL("vehicles")
  .model([
    { key: "id", type: "int", props: ["pk", "ai"] },
    { key: "type", type: "string" },
    { key: "props", type: "any" }
  ])
  .config({
    mode: "PERM", // store changes permenantly
    history: "row" // store each row's changes as a revision history
  })
  .connect()
  .then(() => {
    // Database is now ready to use.

    // put some data in
    // nSQL("posts").query("upsert", {id: 1, title: "Hello World!", content: "This is my first post!", date: Date.now()}).exec();

    nSQL("vehicles").on("upsert", eventFn);

    app.post("/vehicles/add/:type", (req, res) => {
      
      nSQL("vehicles")
        .query("upsert", {
          type: req.params.type,
          props: JSON.stringify(req.body)
        })
        .exec();
      res.send(req.params.type + " added");      
    });

    app.get("/vehicles/all", (req, res) => {
      nSQL("vehicles")
        .query("select")
        .exec()
        .then(rows => res.send(rows));
    });

    app.get("/vehicles/:id", (req, res) => {
      nSQL("vehicles")
        .query("select")
        .where(["id", "=", req.params.id])
        .exec()
        .then(rows => res.send(rows));
    });    

    app.delete("/vehicles/last", (req, res) => {
      if(lastAdded === 0){
        res.send("Haven't added any vehicles recently!")
      }else{
        nSQL("vehicles")
        .query("delete")
        .where(["id", "=", lastAdded])
        .exec()
        .then(res.send(lastAdded + " deleted"));
      }
    });

    app.delete("/vehicles/:id", (req, res) => {
      nSQL("vehicles")
        .query("delete")
        .where(["id", "=", req.params.id])
        .exec()
        .then(res.send(req.params.id + " deleted"));
    });

    app.listen(3000, () => console.log("Vehicle lite listening on port 3000!"));
  });

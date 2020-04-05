const express = require("express");
const parser = require("body-parser");
const db = require("./queries");
const cors = require("cors")

const app = express();
const port = 3001;

app.use(cors())
app.use(parser.json());
app.use(parser.urlencoded({
    extended: true
}))

app.get("/", (req,res) => {
   res.json({ info: "PSQL API"})
})

/* USERS */
app.get("/users", db.getUser);
app.get("/users/:id", db.getUserWithId);
app.post("/users", db.createUser);

/** CONNECT TO FUNCTION QUERIES */
app.get("/:id/collections", db.getCollections); // add user id before??
app.get("/:id/collections/:id", db.getCollectionById);
app.post("/:id/collections", db.createCollection);
app.put("/:id/collections/:id", db.updateCollection);
app.delete("/:id/collections/:id", db.deleteCollection);

/* ITEMSS*/
app.get("/:id/collections/:id/items", db.getItems);
app.get("/:id/collections/:id/items/:id", db.getItemsById);
app.post("/:id/collections/:id/items", db.createItem);
app.put("/:id/collections/:id/items/:id", db.updateItems);
app.delete("/:id/collections/:id/items/:id", db.deleteItem);



app.listen(port, () => {
    console.log("Running on port ", port);
})
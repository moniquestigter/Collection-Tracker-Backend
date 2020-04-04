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

/** CONNECT TO FUNCTION QUERIES */
app.get("/collections", db.getCollections);
app.get("/collections/:id", db.getCollectionById);
app.post("/collections", db.createCollection);
app.put("/collections/:id", db.updateCollection);
app.delete("/collections/:id", db.deleteCollection);

/* ITEMSS*/
app.get("/:id/items", db.getItems);
app.get("/:id/items/:id", db.getItemsById);
app.post("/:id/items", db.createItem);
app.put("/:id/items/:id", db.updateItems);
app.delete("/:id/items/:id", db.deleteItem);


app.listen(port, () => {
    console.log("Running on port ", port);
})
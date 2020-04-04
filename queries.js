const Pool = require("pg").Pool;

const pool = new Pool({
    user: "mac",
    host: "localhost",
    database: "ctracker",
    password: "password",
    port: 5432
});

/** COLLECTIONS */
const createCollection = (req,res) =>{
    const {name, description} = req.body;
    pool.query("INSERT INTO collections (name, description, date) VALUES ($1, $2, CURRENT_TIMESTAMP)", [name, description], (err, data) => {
        if(err){
            res.status(400).json("Error: " + err);
        }
        res.status(201).send("Collection added with ID: ${data.insertId}");
    })
}

const getCollections = (req,res) =>{
    pool.query("SELECT * FROM collections ORDER BY date ASC", (err, data) => {
        if(err){
            res.status(400).json("Error: " + err);
        }
        res.status(201).json(data.rows);
    })
}

const getCollectionById = (req,res) =>{
    const id = parseInt(req.params.id);
    pool.query("SELECT * FROM collections WHERE id = $1", [id], (err, data) => {
        if(err){
            res.status(400).json("Error: " + err);
        }
        res.status(200).json(data.rows);
    })
}

const updateCollection = (req,res) =>{
    const id = parseInt(req.params.id);
    const {name, description} = req.body;

    pool.query("UPDATE collections SET name = $1, description = $2 WHERE id = $3", [name, description, id], (err, data) => {
        if(err){
            res.status(400).json("Error: " + err);
        }
        res.status(200).send("Collection modified with ID: ${id}");
    })
}

const deleteCollection = (req,res) =>{
    const id = parseInt(req.params.id);
    pool.query("DELETE FROM collections WHERE id = $1", [id], (err, data) => {
        if(err){
            res.status(400).json("Error: " + err);
        }
        res.status(200).send("Collection deleted with ID: ${id}");
    })
}

/** ITEMS  */
const createItem = (req,res) =>{
    const {collection_id, name, description, value, condition} = req.body;
    pool.query("INSERT INTO items (collection_id, name, description, value, condition) VALUES ($1, $2, $3, $4, $5)", [collection_id, name, description, value, condition], (err, data) => {
        if(err){
            res.status(400).json("Error: " + err);
        }
        console.log("YASS");
        res.status(201).send("Added item to collection ${collection_id}");
    })
}

const getItems = (req,res) =>{
    console.log(req.params.id);
    const id = parseInt(req.params.id);

    pool.query("select * from items where collection_id = $1", [id], (err, data) => {
        if(err){
            res.status(400).json("Error: " + err);
        }
        res.status(200).json(data.rows);
    })
}

const getItemsById = (req,res) =>{
    const id = parseInt(req.params.id);
    pool.query("SELECT * FROM items WHERE id = $1", [id], (err, data) => {
        if(err){
            res.status(400).json("Error: " + err);
        }
        res.status(200).json(data.rows);
    })
}

const updateItems = (req,res) =>{
    const id = parseInt(req.params.id);
    const {name, description, value, condition} = req.body;

    pool.query("UPDATE items SET name = $1, description = $2, value = $3, condition = $4 WHERE id = $5", [name, description, value, condition, id], (err, data) => {
        if(err){
            res.status(400).json("Error: " + err);
        }
        res.status(200).send("Item modified with ID: ${id}");
    })
}

const deleteItem = (req,res) =>{
    const id = parseInt(req.params.id);
    pool.query("DELETE FROM items WHERE id = $1", [id], (err, data) => {
        if(err){
            res.status(400).json("Error: " + err);
        }
        res.status(200).send("Item deleted with ID: ${id}");
    })
}

module.exports = {
    createCollection,
    getCollections,
    getCollectionById,
    updateCollection,
    deleteCollection,
    createItem,
    getItems,
    getItemsById,
    updateItems,
    deleteItem
}
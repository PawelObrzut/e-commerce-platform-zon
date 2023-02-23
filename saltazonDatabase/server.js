// Create express app
import express from "express";

import db from "./database.js";

import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
const HTTP_PORT = 8000;
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// Insert here other API endpoints

//Get all users endpoint
app.get("/api/user", (req, res, next) => {
    const sql = "select * from UserData";
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});



//Get specific user by id endpoint
app.get("/api/user/:id", (req, res, next) => {
    const sql = "select * from UserData where id = ?";
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
});

//Patch a specific user
app.patch("/api/user/:id", (req, res, next) => {
    const data = {
        email: req.body.email,
        password : req.body.password,
        role : req.body.role,
        storeId: req.body.storeId
    }
    db.run(
        `UPDATE UserData set
           email = COALESCE(?,email),
           password = COALESCE(?,password)
           role = COALESCE(?,role)
           storeId = COALESCE(?,storeId)
           WHERE id = ?`,
        [data.email, data.password, data.role, data.storeId, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
        });
})

app.delete("/api/user/:id", (req, res, next) => {
    db.run(
        'DELETE FROM UserData WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
        });
})


//Post a new user endpoint
app.post("/api/user/", (req, res, next) => {
    const errors=[];
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (!req.body.email){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    const data = {
        email: req.body.email,
        password : req.body.password,
        role: req.body.role
    }
    const sql ='INSERT INTO UserData (email, password, role) VALUES (?,?,?)'
    const params = [data.email, data.password, data.role]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

//Get all products endpoint
app.get("/api/product", (req, res, next) => {
    const sql = "select * from ProductData";
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});

app.post("/api/product", (req, res, next) => {
    const errors=[];
    if (!req.body.title){
        errors.push("No title specified");
    }
    if (!req.body.description){
        errors.push("No description specified");
    }
    if (!req.body.imageUrl){
        errors.push("No imageUrl specified");
    }
    if (!req.body.price){
        errors.push("No price specified");
    }
    if (!req.body.quantity){
        errors.push("No quantity specified");
    }
    if (!req.body.category){
        errors.push("No category specified");
    }
    if (!req.body.storeId){
        errors.push("No storeId specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    const data = {
        title: req.body.title,
        description : req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category,
        storeId: req.body.storeId
    }
    const sql = "INSERT INTO ProductData (title, description, imageUrl, price, quantity, category, storeId) VALUES (?,?,?,?,?,?,?)"
    const params = [data.title, data.description, data.imageUrl, data.price, data.quantity, data.category, data.storeId];
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

//Get specific product by id endpoint
app.get("/api/product/:id", (req, res, next) => {
    const sql = "select * from ProductData where id = ?";
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
});

app.delete("/api/product/:id", (req, res, next) => {
    const sql = "DELETE FROM ProductData WHERE id = ?";
    const params = [req.params.id];
    db.run(sql, params, function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted"})
        });
})

//get specific store by id
app.get("/api/store/:id", (req, res, next) => {
    const sql = "select * from StoreData where uniqueStoreId = ?";
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
});

//get all stores by id
app.get("/api/store", (req, res, next) => {
    const sql = "select * from StoreData";
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});

//get all with storeId :something

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});

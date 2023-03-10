const express = require('express');
const fs = require("fs");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = process.env.port || 4000;
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

let aFileName = __dirname + '/www/data/poetry.json';
console.log(aFileName);
function getPoetry(req, res) {
    fs.readFile(aFileName, function (err, data) {
        let poetry = [];
        if (!err) poetry = JSON.parse(data);
        res.status(200).json(poetry);
    });
}

function getPoem(req, res) {
    const id = parseInt(req.params.id)
    fs.readFile(aFileName, function (err, data) {
        let poetry = [];
        if (!err) poetry = JSON.parse(data);
        res.status(200).json(poetry.filter(p => p.id === id));
    });
}

function addPoetry(req, res) {
    const { id, title, date} = req.body;
    const newPoetry = {id:parseInt(id), title, date};
    fs.readFile(aFileName, function (err, data) {
        let poetry = [];
        if (!err) poetry = JSON.parse(data);
        poetry.push(newPoetry);
        fs.writeFile(aFileName,JSON.stringify(poetry),function(err){
                if (err){
                    res.status(200).json(`Error adding id: ${id}`);
                }
                else{
                    res.status(200).json(`Poetry added with id: ${id}`);
                }
            });
    });
}

function updatePoetry(req, res) {
    const { id, title, date } = req.body;
    const aPoetry = {id:parseInt(id), title, date};
    fs.readFile(aFileName, function (err, data) {
        let poetry = [];
        if (!err) poetry = JSON.parse(data);
        const anIndex = poetry.findIndex(p=>p.id===aPoetry.id);
        if (anIndex < 0 ) {
            res.status(200).json(`Cannot find id: ${id}`);
            return;
        }
        poetry[anIndex] = aPoetry;
        fs.writeFile(aFileName,JSON.stringify(poetry),function(err){
                if (err){
                    res.status(200).json(`Error updating id: ${id}`);
                }
                else{
                    res.status(200).json(`Updated id: ${id}`);
                }
            });
    });
}

function deletePoetry(req, res) {
    const id = parseInt(req.body.id);
    fs.readFile(aFileName, function (err, data) {
        let poetry = [];
        if (!err) poetry = JSON.parse(data);
        const anIndex = poetry.findIndex(p=>p.id===id);
        if (anIndex < 0 ) {
            res.status(200).json(`Cannot find id: ${id}`);
            return;
        }
        poetry.splice(anIndex, 1)
        fs.writeFile(aFileName,JSON.stringify(poetry),function(err){
                if (err){
                    res.status(200).json(`Error deleting id: ${id}`);
                }
                else{
                    res.status(200).json(`Deleted id: ${id}`);
                }
            });
    });
}

app.get('/api/poetry', (req, res) => getPoetry(req, res));
app.get('/api/poetry/:id', (req, res) => getPoem(req, res));
app.post('/api/poetry', (req, res) => addPoetry(req, res));
app.put('/api/poetry/:id', (req, res) => updatePoetry(req, res));
app.delete('/api/poetry/:id', (req, res) => deletePoetry(req, res));

let bFileName = __dirname + '/www/data/tales.json';
function getTales(req, res) {
    fs.readFile(bFileName, function (err, data) {
        let tales = [];
        if (!err) tales = JSON.parse(data);
        res.status(200).json(tales);
    });
}

function getTale(req, res) {
    const id = parseInt(req.params.id)
    fs.readFile(bFileName, function (err, data) {
        let tales = [];
        if (!err) tales = JSON.parse(data);
        res.status(200).json(tales.filter(p => p.id === id));
    });
}

function addTales(req, res) {
    const { id, title, date} = req.body;
    const newTales = {id:parseInt(id), title, date};
    fs.readFile(bFileName, function (err, data) {
        let tales = [];
        if (!err) tales = JSON.parse(data);
        tales.push(newTales);
        fs.writeFile(bFileName,JSON.stringify(tales),function(err){
                if (err){
                    res.status(200).json(`Error adding id: ${id}`);
                }
                else{
                    res.status(200).json(`Tales added with id: ${id}`);
                }
            });
    });
}

function updateTales(req, res) {
    const { id, title, date } = req.body
    const aTales = {id:parseInt(id), title, date};
    fs.readFile(bFileName, function (err, data) {
        let tales = [];
        if (!err) tales = JSON.parse(data);
        const anIndex = tales.findIndex(p=>p.id===aTales.id);
        if (anIndex < 0 ) {
            res.status(200).json(`Cannot find id: ${id}`);
            return;
        }
        tales[anIndex] = aTales;
        fs.writeFile(bFileName,JSON.stringify(tales),function(err){
                if (err){
                    res.status(200).json(`Error updating id: ${id}`);
                }
                else{
                    res.status(200).json(`Updated id: ${id}`);
                }
            });
    });
}

function deleteTales(req, res) {
    const id = parseInt(req.body.id)
    fs.readFile(bFileName, function (err, data) {
        let tales = [];
        if (!err) tales = JSON.parse(data);
        const anIndex = tales.findIndex(p=>p.id===id);
        if (anIndex < 0 ) {
            res.status(200).json(`Cannot find id: ${id}`);
            return;
        }
        tales.splice(anIndex, 1)
        fs.writeFile(bFileName,JSON.stringify(tales),function(err){
                if (err){
                    res.status(200).json(`Error deleting id: ${id}`);
                }
                else{
                    res.status(200).json(`Deleted id: ${id}`);
                }
            });
    });
}

app.get('/api/tales', (req, res) => getTales(req, res));
app.get('/api/tales/:id', (req, res) => getTale(req, res));
app.post('/api/tales', (req, res) => addTales(req, res));
app.put('/api/tales/:id', (req, res) => updateTales(req, res));
app.delete('/api/tales/:id', (req, res) => deleteTales(req, res));

app.use(express.static(__dirname + '/www'));
const users = {'manipull': 'Manipull#1234'};
app.post('/login', (req, res) => {
    // get username from the client form data
    const username = req.body.username;
    const password = users[username];
    //check if the passwords are equal
    if (password && password === req.body.password) {
        res.cookie('username', username);
        res.redirect("/logout.html");
    }
    res.send('Failed to login!')
})
app.get('/logout', (req, res) => {
    res.clearCookie('username');
    res.redirect('/')
});
const isAuthenticated = (req, res, next) => {
    if (!req.cookies.username){
        res.status(401);
        res.send('Access Forbidden');
    }    
    next();
}
console.log("Server listening at " + port);
app.listen(port); 
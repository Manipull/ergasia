const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = process.env.port || 4000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

let aFileName = __dirname + '/www/data/poetry.json';

function getPoetry(req, res) {
    fs.readFile(aFileName, function (err, data) {
        let poetry = [];
        if (!err) poetry = JSON.parse(data);
        res.status(200).json(poetry);
    });
}

function getPoetry(req, res) {
    const title = parseInt(req.params.title)
    fs.readFile(aFileName, function (err, data) {
        let poetry = [];
        if (!err) poetry = JSON.parse(data);
        res.status(200).json(poetry.filter(p => p.title === title));
    });
}

function addPoetry(req, res) {
    const { title, date} = req.body;
    const newPoetry = {title:title, date};
    fs.readFile(aFileName, function (err, data) {
        let poetry = [];
        if (!err) poetry = JSON.parse(data);
        poetry.push(newPoetry);
        fs.writeFile(aFileName,JSON.stringify(poetry),function(err){
                if (err){
                    res.status(200).json(`Error adding title: ${title}`);
                }
                else{
                    res.status(200).json(`Poetry added with title: ${title}`);
                }
            });
    });
}

function updatePoetry(req, res) {
    const { title, date } = req.body
    const aPoetry = {title:title, date};
    fs.readFile(aFileName, function (err, data) {
        let poetry = [];
        if (!err) poetry = JSON.parse(data);
        const anIndex = poetry.findIndex(p=>p.title===aPoetry.title);
        if (anIndex < 0 ) {
            res.status(200).json(`Cannot find title: ${title}`);
            return;
        }
        poetry[anIndex] = aPoetry;
        fs.writeFile(aFileName,JSON.stringify(poetry),function(err){
                if (err){
                    res.status(200).json(`Error updating title: ${title}`);
                }
                else{
                    res.status(200).json(`Updated title: ${title}`);
                }
            });
    });
}

function deletePoetry(req, res) {
    const title = parseInt(req.body.title)
    fs.readFile(aFileName, function (err, data) {
        let poetry = [];
        if (!err) poetry = JSON.parse(data);
        const anIndex = poetry.findIndex(p=>p.title===title);
        if (anIndex < 0 ) {
            res.status(200).json(`Cannot find title: ${title}`);
            return;
        }
        poetry.splice(anIndex, 1)
        fs.writeFile(aFileName,JSON.stringify(poetry),function(err){
                if (err){
                    res.status(200).json(`Error deleting title: ${title}`);
                }
                else{
                    res.status(200).json(`Deleted title: ${title}`);
                }
            });
    });
}

app.get('/api/poetry', (req, res) => getPoetry(req, res));
app.get('/api/poetry/:title', (req, res) => getPoetry(req, res));
app.post('/api/poetry', (req, res) => addPoetry(req, res));
app.put('/api/poetry/:title', (req, res) => updatePoetry(req, res));
app.delete('/api/poetry/:title', (req, res) => deletePoetry(req, res));

app.use(express.static(__dirname + '/www'));
const users = {'user1': 'password1','user2': 'password2'};
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
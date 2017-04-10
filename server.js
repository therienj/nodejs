const express = require ('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//middleware calls
//app.use(express.static(__dirname + '/public'));
app.use((req, res, next) =>{
  var now =new Date().toString();
  var log = `${now} : ${req.method } ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err){
    console.log("Erreur en tentant d'écrire dans le log");
    }
  });
  console.log(log);
  next();
});

// app.use((req, res, next) =>{
// res.render('maintenance.hbs');
// });


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req,res) =>{
  res.render('Home.hbs', {
    pageTitle: "Page d'acceuil",
    welcomeMessage: 'Bienvenue dans mon application nodejs.'
  });
});

// app.get('/maintenance', (req,res) =>{
//   res.render('maintenance.hbs', {
//     pageTitle: "En réparation, on vous reviens bientôt.",
//     welcomeMessage: 'Maintenance régulière'
//   });
// });

app.get('/about', (req,res) =>{
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/bad', (req,res) =>{
  res.send({
    Erreur : "Vérifiez votre url"
  });
});

app.get('/moi', (req,res) =>{
  res.redirect ('https://missionoruro.wordpress.com/');
});

app.get('/aide', (req,res) =>{
  res.render('help.hbs', {
    pageTitle: "Page d'aide",
    welcomeMessage: "Future page daide."
  });
});

app.listen(port, function () {
  console.log(`Le serveur est up sur le port ${port}`);
});

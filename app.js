const express = require('express');
const path=require('path')
const ejs = require('ejs');
const upload = require('./upload');


// Init app
const app = express();

// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => res.render('index'));


app.post('/upload', (req, res) => {
  console.log('hit');
  upload(req, res, (err) => {
    if(err){
      console.log(err)
      res.render('index', {
        message: err
      });
    } else {
      if(req.file == undefined){
        res.render('index', {
          message: 'Error: No File Selected!'
        });
      } else {
        res.render('index', {
          message: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});



const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));


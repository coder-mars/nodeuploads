const express = require('express');
const path = require('path')
const ejs = require('ejs');
const upload = require('./upload');


// Init app
const app = express();

// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => res.render('index', {
  files: []
}));


app.post('/upload', (req, res) => {

  upload(req, res, (err) => {
    console.log(object);
    const { files } = req;
    console.log(files)
    if (err) {
      console.log(err)
      res.render('index', {
        message: err
      });
    } else {
      if (files.length == 0) {
        res.render('index', {
          message: 'Error: No File Selected!'
        });
      } else {
        res.render('index', {
          message: 'File Uploaded!',
          files
        });
      }
    }
  });
});


app.post('/upload-image', upload.single('file'), (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading image',
      error: error
    });
  }
})


const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));


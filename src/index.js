const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/database')
    .then(db => console.log('Database is connected'))
    .catch(err => console.error(err));

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());

app.use('/documents', require('./routes/documents'));

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), () => {
   console.log('Server on port', app.get('port'));
});

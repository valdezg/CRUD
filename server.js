let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
const PORT = 3000;

let pool = new pg.Pool({

  user:'postgres',
  database:'Clinical Trials',
  host:'localhost',
  port: 5432,
  max:100

});


let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(morgan('dev'));

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/api/new-country', function(request,response){
  var initials = request.body.initials;
  var age = request.body.age;
  var id = request.body.id;
  let values = [initials, age, id];
  pool.connect((err, db, done ) => {
    if(err) {
      return response.status(400).send(err);
    }
    else {


      db.query('INSERT INTO patient(initials, age, id ) VALUES($1, $2, $3)',[...values], (err, table) => {
        if (err){
          return response.status(400).send(err);
        }
        else {
          console.log('INSERTED DATA SUCCESS');
          db.end();
          response.status(201).send({message:'Data Inserted:'});
        }
      })
    }
  })
});

app.listen(PORT, () => console.log('Listening on port ' + PORT));

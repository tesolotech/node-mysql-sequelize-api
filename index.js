const express = require('express');

const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json());


// Configuring the database
const db = require('./app/models/server.js');
db.sequelize.sync();


 // Handling CORS error     
app.use((req,res,next)=>{
      res.header('Access-Control-Allow-Origin','*');
      res.header('Access-Control-Allow-Headers','Origin, X-Requested-with, Content-Type, Accept, Authorization');
      if(res.method === 'OPTIONS'){
           res.header('Access-Control-Allow-Methods', 'PUT, GET, DELETE, POST, PATCH');
           return res.status(200).json({});
      }
      next();
});


app.set('port', process.env.PORT || 3000);

// Require Users routes
require('./app/routes/turorial.routes.js')(app);

app.listen(app.get('port'), () => console.log(`Server is listening on port ${app.get('port')}`));
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gccRouter = require('./routes/gcc');
var gppRouter = require('./routes/gpp');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gcc', gccRouter);
app.use('/gpp', gppRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var mysql = require('mysql');

// database connection pool
var connection = mysql.createConnection({

  host       : 'localhost',
  user       : 'root',
  password   : 'password',
  port       : '3306',
  database   : 'expressdb',
  insecureAuth : true
});

var databaseName = 'expressdb';

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected");
  connection.query("CREATE DATABASE " + databaseName, function (err, result) {
    console.log("Database Connected");
  });

});


var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
var multer  = require('multer');

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));


var pathlib = require('path');

//upload processing
var objMulter = multer({dest:'./www/upload'}); //uploaded file could be stored in 'www' directory
app.use(objMulter.any()); //processing in all type of file

// middleware for POST method
var urlencodedParser = bodyParser.urlencoded({extended: false});


app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
   console.log("Home page");
})


app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
   console.log("Home page");
})


// user login function
app.post('/login_post', function (req, res) {

   // output JSON format
   var response = {
       "account":req.body.account,
       "password":req.body.password,
   };

   var selectSQL = "select account,password from user where account = '"+req.body.account+"' and password = '"+req.body.password+"'";
   var addSqlParams = [req.body.account, req.body.password];

   connection.query(selectSQL, function(err, result){
   if(err){
     res.sendFile(__dirname + "/" + "loginfailed.html");
     console.log("login error");
     return;
   }

   if(result==''){
     res.sendFile(__dirname + "/" + "loginfailed.html");
     console.log("Incorrect account password");
   }

   else{
     res.sendFile(__dirname + "/" + "user.html");
     console.log("login successfully");

   }

});

console.log(response);
})


//admin login
app.post('/vote_post', function(req, res) {

  // output JSON format
  var response = {
      "account":req.body.account,
      "password":req.body.password,
  };

  var selectSQL = "select account,password from admin where account = '"+req.body.account+"' and password = '"+req.body.password+"'";
  var addSqlParams = [req.body.account, req.body.password];

  connection.query(selectSQL, function(err, result){
  if(err){
    res.sendFile(__dirname + "/" + "loginfailed.html.html");
    console.log("login error");
    return;
  }

  if(result==''){
    res.sendFile(__dirname + "/" + "loginfailed.html.html");
    console.log("Incorrect account password");
  }

  if(req.body.account == 'a12345678' && req.body.password == '12345') {
    res.sendFile(__dirname + "/" + "adminlogin.html");
    console.log("admin interface");
  }

});

console.log(response);

})


// lookup all users for admin
app.get('/look', function(req, res) {

  var lookSQL = 'SELECT * FROM user';

  connection.query(lookSQL, function(err, result) {
    if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }

         res.send(result);
         console.log("Printed all users");

  });

})


// view all submission
app.get('/view', function(req, res) {

  var viewSQL = 'SELECT * FROM challenge';

  connection.query(viewSQL, function(err, result) {
    if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
    }

      res.send(result);
      console.log("Printed All Submission");

  });

})



// redirect page
app.get('/admin.html', function (req, res) {
   res.sendFile( __dirname + "/" + "admin.html" );
   console.log("admin page");
})

app.get('/register.html', function (req, res) {
   res.sendFile( __dirname + "/" + "register.html" );
   console.log("register page");
})


app.get('/adminlogin.html', function (req, res) {
   res.sendFile( __dirname + "/" + "adminlogin.html" );
   console.log("admin login page");
})

app.get('/contact.html', function (req, res) {
   res.sendFile( __dirname + "/" + "contact.html" );
   console.log("contact page");
})

app.get('/uploaded.html', function (req, res) {
   res.sendFile( __dirname + "/" + "uploaded.html" );
   console.log("contact page");
})



var  addSql = 'INSERT INTO user(account,password,name) VALUES(?,?,?)';

//user registration
app.post('/process_post',urlencodedParser, function (req, res) {

  // output JSON format
   var response = {
       "account":req.body.account,
       "password":req.body.password,
       "name":req.body.name
   };
   var  addSqlParams = [req.body.account,req.body.password,req.body.name];
   connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         res.end("0");
         return;
        }
        res.sendFile(__dirname + "/" + "registed.html");
        console.log("signedup successfully");
});
   console.log(response);
   //res.end(JSON.stringify(response));
})



var insertSQL = 'INSERT INTO challenge(name,description,data) VALUES(?,?,?)';
// added challenge
app.post('/table_post', urlencodedParser, function(req, res) {

  // output JSON format
  var response = {
      "name":req.body.name,
      "description":req.body.description,
      "data":req.body.data
  };
  var  addSqlParams = [req.body.name,req.body.description,req.body.data];
  connection.query(insertSQL,addSqlParams,function (err, result) {
    if(err){
     console.log('[INSERT ERROR] - ',err.message);
     res.end("0");
     return;
    }
    console.log("Added successfully");
  });
  console.log(response);

})



//file upload funcation
app.post('/file_upload', function (req, res) {

  console.log(req.files[0].originalname); //req.files

	//obtain original name
	var newName = req.files[0].path+pathlib.parse(req.files[0].originalname).ext;

	//rename
	fs.rename(req.files[0].path,newName,function(err){
		if(err){
			res.send('Sorry, Please try again!');
		}else{
			console.log("uploaded successfully!");
      res.sendFile(__dirname + "/" + "uploaded.html");
		}
	});

});


app.get('/gcc', function(req, res, next) {
    var spawn = require('child_process').spawn;
    var compile = spawn('gcc', ['submission_files/temp.c']);
    compile.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    compile.stderr.on('data', function (data) {
        console.log(String(data));
    });
    compile.on('close', function (data) {
        if (data === 0) {
            var run = spawn('./a.out', []);
            run.stdout.on('data', function (output) {
                console.log(String(output));
            });
            run.stderr.on('data', function (output) {
                console.log(String(output));
            });
            run.on('close', function (output) {
                console.log('stdout: ' + output);
            })
        }
    })
    res.send('gcc compiled');
});

app.get('/gpp', function(req, res, next) {
    var spawn = require('child_process').spawn;
    var compile = spawn('g++', ['submission_files/temp.cpp']);
    compile.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    compile.stderr.on('data', function (data) {
        console.log(String(data));
    });
    compile.on('close', function (data) {
        if (data === 0) {
            var run = spawn('./a.out', []);
            run.stdout.on('data', function (output) {
                console.log(String(output));
            });
            run.stderr.on('data', function (output) {
                console.log(String(output));
            });
            run.on('close', function (output) {
                console.log('stdout: ' + output);
            })
        }
    })
    res.send('g++ compiled');
});


// listening to port 8081
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Server is working at http://127.0.0.1%s", host, port)

})


module.exports = app;

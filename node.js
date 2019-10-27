// var mysql = require('mysql');

// // set up connection pool
// var connection = mysql.createConnection({

//   host       : 'localhost',
//   user       : 'root',
//   password   : 'password',
//   port       : '3306',
//   database   : 'expressdb',
//   insecureAuth : true
// });

// connection.connect();

// var express = require('express');
// var app = express();
// var fs = require("fs");

// var bodyParser = require('body-parser');
// var multer  = require('multer');

// app.use('/public', express.static('public'));
// app.use(bodyParser.urlencoded({ extended: false }));


// var pathlib = require('path');

// //upload processing
// var objMulter = multer({dest:'./www/upload'}); //uploaded file could be stored in 'www' directory
// app.use(objMulter.any()); //processing in all type of file

// app.get('/', function (req, res) {
//    res.sendFile( __dirname + "/" + "index.html" );
//    console.log("Home page");
// })

// app.get('/index.html', function (req, res) {
//    res.sendFile( __dirname + "/" + "index.html" );
//    console.log("Home page");
// })


// // user login function
// app.get('/login', function (req, res) {

//    // output JSON format
//    var response = {
//        "account":req.query.account,
//        "password":req.query.password,
//    };

//    var selectSQL = "select account,password from user where account = '"+req.query.account+"' and password = '"+req.query.password+"'";
//    var addSqlParams = [req.query.account, req.query.password];

//    connection.query(selectSQL, function(err, result){
//    if(err){
//      res.sendFile(__dirname + "/" + "loginfailed.html");
//      console.log("login error");
//      return;
//    }

//    if(result==''){
//      res.sendFile(__dirname + "/" + "loginfailed.html");
//      console.log("Incorrect account password");
//    }

//    else{
//      res.sendFile(__dirname + "/" + "user.html");
//      console.log("login successfully");

//    }

// });

// console.log(response);
// })


// //admin login
// app.get('/vote', function(req, res) {

//   // output JSON format
//   var response = {
//       "account":req.query.account,
//       "password":req.query.password,
//   };

//   var selectSQL = "select account,password from admin where account = '"+req.query.account+"' and password = '"+req.query.password+"'";
//   var addSqlParams = [req.query.account, req.query.password];

//   connection.query(selectSQL, function(err, result){
//   if(err){
//     res.sendFile(__dirname + "/" + "loginfailed.html.html");
//     console.log("login error");
//     return;
//   }

//   if(result==''){
//     res.sendFile(__dirname + "/" + "loginfailed.html.html");
//     console.log("Incorrect account password");
//   }

//   if(req.query.account == 'a12345678' && req.query.password == '12345') {
//     res.sendFile(__dirname + "/" + "adminlogin.html");
//     console.log("admin interface");
//   }

// });

// console.log(response);

// })



// app.get('/look', function(req, res) {

//   var lookSQL = 'SELECT * FROM user';

//   connection.query(lookSQL, function(err, result) {
//     if(err){
//           console.log('[SELECT ERROR] - ',err.message);
//           return;
//         }

//          res.send(result);
//          console.log("Printed all users");

//   });

// })


// // view all submission
// app.get('/view', function(req, res) {

//   var viewSQL = 'SELECT * FROM challenge';

//   connection.query(viewSQL, function(err, result) {
//     if(err){
//         console.log('[SELECT ERROR] - ',err.message);
//         return;
//     }

//       res.send(result);
//       console.log("Printed All Submission");

//   });

// })




// app.get('/admin.html', function (req, res) {
//    res.sendFile( __dirname + "/" + "admin.html" );
//    console.log("admin page");
// })

// app.get('/register.html', function (req, res) {
//    res.sendFile( __dirname + "/" + "register.html" );
//    console.log("register page");
// })


// app.get('/adminlogin.html', function (req, res) {
//    res.sendFile( __dirname + "/" + "adminlogin.html" );
//    console.log("admin login page");
// })

// app.get('/contact.html', function (req, res) {
//    res.sendFile( __dirname + "/" + "contact.html" );
//    console.log("contact page");
// })

// var  addSql = 'INSERT INTO user(account,password,name) VALUES(?,?,?)';


// //user registration
// app.get('/process_get', function (req, res) {


//    var response = {
//        "account":req.query.account,
//        "password":req.query.password,
//        "name":req.query.name
//    };
//    var  addSqlParams = [req.query.account,req.query.password,req.query.name];
//    connection.query(addSql,addSqlParams,function (err, result) {
//         if(err){
//          console.log('[INSERT ERROR] - ',err.message);
//          res.end("0");
//          return;
//         }
//         res.sendFile(__dirname + "/" + "registed.html");
//         console.log("signedup successfully");
// });
//    console.log(response);
//    //res.end(JSON.stringify(response));
// })



// var insertSQL = 'INSERT INTO challenge(name,description,data) VALUES(?,?,?)';

// app.get('/table_get', function(req, res) {

//   var response = {
//       "name":req.query.name,
//       "description":req.query.description,
//       "data":req.query.data
//   };
//   var  addSqlParams = [req.query.name,req.query.description,req.query.data];
//   connection.query(insertSQL,addSqlParams,function (err, result) {
//     if(err){
//      console.log('[INSERT ERROR] - ',err.message);
//      res.end("0");
//      return;
//     }
//     console.log("Added successfully");
//   });
//   console.log(response);
// })




// //file upload funcation
// app.post('/file_upload', function (req, res) {

//   console.log(req.files[0].originalname); //req.files

// 	//obtain original name
// 	var newName = req.files[0].path+pathlib.parse(req.files[0].originalname).ext;

// 	//rename
// 	fs.rename(req.files[0].path,newName,function(err){
// 		if(err){
// 			res.send('Sorry, Please try again!');
// 		}else{
// 			res.send('uploaded successfully!');
// 		}
// 	});

// });

// router.get('/gcc', function(req, res, next) {
//     var spawn = require('child_process').spawn;
//     var compile = spawn('gcc', ['submission_files/temp.c']);
//     compile.stdout.on('data', function (data) {
//         console.log('stdout: ' + data);
//     });
//     compile.stderr.on('data', function (data) {
//         console.log(String(data));
//     });
//     compile.on('close', function (data) {
//         if (data === 0) {
//             var run = spawn('./a.out', []);
//             run.stdout.on('data', function (output) {
//                 console.log(String(output));
//             });
//             run.stderr.on('data', function (output) {
//                 console.log(String(output));
//             });
//             run.on('close', function (output) {
//                 console.log('stdout: ' + output);
//             })
//         }
//     })
//     res.send('gcc compiled');
// });


// var server = app.listen(8081, function () {

//   var host = server.address().address
//   var port = server.address().port

//   console.log("Server is working at http://127.0.0.1%s", host, port)

// })

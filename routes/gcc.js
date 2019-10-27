var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
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

module.exports = router;
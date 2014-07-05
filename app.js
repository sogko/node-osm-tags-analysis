var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var osmfilter = require('./lib/osmfilter');
var analyser = require('./lib/analyser');

var app = express();

app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(busboy());

var cleanTempDir = function(){
    var dirs = [
            __dirname + '/uploads/',
            __dirname + '/public/downloads/'
    ];
    dirs.forEach(function(dir){
        fs.readdirSync(dir).forEach(function(fileName) {
            console.log('Deleted:', dir + fileName);
            fs.unlinkSync(dir + fileName);
        });
    });
};

app.get('/hello', function(req, res){
    res.send('Hello World');
});

app.get('/clean', function(req, res){
    cleanTempDir();
    res.send({ok:1});
});
app.post('/upload', function(req, res){

    var waitCount = 2;
    var filepath;
    var filter_options = '';

    var signalReadyForProcessing = function(){
        waitCount--;
        if (waitCount > 0) return;
        if (!filepath) return handleError('Upload failed', 'Failed to upload .osm file to server');
        processRequest();
    };

    var processRequest  = function(){
        var d = new Date();
        var base_destfilename = [ d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()].join('');
        var osm_destfilepath = __dirname + '/public/downloads/' + base_destfilename + '.osm';
        var json_destfilepath = __dirname + '/public/downloads/' + base_destfilename + '-statistics.json';

        console.log('Generating filtered .osm file...');

        osmfilter(filepath, osm_destfilepath , filter_options, function(osm_filepath, err){
            if (err)return handleError('osmfilter failed', 'Ensure that the file and the options are valid ('+err+')');

            console.log('Analysing filtered .osm file...', err);
            analyser(osm_filepath, json_destfilepath, function(results, json_filepath, err){

                if (err) return handleError('Analysis failed', 'Unable to analyse generated .osm data');

                results.download_links = {
                    osm: req.protocol + '://' + req.get('host') + '/downloads/' + base_destfilename + '.osm',
                    json: req.protocol + '://' + req.get('host') + '/downloads/' + base_destfilename + '-statistics.json'
                };

                console.log('Completed', (err)?err:'OK', results.download_links );

                res.send(results);
            });
        });
    };

    var handleError = function(message, description){
        console.log('Returned error:', message, description)
        res.send({error: message, description: description});
    };

    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {

        var d = new Date();
        filepath = [__dirname, '/uploads/', d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds(), '-', filename].join('');
        console.log('Writing to: ' + filepath);

        fstream = fs.createWriteStream(filepath);
        file.pipe(fstream);
        fstream.on('close', function () {
            signalReadyForProcessing();
        });
    });

    req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
        if (key === 'filter-options'){
            filter_options = value.trim();
        }
        signalReadyForProcessing();
    });

});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
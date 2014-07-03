'use strict';
var osmfilter;
var exec = require("child_process").exec;

osmfilter = function (input_file_path, output_file_path, options, done) {

    var whitelisted_options = [
        '--keep',
        '--keep-nodes',
        '--keep-ways',
        '--keep-relations',
        '--keep-nodes-ways',
        '--keep-nodes-relations',
        '--keep-ways-relations',
        '--drop',
        '--drop-nodes',
        '--drop-ways',
        '--drop-relations',
        '--drop-nodes-ways',
        '--drop-nodes-relations',
        '--drop-ways-relations',
        '--keep-tags',
        '--keep-node-tags',
        '--keep-way-tags',
        '--keep-relation-tags',
        '--keep-node-way-tags',
        '--keep-node-relation-tags',
        '--keep-way-relation-tags',
        '--drop-tags',
        '--drop-node-tags',
        '--drop-way-tags',
        '--drop-relation-tags',
        '--drop-node-way-tags',
        '--drop-node-relation-tags',
        '--drop-way-relation-tags',
        '--drop-author',
        '--drop-version',
        '--drop-nodes',
        '--drop-ways',
        '--drop-relations',
        '--drop-nodes',
        '--fake-author',
        '--fake-version',
        '--fake-lonlat',
        '--ignore-dependencies'
    ];

    var parsed_options = [];

    var options_arr = options.split(' ');
    var allow_token = false;
    for (var i in options_arr) {
        var token = options_arr[i].trim();
        if (token.indexOf('--') === 0) {
            token = token.toLowerCase();
            if (token.split('=').length > 0){
                allow_token = (whitelisted_options.indexOf(token.split('=')[0]) > -1);
            } else {
                allow_token = (whitelisted_options.indexOf(token) > -1);
            }
        }
        if (allow_token) {
            parsed_options.push(token);
        }
    }
    parsed_options = parsed_options.join(' ');

    var cmd = ['./osmfilter "', input_file_path, '" ', parsed_options, ' > "', output_file_path, '"'].join('');
    exec(cmd,
        {
            cwd: __dirname + '/../external/osmfilter/'
        },
        function (err, stdout, stderr) {
            done(output_file_path, err);
        });
};
module.exports = osmfilter;
'use strict';
var osmosis;
var exec = require("child_process").exec;
var cwd = process.cwd();

osmosis = function (input_file_path, output_file_path, options, done) {
    // only allow data manipulation tasks
    var allowed_options = [
        '--node-key', '--nk',
        '--node-key-value', '--nkv',
        '--way-key', '--wk',
        '--way-key-value', '--wkv',
        '--tag-filter', '--tf',
        '--used-none', '--un',
        '--used-way', '--uw',
        '--tag-transform', '--tt'
    ];

    var parsed_tasks = [];
    parsed_tasks.push('--read-xml');
    parsed_tasks.push(input_file_path);

    var options_arr = options.split(' ');
    var allow_params = false;
    for (var i in options_arr) {
        var token = options_arr[i].trim();
        if (token.indexOf('--') === 0) {
            allow_params = allowed_options.indexOf(token) > -1;
        }
        if (allow_params) {
            parsed_tasks.push(token);
        }
    }

    parsed_tasks.push('--write-xml');
    parsed_tasks.push(output_file_path);

    parsed_tasks = parsed_tasks.join(' ');

    exec(
        [__dirname, '/../external/osmosis/bin/osmosis ', parsed_tasks].join(''),
        function (err, stdout, stderr) {
            done(output_file_path, err);
        });


};
module.exports = osmosis;
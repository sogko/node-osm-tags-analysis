var OSMParser = require('osmparser');
var fs = require('fs');

var analyser = function(path, destpath, done){

    var parser = new OSMParser({
        cacheToDisk: false
    });
    var node_stats = {};
    var way_stats = {};
    var relation_stats = {};
    var keys = {};
    var values = {};

    var count = {
        nodes: 0,
        ways: 0,
        relations: 0
    };
    parser.on('node', function(data) {
        var tags = data.tags;
        count.nodes++;
        for(var key in tags){
            if (!node_stats[key]) node_stats[key] = {};
            if (!node_stats[key][tags[key]]) node_stats[key][tags[key]] = 0;
            node_stats[key][tags[key]]++;
            if (!keys[key]) keys[key] = 0; keys[key]++;
            if (!values[tags[key]]) values[tags[key]] = 0; values[tags[key]]++;
        }
    });

    parser.on('way', function(data) {
        var tags = data.tags;
        count.ways++;
        for(var key in tags){
            if (!way_stats[key]) way_stats[key] = {};
            if (!way_stats[key][tags[key]]) way_stats[key][tags[key]] = 0;
            way_stats[key][tags[key]]++;
            if (!keys[key]) key = 0; keys[key]++;
            if (!values[tags[key]]) values[tags[key]] = 0; values[tags[key]]++;
        }
    });

    parser.on('relation', function(data) {
        var tags = data.tags;
        count.relations++;
        for(var key in tags){
            if (!relation_stats[key]) relation_stats[key] = {};
            if (!relation_stats[key][tags[key]]) relation_stats[key][tags[key]] = 0;
            relation_stats[key][tags[key]]++;
            if (!keys[key]) key = 0; keys[key]++;
            if (!values[tags[key]]) values[tags[key]] = 0; values[tags[key]]++;
        }
    });

    parser.on('error', function(err) {
        console.error(err);
    });

    parser.on('end', function(err) {

        // remove duplicates
        count.keys = Object.keys(keys).length;
        count.values = Object.keys(values).length;

        var results = {
            count: count,
            nodes: node_stats,
            ways: way_stats,
            relations: relation_stats,
            keys: keys,
            values: values
        };
        fs.writeFile(destpath, JSON.stringify(results, null, 4), function(err) {
            console.log('Done');

            if(err) {
                console.log(err);
            } else {
                console.log("JSON saved to " + destpath);
            }

            done(results, destpath, err);
        });
    });

    parser.parse(path);
};
module.exports = analyser;
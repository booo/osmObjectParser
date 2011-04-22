var osmParser = require('./osmObjectParser');

osmParser.on('node', function(node) {
    console.log(node);
});

osmParser.on('way', function(way) {
    console.log(way);
});

osmParser.on('relation', function(relation) {
    console.log(relation);
});

osmParser.parseFile('../berlin.osm');

var osmParser = require('./osmObjectParser');

osmParser.on('node', function(node) {
    //console.log(node.id);
});

osmParser.on('way', function(way) {
    //console.log(way);
});

osmParser.on('relation', function(relation) {
    //console.log(relation);
});

osmParser.parseFile('/dev/stdin', function(error) {
    if(error) {
        console.log('something went wrong');
    }
    else {
        console.log('everything is fine');
    }
});
/*osmParser.parseFile('/dev/stdin',function() {
    console.log('finished');
});*/

var libxml = require("../libxmljs/libxmljs.node");
var events = require('events');
filename = __dirname + "/../berlin.osm";


var OsmObjectParser = function() {
    events.EventEmitter.call(this);
    var that = this; 
    this.parser = new libxml.SaxParser(function(cb) {
        //useless?
        var pjo = {
            tags    :   []
        };
        
        cb.onStartElementNS(function(elem, attrs, prefix, uri, namespaces) {
            var i;
            if(elem == 'node' || elem == 'way' || elem == 'relation') {
                pjo = {
                    tags    :   []    
                };
                for(i=0;i<attrs.length;i++) {
                    pjo[attrs[i][0]]=attrs[i][3];
                }
                if(elem == 'way') {
                    pjo.nodes = [];
                }
                else if(elem == 'relation') {
                    pjo.members = [];
                }
            } 
            else if(elem == 'tag') {
                //object?
                pjo.tags.push({
                    key     : attrs[0][3],
                    value   : attrs[1][3]
                });
            }
            else if(elem == 'member') {
                var temp = {};
                for(i=0;i<attrs.length;i++) {
                    temp[attrs[i][0]]=attrs[i][3];
                }
                pjo.members.push(temp);
            }
            else if(elem == 'nd') {
                pjo.nodes.push(attrs[0][3]);
            }
        });
        cb.onEndElementNS(function(elem, prefix, uri) {
            if(elem == 'node') {
                that.emit('node', pjo);
            }
            else if(elem == 'way') {
                that.emit('way', pjo);
            }
            else if(elem == 'relation') {
                that.emit('relation', pjo);
            }

            //emit on tags, bound, osm?
        });
        cb.onWarning(function(msg) {
            console.log(msg);
        });
        cb.onError(function(msg) {
            console.log(msg);
        });
});



};

OsmObjectParser.super_ = events.EventEmitter;
OsmObjectParser.prototype = Object.create(events.EventEmitter.prototype, {
    constructor: {
        value: OsmObjectParser,
        enumerable: false
    }
});

OsmObjectParser.prototype.parseFile = function(filename) {
    this.parser.parseFile(filename); 
};

module.exports = new OsmObjectParser();

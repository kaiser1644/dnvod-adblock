let queryToObject = function(queryString) {
    var jsonObj = {};
    var e, a = /\+/g,
        r = /([^&=]+)=?([^&]*)/g,
        d = function(s) {
            return decodeURIComponent(s.replace(a, " "));
        };

    while(e = r.exec(queryString)) {
        jsonObj[d(e[1])] = d(e[2]);
    }

    return jsonObj;
}

let objectToQuery = function(object) {
    var keys = Object.keys(object),
        key;
    var value, query = '';
    for(var i = 0; i < keys.length; i++) {
        key = keys[i];
        value = object[key];
        query += (query.length > 0 ? '&' : '') + key + '=' + encodeURIComponent(value);
    }
    return query;
}

var target = document.querySelector('object[name=ckplayer_a1]');
var clone = target.cloneNode(true);
var embedded = clone.querySelector('embed[name=ckplayer_a1]');
if (embedded) {
    var flashvars = embedded.attributes.flashvars.value;
    console.log(flashvars);
    flashvars = queryToObject(flashvars);

    delete flashvars["l"];
    delete flashvars["r"];
    delete flashvars["t"];

    console.log(flashvars);

    // update the clone with the new FlashVars
    embedded.attributes.flashvars.value = objectToQuery(flashvars);
    // replace the original object with the clone
    target.parentNode.replaceChild(clone, target);
}
const DataStore = require('nedb');

DataStore.prototype.insertAsync = function (docs) {
    const self = this;
    return new Promise((resolve) => {
        self.insert(docs, (err, newDocs) => {
            if(err) {
                resolve(err, null)
            }
            else {
                resolve(null, newDocs);
            }
        });
    });
};

DataStore.prototype.findAsync = function () {
    const self = this;
    if (!arguments[1]) {
        return new Promise((resolve) => {
            self.find(arguments[0], (err, docs) => {
                if(err) {
                    resolve(err, null);
                }
                else {
                    resolve(null, docs);
                }
            });
        });
    }
    else if(typeof arguments[1] === 'object') {
        return self.find(arguments[0], arguments[1], (err, docs) => {
            if(err) {
                resolve(err, null);
            }
            else {
                resolve(null, docs);
            }
        });
    }
    else {
        return self.find(...arguments);
    }
};

DataStore.prototype.count = function () {
    //
};

module.exports.default = DataStore;
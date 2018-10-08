const DataStore = require('nedb');

DataStore.prototype.insertAsync = function () {
    const self = this;
    return new Promise((resolve) => {
        self.insert(arguments[0], (err, newDocs) => {
            if(err) {
                resolve({err: err, newDocs: null});
            }
            else {
                resolve({err: null, newDocs: newDocs});
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
                    resolve({err: err, docs: null});
                }
                else {
                    resolve({err: null, docs: docs});
                }
            });
        });
    }
    else if(typeof arguments[1] === 'object') {
        return new Promise((resolve) => {
            self.find(arguments[0], arguments[1], (err, docs) => {
                if(err) {
                    resolve({err: err, docs: null});
                }
                else {
                    resolve({err: null, docs: docs});
                }
            });
        });
    }
    else {
        return self.find(...arguments);
    }
};

DataStore.prototype.countAsync = function () {
    const self = this;
    return new Promise((resolve) => {
        self.count(arguments[0], (err, count) => {
            if(err) {
                resolve({err: err, count: null});
            }
            else {
                resolve({err: null, count: count});
            }
        });
    });
};

DataStore.prototype.removeAsync = function () {
    const self = this;
    return new Promise((resolve) => {
        self.remove(arguments[0], arguments[1], (err, numRemoved) => {
            if(err) {
                resolve({err: err, numRemoved: null});
            }
            else {
                resolve({err: null, numRemoved: err});
            }
        });
    });
}

module.exports = DataStore;
const DataStore = require('nedb');

DataStore.prototype.insertAsync = function () {
    const self = this;
    return new Promise((resolve) => {
        self.insert(arguments[0], (err, newDocs) => {
            resolve({err, newDocs});
        });
    });
};

DataStore.prototype.findAsync = function () {
    const self = this;
    if (!arguments[1]) {
        return new Promise((resolve) => {
            self.find(arguments[0], (err, docs) => {
                resolve({err, docs});
            });
        });
    }
    else if(typeof arguments[1] === 'object') {
        return new Promise((resolve) => {
            self.find(arguments[0], arguments[1], (err, docs) => {
                resolve({err, docs});
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
            resolve({err, count});
        });
    });
};

DataStore.prototype.removeAsync = function () {
    const self = this;
    return new Promise((resolve) => {
        self.remove(arguments[0], arguments[1], (err, numRemoved) => {
            resolve({err, numRemoved});
        });
    });
};

DataStore.prototype.updateAsync = function () {
    const self = this;
    return new Promise((resolve) => {
        self.update(arguments[0], arguments[1], arguments[2], (err, numAffected, affectedDocuments, upsert) => {
            resolve({err, numAffected, affectedDocuments, upsert});
        });
    });
};

module.exports = DataStore;
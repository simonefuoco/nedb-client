const DataStore = require('nedb');
const fs = require('fs');
const util = require('util');

let pool = {};
const insertOld = DataStore.insert;
const findOld = DataStore.find;
const countOld = DataStore.count;
const removeOld = DataStore.remove;
const updateOld = DataStore.update;

DataStore.prototype.insert = function () {
    return util.promisify(insertOld)(arguments[0]);
};

DataStore.prototype.find = function () {
    if (!arguments[1]) {
        return util.promisify(findOld)(arguments[0]);
    }
    else if(typeof arguments[1] === 'object') {
        return util.promisify(arguments[0], arguments[1]);
    }
    else {
        return findOld(...arguments);
    }
};

DataStore.prototype.count = function () {
    return util.promisify(countOld)(arguments[0]);
};

DataStore.prototype.remove = function () {
    return util.promisify(removeOld)(arguments[0], arguments[1]);
};

DataStore.prototype.update = function () {
    return util.promisify(updateOld)(arguments[0], arguments[1], arguments[2]);
};


module.exports.acquire = function (name, path) {
    if (pool[name]) {
        return pool[name].store;
    }
    else {
        pool[name] = {};
        pool[name].path = path;
        pool[name].store = new DataStore({
            filename: pool[name].path,
            autoload: true
        });
        return pool[name].store;
    }
};

module.exports.release = async (name) => {
    delete pool[name].store;
    await util.promisify(fs.unlink)(pool.path);
    delete pool[name];
};

module.exports.releaseAll = async () => {
    let promises = [];
    for (const [key, value] of Object.entries(pool)) {
        delete value.store;
        promises.push(util.promisify(fs.unlink)(value.path));
    }
    await Promise.all(promises);
    pool = [];
};
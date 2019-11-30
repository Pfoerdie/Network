/**
 * @module Model 
 * @author Pfoerdie
 */

const
    _ = require("../tools"),
    _core = require("../core.js"),
    _private = new WeakMap(),
    _protected = _core.protected;

class Model {

    /**
     * @param {String} name 
     * @constructs Model 
     */
    constructor(name) {
        _.assert.String(name);
        _private.set(this, { name, classes: new Set() });
        _protected.set(this, {});
        _.log(this, "constructor", name);
    }

    get id() {
        _.assert.Model(this);
        return _private.get(this).name;
    }

    get [Symbol.iterator]() {
        _.assert.Model(this);
        return _private.get(this).classes.keys();
    }

    define(Class) {
        _.assert.Model(this);
        _.assert.function(Class);
        _.assert(Class === _core.Node || _core.Node.isPrototypeOf(Class), "Class has to inherit from Node.");
        _.assert(!_private.get(this).classes.has(Class), "Class is already defined.");
        _private.get(this).classes.add(Class);
    }

    construct(type, data) {
        _.assert.Model(this);
        _.assert.Object(data);
        let types = _.is.array(type) ? type : [type];
        let [Class, ...tmp] = Array.from(_private.get(this).classes.values())
            .filter(tmpClass => types.some(type => type === tmpClass.name));
        _.assert(Class, "No constructor has been found.");
        _.assert(tmp.length === 0, "No unique constructor has been found.");
        return new Class(data);
    }

    static [Symbol.hasInstance](instance) {
        return _private.has(instance);
    }

}

module.exports = Model;
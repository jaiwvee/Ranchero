/*
    
    Copyright 2014 Jai Veeraswami.
    All rights reserved.

    engine.js 9.2.0.521
    Release Notes
    - Revised for Ranchero Hawker

*/

/*global console*/
/*global alert*/

/* Constructors */
function InputResponder(target) {
    'use strict';
    this.target = target; // Default Value;
    this.catalyst = ''; // Default Value
    this.callback = null; // Default Value
}   // responds to input with a specified callback
function InputResponders(target) {
    'use strict';
    this.targets = target; // Default Value;
    this.catalyst = ''; // Default Value
    this.callback = null; // Default Value
}  // responds to inputs with specified callbacks

function ObjectLibrary(name) {
    'use strict';
    this.name = name || '';  // default value
    this.list = JSON.parse(localStorage.getItem(name)) || []; // default value
    this.size = this.list.length || 0; // default value
    this.flag = 0; // default value
    this.sort = null; // default value
}  // stores a reference to a library of objects 
function PropertyStore(name) {
    'use strict';
    this.name = name || ''; // default value
    return this;
}  // stores a reference to singular object data

/* Prototypes */
(function () {
    'use strict';
    ObjectLibrary.prototype.setProp = function (object, property, value) {
        Object.defineProperty(object, property, {
            configurable: true,
            enumerable: true,
            writable: true,
            value: value
        });
    };
    ObjectLibrary.prototype.getItem = function (itemID) {
        return this.list[itemID] || null;
    };
    ObjectLibrary.prototype.setItem = function (itemID, item) {
        this.list[itemID] = item;
    };
    ObjectLibrary.prototype.addItem = function (item) {
        this.list.push(item);
        this.size += 1;
    };
    ObjectLibrary.prototype.delItem = function (itemID) {
        this.list.splice(itemID, 1);
        this.size -= 1;
    };
    ObjectLibrary.prototype.sortBy = function (property) {
        this.list.sort(function (a, b) {
            return a[property].localeCompare(b[property]);
        });
        this.sort = property;
    };
    ObjectLibrary.prototype.save = function () {
        localStorage.setItem(this.name, JSON.stringify(this.list));
    };
    ObjectLibrary.prototype.reset = function () {
        localStorage.setItem(this.name, JSON.stringify([]));
    };
}());  // prototypes for objectlibrary
(function () {
    'use strict';
    var i;
    PropertyStore.prototype.setProp = function (object, property, value) {
        Object.defineProperty(object, property, {
            configurable: true,
            enumerable: true,
            writable: true,
            value: value
        });
    };
    PropertyStore.prototype.importItem = function (object, item) {
        var properties = Object.getOwnPropertyNames(item);
        for (i = 0; i < properties.length; i += 1) {
            Object.defineProperty(object, properties[i], {
                value: (Object.getOwnPropertyDescriptor(item, properties[i])).value,
                configurable: true,
                enumerable: true,
                writable: true
            });
        }
    };
}());  // prototypes for propertystore

(function () {
    'use strict';
    // InputResponder Lib. Basic Constructor Methods
    InputResponder.prototype.setCatalyst = function (catalyst) {
        this.catalyst = catalyst;
    };
    InputResponder.prototype.setCallback = function (callback) {
        this.callback = callback;
    };
    // InputResponder Lib. Response Constructor Methods
    InputResponder.prototype.activate = function () {
        this.target.addEventListener(this.catalyst, this.callback, false);
    };
    InputResponder.prototype.deactivate = function () {
        this.target.removeEventListener(this.catalyst, this.callback, false);
    };
    // InputResponder Lib. Advanced Constructor Methods
    InputResponder.prototype.sleep = function (seconds) {
        var self = this;
        self.deactivate();
        setTimeout(function () {
            self.activate();
        }, seconds * 1000);
    };
}());  // prototypes for inputresponder
(function () {
    'use strict';
    // InputResponders Lib. Basic Constructor Methods
    InputResponders.prototype.setCatalyst = function (catalyst) {
        this.catalyst = catalyst;
    };
    InputResponders.prototype.setCallback = function (callback) {
        this.callback = callback;
    };
    // InputResponders Lib. Response Constructor Methods
    InputResponders.prototype.activate = function () {
        var i;
        for (i = 0; i < this.targets.length; i += 1) {
            this.targets[i].addEventListener(this.catalyst, this.callback, false);
        }
        if (!this.targets.length) {
            this.targets.addEventListener(this.catalyst, this.callback, false);
        }
    };
    InputResponders.prototype.deactivate = function () {
        var i;
        for (i = 0; i < this.targets.length; i += 1) {
            this.targets[i].removeEventListener(this.catalyst, this.callback, false);
        }
        if (!this.targets.length) {
            this.targets.removeEventListener(this.catalyst, this.callback, false);
        }
    };
    // InputResponders Lib. Advanced Constructor Methods
    InputResponders.prototype.sleep = function (seconds) {
        var self = this;
        self.deactivate();
        setTimeout(function () {
            self.activate();
        }, seconds * 1000);
    };
}());  // prototypes for inputresponders
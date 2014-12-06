/*
    
    Copyright 2014 Jai Veeraswami.
    All rights reserved.

    engine.js 9.2.0.521
    Release Notes
    - Revised for Ranchero Hawker

*/

/*global console*/
/*global alert*/

// Constructors
function MuleLibraryStore(name) {
    'use strict';
    this.name = name || ''; // Default Value
    this.list = JSON.parse(localStorage.getItem(name)) || []; // Default Value
    this.size = this.list.length || 0; // Default Value
    this.flag = 0; // Default Value
    this.sort = null; // Default Value
}  // stores a mule library in local storage
function MuleMetadataStore(name) {
    'use strict';
    this.name = name || ''; // Default Value
    this.email = ''; // Default Value
    this.password = ''; // Default Value
    this.slots_used = 0; // Default Value
    this.slots_open = 16; // Default Value
    return this;
}  // stores song metadata in session storage
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

// Prototypes
// ... // prototypes for mulelibrarystore
// ... // prototypes for mulemetadatastore
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
    };
    InputResponders.prototype.deactivate = function () {
        var i;
        for (i = 0; i < this.targets.length; i += 1) {
            this.targets[i].removeEventListener(this.catalyst, this.callback, false);
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
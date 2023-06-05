/*
Copyright (c) 2019 Daybrush
name: order-map
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/order-map.git
version: 0.3.1
*/
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */


function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

/**
 *
 */
var OrderMap = /*#__PURE__*/ (function () {
    /**
     *
     */
    function OrderMap(separator) {
        this.separator = separator;
        this.orderMap = {};
    }
    /**
     *
     */
    OrderMap.prototype.getFullName = function (names) {
        return names.join(this.separator);
    };
    /**
     *
     */
    OrderMap.prototype.get = function (names) {
        return this.orderMap[this.getFullName(names)];
    };
    /**
     *
     */
    OrderMap.prototype.hasName = function (names) {
        var length = names.length;
        if (!length) {
            return false;
        }
        var lastName = names[length - 1];
        var arr = this.get(names.slice(0, length - 1));
        if (arr) {
            return arr.indexOf(lastName) >= 0;
        }
        return false;
    };
    /**
     *
     */
    OrderMap.prototype.gets = function (names, isFull) {
        if (isFull === void 0) { isFull = true; }
        var fullOrders = [];
        var self = this;
        function pushOrders(nextNames, stack) {
            var orders = self.get(nextNames);
            if (!orders) {
                return;
            }
            orders.forEach(function (name) {
                var nextStack = __spreadArray(__spreadArray([], stack, true), [name], false);
                var nextOrders = pushOrders(__spreadArray(__spreadArray([], nextNames, true), [name], false), nextStack);
                if (!nextOrders || !nextOrders.length) {
                    fullOrders.push(__spreadArray(__spreadArray([], stack, true), [name], false));
                }
            });
            return orders;
        }
        pushOrders(names, isFull ? names : []);
        return fullOrders;
    };
    /**
     *
     */
    OrderMap.prototype.set = function (names, orders) {
        var _this = this;
        names.forEach(function (name, i) {
            _this.addName(names.slice(0, i), name);
        });
        this.orderMap[this.getFullName(names)] = orders;
        return orders;
    };
    /**
     *
     */
    OrderMap.prototype.add = function (names) {
        var length = names.length;
        if (!length) {
            return [];
        }
        return this.addName(names.slice(0, -1), names[length - 1]);
    };
    /**
     *
     */
    OrderMap.prototype.addName = function (names, name) {
        var orders = this.get(names) || this.set(names, []);
        if (orders.indexOf(name) === -1) {
            orders.push(name);
        }
        return orders;
    };
    /**
     *
     */
    OrderMap.prototype.findIndex = function (names, orderName) {
        var orders = this.orderMap[this.getFullName(names)];
        if (!orders) {
            return -1;
        }
        return orders.indexOf(orderName);
    };
    /**
     *
     */
    OrderMap.prototype.remove = function (names) {
        var fullName = this.getFullName(names);
        var orderMap = this.orderMap;
        for (var name_1 in orderMap) {
            if (name_1.indexOf(fullName) === 0) {
                delete orderMap[name_1];
            }
        }
        var length = names.length;
        if (length) {
            var prevNames = names.slice(0, -1);
            var lastName = names[length - 1];
            this.splice(prevNames, this.findIndex(prevNames, lastName), 1);
        }
        return this;
    };
    /**
     *
     */
    OrderMap.prototype.filter = function (names, callback, isFull) {
        if (isFull === void 0) { isFull = true; }
        var result = this.gets(names, isFull).filter(callback);
        var map = new OrderMap(this.separator);
        var stack = isFull ? [] : names;
        result.forEach(function (nextNames) {
            map.add(__spreadArray(__spreadArray([], stack, true), nextNames, true));
        });
        return map;
    };
    /**
     *
     */
    OrderMap.prototype.splice = function (names, index, deleteCount) {
        var orders = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            orders[_i - 3] = arguments[_i];
        }
        var currentOrders = this.get(names) || this.set(names, []);
        currentOrders.splice.apply(currentOrders, __spreadArray([index, deleteCount], orders, false));
        return this;
    };
    /**
     *
     */
    OrderMap.prototype.clear = function () {
        this.orderMap = {};
    };
    /**
     *
     */
    OrderMap.prototype.setObject = function (obj) {
        var orderMap = this.orderMap;
        for (var name_2 in obj) {
            orderMap[name_2] = obj[name_2].slice();
        }
    };
    /**
     *
     */
    OrderMap.prototype.getObject = function () {
        var nextMap = {};
        var orderMap = this.orderMap;
        for (var name_3 in orderMap) {
            nextMap[name_3] = orderMap[name_3].slice();
        }
        return nextMap;
    };
    /**
     *
     */
    OrderMap.prototype.clone = function () {
        var map = new OrderMap(this.separator);
        map.setObject(map.orderMap);
        return map;
    };
    return OrderMap;
}());

export { OrderMap as default };
//# sourceMappingURL=order-map.esm.js.map

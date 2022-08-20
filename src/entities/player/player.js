"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Player = void 0;
var vector_1 = require("../../lib/vector");
var entities_1 = require("../entities");
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        /* This will initialise variables */
        _this.position = new vector_1.Vector(10, 10);
        return _this;
    }
    /* Update and Render */
    Player.prototype.update = function () {
        /* Update the elements for the player */
    };
    Player.prototype.render = function () {
        /* Render the changes made */
    };
    return Player;
}(entities_1.Entity));
exports.Player = Player;

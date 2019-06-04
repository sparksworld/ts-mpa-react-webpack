"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
// @ts-ignore
var axios_1 = require("~/lib/axios");
var config_1 = require("./config");
var Api = /** @class */ (function (_super) {
    __extends(Api, _super);
    function Api() {
        return _super.call(this, config_1["default"]) || this;
    }
    Api.prototype.getSearchType = function () {
        return this.get('/search/getSearchType');
    };
    Api.prototype.test = function () {
        return this.post('/test/getDate');
    };
    return Api;
}(axios_1["default"]));
exports["default"] = new Api();

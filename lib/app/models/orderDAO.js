"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderDAO = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var orderDAO = /*#__PURE__*/function () {
  function orderDAO(id, customer_name, cost, books) {
    (0, _classCallCheck2["default"])(this, orderDAO);
    (0, _defineProperty2["default"])(this, "id", -1);
    (0, _defineProperty2["default"])(this, "customer_name", "");
    (0, _defineProperty2["default"])(this, "cost", -1);
    (0, _defineProperty2["default"])(this, "books", "");
    this.id = id;
    this.customer_name = customer_name;
    this.cost = cost;
    this.books = books;
  }
  (0, _createClass2["default"])(orderDAO, [{
    key: "Id",
    get: function get() {
      return this.id;
    },
    set: function set(id) {
      this.id = id;
    }
  }, {
    key: "Customer_name",
    get: function get() {
      return this.customer_name;
    },
    set: function set(customer_name) {
      this.customer_name = customer_name;
    }
  }, {
    key: "Cost",
    get: function get() {
      return this.cost;
    },
    set: function set(cost) {
      this.cost = cost;
    }
  }, {
    key: "Books",
    get: function get() {
      return this.books;
    },
    set: function set(books) {
      this.books = books;
    }
  }]);
  return orderDAO;
}();
exports.orderDAO = orderDAO;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcmRlckRBTyIsImlkIiwiY3VzdG9tZXJfbmFtZSIsImNvc3QiLCJib29rcyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvb3JkZXJEQU8udHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIG9yZGVyREFPXHJcbntcclxuICAgIHByaXZhdGUgaWQ6IG51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSBjdXN0b21lcl9uYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBjb3N0OiBudW1iZXIgPSAtMTtcclxuICAgIHByaXZhdGUgYm9va3M6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6bnVtYmVyLCBjdXN0b21lcl9uYW1lOnN0cmluZywgY29zdDpudW1iZXIsIGJvb2tzOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5jdXN0b21lcl9uYW1lID0gY3VzdG9tZXJfbmFtZTtcclxuICAgICAgICB0aGlzLmNvc3QgPSBjb3N0O1xyXG4gICAgICAgIHRoaXMuYm9va3MgPSBib29rcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IElkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBJZChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgQ3VzdG9tZXJfbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1c3RvbWVyX25hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBDdXN0b21lcl9uYW1lKGN1c3RvbWVyX25hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuY3VzdG9tZXJfbmFtZSA9IGN1c3RvbWVyX25hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBDb3N0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29zdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IENvc3QoY29zdDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5jb3N0ID0gY29zdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IEJvb2tzKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9va3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBCb29rcyhib29rczogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5ib29rcyA9IGJvb2tzO1xyXG4gICAgfVxyXG59Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQWFBLFFBQVE7RUFPakIsa0JBQVlDLEVBQVMsRUFBRUMsYUFBb0IsRUFBRUMsSUFBVyxFQUFFQyxLQUFZLEVBQ3RFO0lBQUE7SUFBQSw2Q0FOcUIsQ0FBQyxDQUFDO0lBQUEsd0RBQ1MsRUFBRTtJQUFBLCtDQUNYLENBQUMsQ0FBQztJQUFBLGdEQUNELEVBQUU7SUFJdEIsSUFBSSxDQUFDSCxFQUFFLEdBQUdBLEVBQUU7SUFDWixJQUFJLENBQUNDLGFBQWEsR0FBR0EsYUFBYTtJQUNsQyxJQUFJLENBQUNDLElBQUksR0FBR0EsSUFBSTtJQUNoQixJQUFJLENBQUNDLEtBQUssR0FBR0EsS0FBSztFQUN0QjtFQUFDO0lBQUE7SUFBQSxLQUVELGVBQXdCO01BQ3BCLE9BQU8sSUFBSSxDQUFDSCxFQUFFO0lBQ2xCLENBQUM7SUFBQSxLQUVELGFBQWNBLEVBQVUsRUFBRTtNQUN0QixJQUFJLENBQUNBLEVBQUUsR0FBR0EsRUFBRTtJQUNoQjtFQUFDO0lBQUE7SUFBQSxLQUVELGVBQW1DO01BQy9CLE9BQU8sSUFBSSxDQUFDQyxhQUFhO0lBQzdCLENBQUM7SUFBQSxLQUVELGFBQXlCQSxhQUFxQixFQUFFO01BQzVDLElBQUksQ0FBQ0EsYUFBYSxHQUFHQSxhQUFhO0lBQ3RDO0VBQUM7SUFBQTtJQUFBLEtBRUQsZUFBMEI7TUFDdEIsT0FBTyxJQUFJLENBQUNDLElBQUk7SUFDcEIsQ0FBQztJQUFBLEtBRUQsYUFBZ0JBLElBQVksRUFBRTtNQUMxQixJQUFJLENBQUNBLElBQUksR0FBR0EsSUFBSTtJQUNwQjtFQUFDO0lBQUE7SUFBQSxLQUVELGVBQTJCO01BQ3ZCLE9BQU8sSUFBSSxDQUFDQyxLQUFLO0lBQ3JCLENBQUM7SUFBQSxLQUVELGFBQWlCQSxLQUFhLEVBQUU7TUFDNUIsSUFBSSxDQUFDQSxLQUFLLEdBQUdBLEtBQUs7SUFDdEI7RUFBQztFQUFBO0FBQUE7QUFBQSJ9
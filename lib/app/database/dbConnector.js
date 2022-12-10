"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbConnector = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _bookDAO = require("../models/bookDAO");
var _orderDAO = require("../models/orderDAO");
var mysql = _interopRequireWildcard(require("mysql"));
var util = _interopRequireWildcard(require("util"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var dbConnector = /*#__PURE__*/function () {
  function dbConnector(host, port, username, password) {
    (0, _classCallCheck2["default"])(this, dbConnector);
    (0, _defineProperty2["default"])(this, "host", "");
    (0, _defineProperty2["default"])(this, "port", 3306);
    (0, _defineProperty2["default"])(this, "username", "");
    (0, _defineProperty2["default"])(this, "password", "");
    (0, _defineProperty2["default"])(this, "schema", "bookstore");
    (0, _defineProperty2["default"])(this, "pool", this.initDbConnection());
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
    this.pool = this.initDbConnection();
  }
  (0, _createClass2["default"])(dbConnector, [{
    key: "initDbConnection",
    value: function initDbConnection() {
      return mysql.createPool({
        host: this.host,
        port: this.port,
        user: this.username,
        password: this.password,
        database: this.schema,
        connectionLimit: 10
      });
    }
  }, {
    key: "findAllBooks",
    value: function findAllBooks(callback) {
      var books = [];
      this.pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM books', function (err, rows, fields) {
          connection.release();
          if (err) throw err;
          for (var x = 0; x < rows.length; ++x) {
            books.push(new _bookDAO.bookDAO(rows[x].ID, rows[x].AUTHOR, rows[x].TITLE, rows[x].GENRE, rows[x].COST, rows[x].STOCK));
          }
          callback(books);
        });
      });
    }
  }, {
    key: "findBookById",
    value: function findBookById(id, callback) {
      var book;
      this.pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM books WHERE ID = ' + id, function (err, rows, fields) {
          connection.release();
          if (err) throw err;
          for (var x = 0; x < rows.length; ++x) {
            book = new _bookDAO.bookDAO(rows[x].ID, rows[x].AUTHOR, rows[x].TITLE, rows[x].GENRE, rows[x].COST, rows[x].STOCK);
          }
          callback(book);
        });
      });
    }
  }, {
    key: "findBooksByAuthor",
    value: function findBooksByAuthor(author, callback) {
      var books = [];
      this.pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query("SELECT * FROM books WHERE AUTHOR LIKE '%" + author + "%'", function (err, rows, fields) {
          connection.release();
          if (err) throw err;
          for (var x = 0; x < rows.length; ++x) {
            books.push(new _bookDAO.bookDAO(rows[x].ID, rows[x].AUTHOR, rows[x].TITLE, rows[x].GENRE, rows[x].COST, rows[x].STOCK));
          }
          callback(books);
        });
      });
    }
  }, {
    key: "findBooksByGenre",
    value: function findBooksByGenre(genre, callback) {
      var books = [];
      this.pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query("SELECT * FROM books WHERE GENRE LIKE '%" + genre + "%'", function (err, rows, fields) {
          connection.release();
          if (err) throw err;
          for (var x = 0; x < rows.length; ++x) {
            books.push(new _bookDAO.bookDAO(rows[x].ID, rows[x].AUTHOR, rows[x].TITLE, rows[x].GENRE, rows[x].COST, rows[x].STOCK));
          }
          callback(books);
        });
      });
    }
  }, {
    key: "findBooksByTitle",
    value: function findBooksByTitle(title, callback) {
      var books = [];
      this.pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query("SELECT * FROM books WHERE TITLE LIKE '%" + title + "%'", function (err, rows, fields) {
          connection.release();
          if (err) throw err;
          for (var x = 0; x < rows.length; ++x) {
            books.push(new _bookDAO.bookDAO(rows[x].ID, rows[x].AUTHOR, rows[x].TITLE, rows[x].GENRE, rows[x].COST, rows[x].STOCK));
          }
          callback(books);
        });
      });
    }
  }, {
    key: "createBook",
    value: function createBook(b, callback) {
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, connection) {
          var result1;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  connection.release();
                  if (!err) {
                    _context.next = 3;
                    break;
                  }
                  throw err;
                case 3:
                  connection.query = util.promisify(connection.query);
                  _context.next = 6;
                  return connection.query('INSERT INTO books (AUTHOR, TITLE, GENRE, COST, STOCK) VALUES(?,?,?,?,?)', [b.Author, b.Title, b.Genre, b.Cost, b.Stock]);
                case 6:
                  result1 = _context.sent;
                  if (result1.affectedRows != 1) {
                    callback(-1);
                  }
                  callback(result1.insertId);
                case 9:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "updateBook",
    value: function updateBook(b, callback) {
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err, connection) {
          var changes, result1;
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  connection.release();
                  if (!err) {
                    _context2.next = 3;
                    break;
                  }
                  throw err;
                case 3:
                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context2.next = 7;
                  return connection.query('UPDATE books SET AUTHOR=?, TITLE=?,  GENRE=?, COST=?, STOCK=? WHERE ID=?', [b.Author, b.Title, b.Genre, b.Cost, b.Stock, b.Id]);
                case 7:
                  result1 = _context2.sent;
                  if (result1.changedRows != 0) ++changes;
                  callback(changes);
                case 10:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));
        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "deleteBookById",
    value: function deleteBookById(id, callback) {
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(err, connection) {
          var changes, result1;
          return _regenerator["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  connection.release();
                  if (!err) {
                    _context3.next = 3;
                    break;
                  }
                  throw err;
                case 3:
                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context3.next = 7;
                  return connection.query('DELETE FROM books WHERE ID=' + id);
                case 7:
                  result1 = _context3.sent;
                  changes = changes + result1.affectedRows;
                  callback(changes);
                case 10:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));
        return function (_x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "findAllOrders",
    value: function findAllOrders(callback) {
      var orders = [];
      this.pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM orders', function (err, rows, fields) {
          connection.release();
          if (err) throw err;
          for (var x = 0; x < rows.length; ++x) {
            orders.push(new _orderDAO.orderDAO(rows[x].ID, rows[x].CUSTOMER_NAME, rows[x].COST, rows[x].BOOKS));
          }
          callback(orders);
        });
      });
    }
  }, {
    key: "findOrderById",
    value: function findOrderById(id, callback) {
      var order;
      this.pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM orders WHERE ID = ' + id, function (err, rows, fields) {
          connection.release();
          if (err) throw err;
          for (var x = 0; x < rows.length; ++x) {
            order = new _orderDAO.orderDAO(rows[x].ID, rows[x].CUSTOMER_NAME, rows[x].COST, rows[x].BOOKS);
          }
          callback(order);
        });
      });
    }
  }, {
    key: "findOrdersByCustomer",
    value: function findOrdersByCustomer(customer, callback) {
      var orders = [];
      this.pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query("SELECT * FROM orders WHERE CUSTOMER_NAME LIKE '%" + customer + "%'", function (err, rows, fields) {
          connection.release();
          if (err) throw err;
          for (var x = 0; x < rows.length; ++x) {
            orders.push(new _orderDAO.orderDAO(rows[x].ID, rows[x].CUSTOMER_NAME, rows[x].COST, rows[x].BOOKS));
          }
          callback(orders);
        });
      });
    }
  }, {
    key: "createOrder",
    value: function createOrder(o, callback) {
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(err, connection) {
          var result1;
          return _regenerator["default"].wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  connection.release();
                  if (!err) {
                    _context4.next = 3;
                    break;
                  }
                  throw err;
                case 3:
                  connection.query = util.promisify(connection.query);
                  _context4.next = 6;
                  return connection.query('INSERT INTO orders (CUSTOMER_NAME, COST, BOOKS) VALUES(?,?,?)', [o.Customer_name, o.Cost, o.Books]);
                case 6:
                  result1 = _context4.sent;
                  if (result1.affectedRows != 1) {
                    callback(-1);
                  }
                  callback(result1.insertId);
                case 9:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));
        return function (_x7, _x8) {
          return _ref4.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "updateOrder",
    value: function updateOrder(o, callback) {
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(err, connection) {
          var changes, result1;
          return _regenerator["default"].wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  connection.release();
                  if (!err) {
                    _context5.next = 3;
                    break;
                  }
                  throw err;
                case 3:
                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context5.next = 7;
                  return connection.query('UPDATE orders SET CUSTOMER_NAME=?, COST=?, BOOKS=? WHERE ID=?', [o.Customer_name, o.Cost, o.Books, o.Id]);
                case 7:
                  result1 = _context5.sent;
                  if (result1.changedRows != 0) ++changes;
                  callback(changes);
                case 10:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));
        return function (_x9, _x10) {
          return _ref5.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "deleteOrderById",
    value: function deleteOrderById(id, callback) {
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(err, connection) {
          var changes, result1;
          return _regenerator["default"].wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  connection.release();
                  if (!err) {
                    _context6.next = 3;
                    break;
                  }
                  throw err;
                case 3:
                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context6.next = 7;
                  return connection.query('DELETE FROM orders WHERE ID=' + id);
                case 7:
                  result1 = _context6.sent;
                  changes = changes + result1.affectedRows;
                  callback(changes);
                case 10:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }));
        return function (_x11, _x12) {
          return _ref6.apply(this, arguments);
        };
      }());
    }
  }]);
  return dbConnector;
}();
exports.dbConnector = dbConnector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkYkNvbm5lY3RvciIsImhvc3QiLCJwb3J0IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImluaXREYkNvbm5lY3Rpb24iLCJwb29sIiwibXlzcWwiLCJjcmVhdGVQb29sIiwidXNlciIsImRhdGFiYXNlIiwic2NoZW1hIiwiY29ubmVjdGlvbkxpbWl0IiwiY2FsbGJhY2siLCJib29rcyIsImdldENvbm5lY3Rpb24iLCJlcnIiLCJjb25uZWN0aW9uIiwicXVlcnkiLCJyb3dzIiwiZmllbGRzIiwicmVsZWFzZSIsIngiLCJsZW5ndGgiLCJwdXNoIiwiYm9va0RBTyIsIklEIiwiQVVUSE9SIiwiVElUTEUiLCJHRU5SRSIsIkNPU1QiLCJTVE9DSyIsImlkIiwiYm9vayIsImF1dGhvciIsImdlbnJlIiwidGl0bGUiLCJiIiwidXRpbCIsInByb21pc2lmeSIsIkF1dGhvciIsIlRpdGxlIiwiR2VucmUiLCJDb3N0IiwiU3RvY2siLCJyZXN1bHQxIiwiYWZmZWN0ZWRSb3dzIiwiaW5zZXJ0SWQiLCJjaGFuZ2VzIiwiSWQiLCJjaGFuZ2VkUm93cyIsIm9yZGVycyIsIm9yZGVyREFPIiwiQ1VTVE9NRVJfTkFNRSIsIkJPT0tTIiwib3JkZXIiLCJjdXN0b21lciIsIm8iLCJDdXN0b21lcl9uYW1lIiwiQm9va3MiXSwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvZGF0YWJhc2UvZGJDb25uZWN0b3IudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYm9va0RBTyB9IGZyb20gXCIuLi9tb2RlbHMvYm9va0RBT1wiO1xyXG5pbXBvcnQgeyBvcmRlckRBTyB9IGZyb20gXCIuLi9tb2RlbHMvb3JkZXJEQU9cIjtcclxuaW1wb3J0ICogYXMgbXlzcWwgZnJvbSBcIm15c3FsXCI7XHJcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSBcInV0aWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBkYkNvbm5lY3RvclxyXG57XHJcbiAgICBwcml2YXRlIGhvc3Q6c3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgcG9ydDpudW1iZXIgPSAzMzA2O1xyXG4gICAgcHJpdmF0ZSB1c2VybmFtZTpzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBwYXNzd29yZDpzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBzY2hlbWE6c3RyaW5nID0gXCJib29rc3RvcmVcIjtcclxuICAgIHByaXZhdGUgcG9vbCA9IHRoaXMuaW5pdERiQ29ubmVjdGlvbigpO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcihob3N0OnN0cmluZywgcG9ydDpudW1iZXIsIHVzZXJuYW1lOnN0cmluZywgcGFzc3dvcmQ6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaG9zdCA9IGhvc3Q7XHJcbiAgICAgICAgdGhpcy5wb3J0ID0gcG9ydDtcclxuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XHJcbiAgICAgICAgdGhpcy5wYXNzd29yZCA9IHBhc3N3b3JkO1xyXG4gICAgICAgIHRoaXMucG9vbCA9IHRoaXMuaW5pdERiQ29ubmVjdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdERiQ29ubmVjdGlvbigpOmFueVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBteXNxbC5jcmVhdGVQb29sKHtob3N0OiB0aGlzLmhvc3QsIHBvcnQ6IHRoaXMucG9ydCwgdXNlcjogdGhpcy51c2VybmFtZSwgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsIGRhdGFiYXNlOiB0aGlzLnNjaGVtYSwgY29ubmVjdGlvbkxpbWl0OiAxMH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaW5kQWxsQm9va3MoY2FsbGJhY2s6IGFueSlcclxuICAgIHtcclxuICAgICAgICBsZXQgYm9va3M6Ym9va0RBT1tdID0gW107XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcclxuIFxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIGJvb2tzJywgZnVuY3Rpb24gKGVycjphbnksIHJvd3M6YW55LCBmaWVsZHM6YW55KSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXHJcblxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJvd3MubGVuZ3RoOysreClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBib29rcy5wdXNoKG5ldyBib29rREFPKHJvd3NbeF0uSUQsIHJvd3NbeF0uQVVUSE9SLCByb3dzW3hdLlRJVExFLCByb3dzW3hdLkdFTlJFLCByb3dzW3hdLkNPU1QsIHJvd3NbeF0uU1RPQ0spKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soYm9va3MpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaW5kQm9va0J5SWQoaWQ6bnVtYmVyLCBjYWxsYmFjazogYW55KVxyXG4gICAge1xyXG4gICAgICAgIGxldCBib29rOmJvb2tEQU87XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gYm9va3MgV0hFUkUgSUQgPSAnK2lkLCBmdW5jdGlvbiAoZXJyOmFueSwgcm93czphbnksIGZpZWxkczphbnkpIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcm93cy5sZW5ndGg7Kyt4KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvb2sgPSBuZXcgYm9va0RBTyhyb3dzW3hdLklELCByb3dzW3hdLkFVVEhPUiwgcm93c1t4XS5USVRMRSwgcm93c1t4XS5HRU5SRSwgcm93c1t4XS5DT1NULCByb3dzW3hdLlNUT0NLKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soYm9vayk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZpbmRCb29rc0J5QXV0aG9yKGF1dGhvcjpzdHJpbmcsIGNhbGxiYWNrOiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGJvb2tzOmJvb2tEQU9bXSA9IFtdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBib29rcyBXSEVSRSBBVVRIT1IgTElLRSAnJVwiK2F1dGhvcitcIiUnXCIsIGZ1bmN0aW9uIChlcnI6YW55LCByb3dzOmFueSwgZmllbGRzOmFueSkgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxyXG5cclxuICAgICAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByb3dzLmxlbmd0aDsrK3gpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9va3MucHVzaChuZXcgYm9va0RBTyhyb3dzW3hdLklELCByb3dzW3hdLkFVVEhPUiwgcm93c1t4XS5USVRMRSwgcm93c1t4XS5HRU5SRSwgcm93c1t4XS5DT1NULCByb3dzW3hdLlNUT0NLKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGJvb2tzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICB9KTtcclxuICAgIH0gXHJcblxyXG4gICAgcHVibGljIGZpbmRCb29rc0J5R2VucmUoZ2VucmU6c3RyaW5nLCBjYWxsYmFjazogYW55KVxyXG4gICAge1xyXG4gICAgICAgIGxldCBib29rczpib29rREFPW10gPSBbXTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gYm9va3MgV0hFUkUgR0VOUkUgTElLRSAnJVwiK2dlbnJlK1wiJSdcIiwgZnVuY3Rpb24gKGVycjphbnksIHJvd3M6YW55LCBmaWVsZHM6YW55KSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXHJcblxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJvd3MubGVuZ3RoOysreClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBib29rcy5wdXNoKG5ldyBib29rREFPKHJvd3NbeF0uSUQsIHJvd3NbeF0uQVVUSE9SLCByb3dzW3hdLlRJVExFLCByb3dzW3hdLkdFTlJFLCByb3dzW3hdLkNPU1QsIHJvd3NbeF0uU1RPQ0spKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soYm9va3MpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaW5kQm9va3NCeVRpdGxlKHRpdGxlOnN0cmluZywgY2FsbGJhY2s6IGFueSlcclxuICAgIHtcclxuICAgICAgICBsZXQgYm9va3M6Ym9va0RBT1tdID0gW107XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcclxuICAgIFxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBib29rcyBXSEVSRSBUSVRMRSBMSUtFICclXCIrdGl0bGUrXCIlJ1wiLCBmdW5jdGlvbiAoZXJyOmFueSwgcm93czphbnksIGZpZWxkczphbnkpIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcm93cy5sZW5ndGg7Kyt4KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvb2tzLnB1c2gobmV3IGJvb2tEQU8ocm93c1t4XS5JRCwgcm93c1t4XS5BVVRIT1IsIHJvd3NbeF0uVElUTEUsIHJvd3NbeF0uR0VOUkUsIHJvd3NbeF0uQ09TVCwgcm93c1t4XS5TVE9DSykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhib29rcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZUJvb2soYjpib29rREFPLCBjYWxsYmFjazogYW55KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnSU5TRVJUIElOVE8gYm9va3MgKEFVVEhPUiwgVElUTEUsIEdFTlJFLCBDT1NULCBTVE9DSykgVkFMVUVTKD8sPyw/LD8sPyknLCBbYi5BdXRob3IsIGIuVGl0bGUsIGIuR2VucmUsIGIuQ29zdCwgYi5TdG9ja10pO1xyXG4gICAgICAgICAgICBpZihyZXN1bHQxLmFmZmVjdGVkUm93cyAhPSAxKXtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKC0xKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYWxsYmFjayhyZXN1bHQxLmluc2VydElkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlQm9vayhiOmJvb2tEQU8sIGNhbGxiYWNrOiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhbmdlcyA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnVVBEQVRFIGJvb2tzIFNFVCBBVVRIT1I9PywgVElUTEU9PywgIEdFTlJFPT8sIENPU1Q9PywgU1RPQ0s9PyBXSEVSRSBJRD0/JywgW2IuQXV0aG9yLCBiLlRpdGxlLCBiLkdlbnJlLCBiLkNvc3QsIGIuU3RvY2ssIGIuSWRdKTtcclxuICAgICAgICAgICAgaWYocmVzdWx0MS5jaGFuZ2VkUm93cyAhPSAwKVxyXG4gICAgICAgICAgICAgICAgKytjaGFuZ2VzO1xyXG5cclxuICAgICAgICAgICAgY2FsbGJhY2soY2hhbmdlcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWxldGVCb29rQnlJZChpZDpudW1iZXIsIGNhbGxiYWNrOiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuXHJcbiAgICAgICAgICAgIGxldCBjaGFuZ2VzID0gMDtcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ0RFTEVURSBGUk9NIGJvb2tzIFdIRVJFIElEPScraWQpO1xyXG4gICAgICAgICAgICBjaGFuZ2VzID0gY2hhbmdlcyArIHJlc3VsdDEuYWZmZWN0ZWRSb3dzO1xyXG5cclxuICAgICAgICAgICAgY2FsbGJhY2soY2hhbmdlcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZpbmRBbGxPcmRlcnMoY2FsbGJhY2s6IGFueSlcclxuICAgIHtcclxuICAgICAgICBsZXQgb3JkZXJzOm9yZGVyREFPW10gPSBbXTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSBvcmRlcnMnLCBmdW5jdGlvbiAoZXJyOmFueSwgcm93czphbnksIGZpZWxkczphbnkpIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcm93cy5sZW5ndGg7Kyt4KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVycy5wdXNoKG5ldyBvcmRlckRBTyhyb3dzW3hdLklELCByb3dzW3hdLkNVU1RPTUVSX05BTUUsIHJvd3NbeF0uQ09TVCwgcm93c1t4XS5CT09LUykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhvcmRlcnMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaW5kT3JkZXJCeUlkKGlkOm51bWJlciwgY2FsbGJhY2s6IGFueSlcclxuICAgIHtcclxuICAgICAgICBsZXQgb3JkZXI6b3JkZXJEQU87XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gb3JkZXJzIFdIRVJFIElEID0gJytpZCwgZnVuY3Rpb24gKGVycjphbnksIHJvd3M6YW55LCBmaWVsZHM6YW55KSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXHJcblxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJvd3MubGVuZ3RoOysreClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBvcmRlciA9IG5ldyBvcmRlckRBTyhyb3dzW3hdLklELCByb3dzW3hdLkNVU1RPTUVSX05BTUUsIHJvd3NbeF0uQ09TVCwgcm93c1t4XS5CT09LUyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG9yZGVyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZmluZE9yZGVyc0J5Q3VzdG9tZXIoY3VzdG9tZXI6c3RyaW5nLCBjYWxsYmFjazogYW55KVxyXG4gICAge1xyXG4gICAgICAgIGxldCBvcmRlcnM6b3JkZXJEQU9bXSA9IFtdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXHJcbiAgICBcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gb3JkZXJzIFdIRVJFIENVU1RPTUVSX05BTUUgTElLRSAnJVwiK2N1c3RvbWVyK1wiJSdcIiwgZnVuY3Rpb24gKGVycjphbnksIHJvd3M6YW55LCBmaWVsZHM6YW55KSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXHJcblxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJvd3MubGVuZ3RoOysreClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBvcmRlcnMucHVzaChuZXcgb3JkZXJEQU8ocm93c1t4XS5JRCwgcm93c1t4XS5DVVNUT01FUl9OQU1FLCByb3dzW3hdLkNPU1QsIHJvd3NbeF0uQk9PS1MpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sob3JkZXJzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlT3JkZXIobzpvcmRlckRBTywgY2FsbGJhY2s6IGFueSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ0lOU0VSVCBJTlRPIG9yZGVycyAoQ1VTVE9NRVJfTkFNRSwgQ09TVCwgQk9PS1MpIFZBTFVFUyg/LD8sPyknLCBbby5DdXN0b21lcl9uYW1lLCBvLkNvc3QsIG8uQm9va3NdKTtcclxuICAgICAgICAgICAgaWYocmVzdWx0MS5hZmZlY3RlZFJvd3MgIT0gMSl7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0MS5pbnNlcnRJZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZU9yZGVyKG86b3JkZXJEQU8sIGNhbGxiYWNrOiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhbmdlcyA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnVVBEQVRFIG9yZGVycyBTRVQgQ1VTVE9NRVJfTkFNRT0/LCBDT1NUPT8sIEJPT0tTPT8gV0hFUkUgSUQ9PycsIFtvLkN1c3RvbWVyX25hbWUsIG8uQ29zdCwgby5Cb29rcywgby5JZF0pO1xyXG4gICAgICAgICAgICBpZihyZXN1bHQxLmNoYW5nZWRSb3dzICE9IDApXHJcbiAgICAgICAgICAgICAgICArK2NoYW5nZXM7XHJcblxyXG4gICAgICAgICAgICBjYWxsYmFjayhjaGFuZ2VzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlbGV0ZU9yZGVyQnlJZChpZDpudW1iZXIsIGNhbGxiYWNrOiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuXHJcbiAgICAgICAgICAgIGxldCBjaGFuZ2VzID0gMDtcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ0RFTEVURSBGUk9NIG9yZGVycyBXSEVSRSBJRD0nK2lkKTtcclxuICAgICAgICAgICAgY2hhbmdlcyA9IGNoYW5nZXMgKyByZXN1bHQxLmFmZmVjdGVkUm93cztcclxuXHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGNoYW5nZXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBNkI7QUFBQTtBQUFBLElBRWhCQSxXQUFXO0VBU3BCLHFCQUFZQyxJQUFXLEVBQUVDLElBQVcsRUFBRUMsUUFBZSxFQUFFQyxRQUFlLEVBQ3RFO0lBQUE7SUFBQSwrQ0FSc0IsRUFBRTtJQUFBLCtDQUNGLElBQUk7SUFBQSxtREFDQSxFQUFFO0lBQUEsbURBQ0YsRUFBRTtJQUFBLGlEQUNKLFdBQVc7SUFBQSwrQ0FDcEIsSUFBSSxDQUFDQyxnQkFBZ0IsRUFBRTtJQUlsQyxJQUFJLENBQUNKLElBQUksR0FBR0EsSUFBSTtJQUNoQixJQUFJLENBQUNDLElBQUksR0FBR0EsSUFBSTtJQUNoQixJQUFJLENBQUNDLFFBQVEsR0FBR0EsUUFBUTtJQUN4QixJQUFJLENBQUNDLFFBQVEsR0FBR0EsUUFBUTtJQUN4QixJQUFJLENBQUNFLElBQUksR0FBRyxJQUFJLENBQUNELGdCQUFnQixFQUFFO0VBQ3ZDO0VBQUM7SUFBQTtJQUFBLE9BRUQsNEJBQ0E7TUFDSSxPQUFPRSxLQUFLLENBQUNDLFVBQVUsQ0FBQztRQUFDUCxJQUFJLEVBQUUsSUFBSSxDQUFDQSxJQUFJO1FBQUVDLElBQUksRUFBRSxJQUFJLENBQUNBLElBQUk7UUFBRU8sSUFBSSxFQUFFLElBQUksQ0FBQ04sUUFBUTtRQUFFQyxRQUFRLEVBQUUsSUFBSSxDQUFDQSxRQUFRO1FBQUVNLFFBQVEsRUFBRSxJQUFJLENBQUNDLE1BQU07UUFBRUMsZUFBZSxFQUFFO01BQUUsQ0FBQyxDQUFDO0lBQ3pKO0VBQUM7SUFBQTtJQUFBLE9BRUQsc0JBQW9CQyxRQUFhLEVBQ2pDO01BQ0ksSUFBSUMsS0FBZSxHQUFHLEVBQUU7TUFFeEIsSUFBSSxDQUFDUixJQUFJLENBQUNTLGFBQWEsQ0FBQyxVQUFTQyxHQUFPLEVBQUVDLFVBQWMsRUFDeEQ7UUFDSSxJQUFJRCxHQUFHLEVBQUUsTUFBTUEsR0FBRztRQUVsQkMsVUFBVSxDQUFDQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsVUFBVUYsR0FBTyxFQUFFRyxJQUFRLEVBQUVDLE1BQVUsRUFDL0U7VUFDSUgsVUFBVSxDQUFDSSxPQUFPLEVBQUU7VUFFcEIsSUFBSUwsR0FBRyxFQUFFLE1BQU1BLEdBQUc7VUFFbEIsS0FBSSxJQUFJTSxDQUFDLEdBQUMsQ0FBQyxFQUFDQSxDQUFDLEdBQUdILElBQUksQ0FBQ0ksTUFBTSxFQUFDLEVBQUVELENBQUMsRUFDL0I7WUFDSVIsS0FBSyxDQUFDVSxJQUFJLENBQUMsSUFBSUMsZ0JBQU8sQ0FBQ04sSUFBSSxDQUFDRyxDQUFDLENBQUMsQ0FBQ0ksRUFBRSxFQUFFUCxJQUFJLENBQUNHLENBQUMsQ0FBQyxDQUFDSyxNQUFNLEVBQUVSLElBQUksQ0FBQ0csQ0FBQyxDQUFDLENBQUNNLEtBQUssRUFBRVQsSUFBSSxDQUFDRyxDQUFDLENBQUMsQ0FBQ08sS0FBSyxFQUFFVixJQUFJLENBQUNHLENBQUMsQ0FBQyxDQUFDUSxJQUFJLEVBQUVYLElBQUksQ0FBQ0csQ0FBQyxDQUFDLENBQUNTLEtBQUssQ0FBQyxDQUFDO1VBQ2xIO1VBRUFsQixRQUFRLENBQUNDLEtBQUssQ0FBQztRQUNuQixDQUFDLENBQUM7TUFFTixDQUFDLENBQUM7SUFDTjtFQUFDO0lBQUE7SUFBQSxPQUVELHNCQUFvQmtCLEVBQVMsRUFBRW5CLFFBQWEsRUFDNUM7TUFDSSxJQUFJb0IsSUFBWTtNQUVoQixJQUFJLENBQUMzQixJQUFJLENBQUNTLGFBQWEsQ0FBQyxVQUFTQyxHQUFPLEVBQUVDLFVBQWMsRUFDeEQ7UUFDSSxJQUFJRCxHQUFHLEVBQUUsTUFBTUEsR0FBRztRQUVsQkMsVUFBVSxDQUFDQyxLQUFLLENBQUMsaUNBQWlDLEdBQUNjLEVBQUUsRUFBRSxVQUFVaEIsR0FBTyxFQUFFRyxJQUFRLEVBQUVDLE1BQVUsRUFDOUY7VUFDSUgsVUFBVSxDQUFDSSxPQUFPLEVBQUU7VUFFcEIsSUFBSUwsR0FBRyxFQUFFLE1BQU1BLEdBQUc7VUFFbEIsS0FBSSxJQUFJTSxDQUFDLEdBQUMsQ0FBQyxFQUFDQSxDQUFDLEdBQUdILElBQUksQ0FBQ0ksTUFBTSxFQUFDLEVBQUVELENBQUMsRUFDL0I7WUFDSVcsSUFBSSxHQUFHLElBQUlSLGdCQUFPLENBQUNOLElBQUksQ0FBQ0csQ0FBQyxDQUFDLENBQUNJLEVBQUUsRUFBRVAsSUFBSSxDQUFDRyxDQUFDLENBQUMsQ0FBQ0ssTUFBTSxFQUFFUixJQUFJLENBQUNHLENBQUMsQ0FBQyxDQUFDTSxLQUFLLEVBQUVULElBQUksQ0FBQ0csQ0FBQyxDQUFDLENBQUNPLEtBQUssRUFBRVYsSUFBSSxDQUFDRyxDQUFDLENBQUMsQ0FBQ1EsSUFBSSxFQUFFWCxJQUFJLENBQUNHLENBQUMsQ0FBQyxDQUFDUyxLQUFLLENBQUM7VUFDN0c7VUFFQWxCLFFBQVEsQ0FBQ29CLElBQUksQ0FBQztRQUNsQixDQUFDLENBQUM7TUFFTixDQUFDLENBQUM7SUFDTjtFQUFDO0lBQUE7SUFBQSxPQUVELDJCQUF5QkMsTUFBYSxFQUFFckIsUUFBYSxFQUNyRDtNQUNJLElBQUlDLEtBQWUsR0FBRyxFQUFFO01BRXhCLElBQUksQ0FBQ1IsSUFBSSxDQUFDUyxhQUFhLENBQUMsVUFBU0MsR0FBTyxFQUFFQyxVQUFjLEVBQ3hEO1FBQ0ksSUFBSUQsR0FBRyxFQUFFLE1BQU1BLEdBQUc7UUFFbEJDLFVBQVUsQ0FBQ0MsS0FBSyxDQUFDLDBDQUEwQyxHQUFDZ0IsTUFBTSxHQUFDLElBQUksRUFBRSxVQUFVbEIsR0FBTyxFQUFFRyxJQUFRLEVBQUVDLE1BQVUsRUFDaEg7VUFDSUgsVUFBVSxDQUFDSSxPQUFPLEVBQUU7VUFFcEIsSUFBSUwsR0FBRyxFQUFFLE1BQU1BLEdBQUc7VUFFbEIsS0FBSSxJQUFJTSxDQUFDLEdBQUMsQ0FBQyxFQUFDQSxDQUFDLEdBQUdILElBQUksQ0FBQ0ksTUFBTSxFQUFDLEVBQUVELENBQUMsRUFDL0I7WUFDSVIsS0FBSyxDQUFDVSxJQUFJLENBQUMsSUFBSUMsZ0JBQU8sQ0FBQ04sSUFBSSxDQUFDRyxDQUFDLENBQUMsQ0FBQ0ksRUFBRSxFQUFFUCxJQUFJLENBQUNHLENBQUMsQ0FBQyxDQUFDSyxNQUFNLEVBQUVSLElBQUksQ0FBQ0csQ0FBQyxDQUFDLENBQUNNLEtBQUssRUFBRVQsSUFBSSxDQUFDRyxDQUFDLENBQUMsQ0FBQ08sS0FBSyxFQUFFVixJQUFJLENBQUNHLENBQUMsQ0FBQyxDQUFDUSxJQUFJLEVBQUVYLElBQUksQ0FBQ0csQ0FBQyxDQUFDLENBQUNTLEtBQUssQ0FBQyxDQUFDO1VBQ2xIO1VBRUFsQixRQUFRLENBQUNDLEtBQUssQ0FBQztRQUNuQixDQUFDLENBQUM7TUFFTixDQUFDLENBQUM7SUFDTjtFQUFDO0lBQUE7SUFBQSxPQUVELDBCQUF3QnFCLEtBQVksRUFBRXRCLFFBQWEsRUFDbkQ7TUFDSSxJQUFJQyxLQUFlLEdBQUcsRUFBRTtNQUV4QixJQUFJLENBQUNSLElBQUksQ0FBQ1MsYUFBYSxDQUFDLFVBQVNDLEdBQU8sRUFBRUMsVUFBYyxFQUN4RDtRQUNJLElBQUlELEdBQUcsRUFBRSxNQUFNQSxHQUFHO1FBRWxCQyxVQUFVLENBQUNDLEtBQUssQ0FBQyx5Q0FBeUMsR0FBQ2lCLEtBQUssR0FBQyxJQUFJLEVBQUUsVUFBVW5CLEdBQU8sRUFBRUcsSUFBUSxFQUFFQyxNQUFVLEVBQzlHO1VBQ0lILFVBQVUsQ0FBQ0ksT0FBTyxFQUFFO1VBRXBCLElBQUlMLEdBQUcsRUFBRSxNQUFNQSxHQUFHO1VBRWxCLEtBQUksSUFBSU0sQ0FBQyxHQUFDLENBQUMsRUFBQ0EsQ0FBQyxHQUFHSCxJQUFJLENBQUNJLE1BQU0sRUFBQyxFQUFFRCxDQUFDLEVBQy9CO1lBQ0lSLEtBQUssQ0FBQ1UsSUFBSSxDQUFDLElBQUlDLGdCQUFPLENBQUNOLElBQUksQ0FBQ0csQ0FBQyxDQUFDLENBQUNJLEVBQUUsRUFBRVAsSUFBSSxDQUFDRyxDQUFDLENBQUMsQ0FBQ0ssTUFBTSxFQUFFUixJQUFJLENBQUNHLENBQUMsQ0FBQyxDQUFDTSxLQUFLLEVBQUVULElBQUksQ0FBQ0csQ0FBQyxDQUFDLENBQUNPLEtBQUssRUFBRVYsSUFBSSxDQUFDRyxDQUFDLENBQUMsQ0FBQ1EsSUFBSSxFQUFFWCxJQUFJLENBQUNHLENBQUMsQ0FBQyxDQUFDUyxLQUFLLENBQUMsQ0FBQztVQUNsSDtVQUVBbEIsUUFBUSxDQUFDQyxLQUFLLENBQUM7UUFDbkIsQ0FBQyxDQUFDO01BRU4sQ0FBQyxDQUFDO0lBQ047RUFBQztJQUFBO0lBQUEsT0FFRCwwQkFBd0JzQixLQUFZLEVBQUV2QixRQUFhLEVBQ25EO01BQ0ksSUFBSUMsS0FBZSxHQUFHLEVBQUU7TUFFeEIsSUFBSSxDQUFDUixJQUFJLENBQUNTLGFBQWEsQ0FBQyxVQUFTQyxHQUFPLEVBQUVDLFVBQWMsRUFDeEQ7UUFDSSxJQUFJRCxHQUFHLEVBQUUsTUFBTUEsR0FBRztRQUVsQkMsVUFBVSxDQUFDQyxLQUFLLENBQUMseUNBQXlDLEdBQUNrQixLQUFLLEdBQUMsSUFBSSxFQUFFLFVBQVVwQixHQUFPLEVBQUVHLElBQVEsRUFBRUMsTUFBVSxFQUM5RztVQUNJSCxVQUFVLENBQUNJLE9BQU8sRUFBRTtVQUVwQixJQUFJTCxHQUFHLEVBQUUsTUFBTUEsR0FBRztVQUVsQixLQUFJLElBQUlNLENBQUMsR0FBQyxDQUFDLEVBQUNBLENBQUMsR0FBR0gsSUFBSSxDQUFDSSxNQUFNLEVBQUMsRUFBRUQsQ0FBQyxFQUMvQjtZQUNJUixLQUFLLENBQUNVLElBQUksQ0FBQyxJQUFJQyxnQkFBTyxDQUFDTixJQUFJLENBQUNHLENBQUMsQ0FBQyxDQUFDSSxFQUFFLEVBQUVQLElBQUksQ0FBQ0csQ0FBQyxDQUFDLENBQUNLLE1BQU0sRUFBRVIsSUFBSSxDQUFDRyxDQUFDLENBQUMsQ0FBQ00sS0FBSyxFQUFFVCxJQUFJLENBQUNHLENBQUMsQ0FBQyxDQUFDTyxLQUFLLEVBQUVWLElBQUksQ0FBQ0csQ0FBQyxDQUFDLENBQUNRLElBQUksRUFBRVgsSUFBSSxDQUFDRyxDQUFDLENBQUMsQ0FBQ1MsS0FBSyxDQUFDLENBQUM7VUFDbEg7VUFFQWxCLFFBQVEsQ0FBQ0MsS0FBSyxDQUFDO1FBQ25CLENBQUMsQ0FBQztNQUVOLENBQUMsQ0FBQztJQUNOO0VBQUM7SUFBQTtJQUFBLE9BRUQsb0JBQWtCdUIsQ0FBUyxFQUFFeEIsUUFBYSxFQUMxQztNQUNJLElBQUksQ0FBQ1AsSUFBSSxDQUFDUyxhQUFhO1FBQUEseUZBQUMsaUJBQWVDLEdBQU8sRUFBRUMsVUFBYztVQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUFBO2tCQUUxREEsVUFBVSxDQUFDSSxPQUFPLEVBQUU7a0JBQUMsS0FFakJMLEdBQUc7b0JBQUE7b0JBQUE7a0JBQUE7a0JBQUEsTUFBUUEsR0FBRztnQkFBQTtrQkFFbEJDLFVBQVUsQ0FBQ0MsS0FBSyxHQUFHb0IsSUFBSSxDQUFDQyxTQUFTLENBQUN0QixVQUFVLENBQUNDLEtBQUssQ0FBQztrQkFBQztrQkFBQSxPQUNoQ0QsVUFBVSxDQUFDQyxLQUFLLENBQUMseUVBQXlFLEVBQUUsQ0FBQ21CLENBQUMsQ0FBQ0csTUFBTSxFQUFFSCxDQUFDLENBQUNJLEtBQUssRUFBRUosQ0FBQyxDQUFDSyxLQUFLLEVBQUVMLENBQUMsQ0FBQ00sSUFBSSxFQUFFTixDQUFDLENBQUNPLEtBQUssQ0FBQyxDQUFDO2dCQUFBO2tCQUExSkMsT0FBTztrQkFDWCxJQUFHQSxPQUFPLENBQUNDLFlBQVksSUFBSSxDQUFDLEVBQUM7b0JBQ3pCakMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2tCQUNoQjtrQkFDQUEsUUFBUSxDQUFDZ0MsT0FBTyxDQUFDRSxRQUFRLENBQUM7Z0JBQUM7Z0JBQUE7a0JBQUE7Y0FBQTtZQUFBO1VBQUE7UUFBQSxDQUM5QjtRQUFBO1VBQUE7UUFBQTtNQUFBLElBQUM7SUFDTjtFQUFDO0lBQUE7SUFBQSxPQUVELG9CQUFrQlYsQ0FBUyxFQUFFeEIsUUFBYSxFQUMxQztNQUNRLElBQUksQ0FBQ1AsSUFBSSxDQUFDUyxhQUFhO1FBQUEsMEZBQUMsa0JBQWVDLEdBQU8sRUFBRUMsVUFBYztVQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUFBO2tCQUUxREEsVUFBVSxDQUFDSSxPQUFPLEVBQUU7a0JBQUMsS0FFckJMLEdBQUc7b0JBQUE7b0JBQUE7a0JBQUE7a0JBQUEsTUFBUUEsR0FBRztnQkFBQTtrQkFFVmdDLE9BQU8sR0FBRyxDQUFDO2tCQUNmL0IsVUFBVSxDQUFDQyxLQUFLLEdBQUdvQixJQUFJLENBQUNDLFNBQVMsQ0FBQ3RCLFVBQVUsQ0FBQ0MsS0FBSyxDQUFDO2tCQUFDO2tCQUFBLE9BQ3BDRCxVQUFVLENBQUNDLEtBQUssQ0FBQywwRUFBMEUsRUFBRSxDQUFDbUIsQ0FBQyxDQUFDRyxNQUFNLEVBQUVILENBQUMsQ0FBQ0ksS0FBSyxFQUFFSixDQUFDLENBQUNLLEtBQUssRUFBRUwsQ0FBQyxDQUFDTSxJQUFJLEVBQUVOLENBQUMsQ0FBQ08sS0FBSyxFQUFFUCxDQUFDLENBQUNZLEVBQUUsQ0FBQyxDQUFDO2dCQUFBO2tCQUFqS0osT0FBTztrQkFDWCxJQUFHQSxPQUFPLENBQUNLLFdBQVcsSUFBSSxDQUFDLEVBQ3ZCLEVBQUVGLE9BQU87a0JBRWJuQyxRQUFRLENBQUNtQyxPQUFPLENBQUM7Z0JBQUM7Z0JBQUE7a0JBQUE7Y0FBQTtZQUFBO1VBQUE7UUFBQSxDQUNqQjtRQUFBO1VBQUE7UUFBQTtNQUFBLElBQUM7SUFDVjtFQUFDO0lBQUE7SUFBQSxPQUVELHdCQUFzQmhCLEVBQVMsRUFBRW5CLFFBQWEsRUFDOUM7TUFDSSxJQUFJLENBQUNQLElBQUksQ0FBQ1MsYUFBYTtRQUFBLDBGQUFDLGtCQUFlQyxHQUFPLEVBQUVDLFVBQWM7VUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFBQTtrQkFFMURBLFVBQVUsQ0FBQ0ksT0FBTyxFQUFFO2tCQUFDLEtBRWpCTCxHQUFHO29CQUFBO29CQUFBO2tCQUFBO2tCQUFBLE1BQVFBLEdBQUc7Z0JBQUE7a0JBRWRnQyxPQUFPLEdBQUcsQ0FBQztrQkFDZi9CLFVBQVUsQ0FBQ0MsS0FBSyxHQUFHb0IsSUFBSSxDQUFDQyxTQUFTLENBQUN0QixVQUFVLENBQUNDLEtBQUssQ0FBQztrQkFBQztrQkFBQSxPQUNoQ0QsVUFBVSxDQUFDQyxLQUFLLENBQUMsNkJBQTZCLEdBQUNjLEVBQUUsQ0FBQztnQkFBQTtrQkFBbEVhLE9BQU87a0JBQ1hHLE9BQU8sR0FBR0EsT0FBTyxHQUFHSCxPQUFPLENBQUNDLFlBQVk7a0JBRXhDakMsUUFBUSxDQUFDbUMsT0FBTyxDQUFDO2dCQUFDO2dCQUFBO2tCQUFBO2NBQUE7WUFBQTtVQUFBO1FBQUEsQ0FDckI7UUFBQTtVQUFBO1FBQUE7TUFBQSxJQUFDO0lBQ047RUFBQztJQUFBO0lBQUEsT0FFRCx1QkFBcUJuQyxRQUFhLEVBQ2xDO01BQ0ksSUFBSXNDLE1BQWlCLEdBQUcsRUFBRTtNQUUxQixJQUFJLENBQUM3QyxJQUFJLENBQUNTLGFBQWEsQ0FBQyxVQUFTQyxHQUFPLEVBQUVDLFVBQWMsRUFDeEQ7UUFDSSxJQUFJRCxHQUFHLEVBQUUsTUFBTUEsR0FBRztRQUVsQkMsVUFBVSxDQUFDQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsVUFBVUYsR0FBTyxFQUFFRyxJQUFRLEVBQUVDLE1BQVUsRUFDaEY7VUFDSUgsVUFBVSxDQUFDSSxPQUFPLEVBQUU7VUFFcEIsSUFBSUwsR0FBRyxFQUFFLE1BQU1BLEdBQUc7VUFFbEIsS0FBSSxJQUFJTSxDQUFDLEdBQUMsQ0FBQyxFQUFDQSxDQUFDLEdBQUdILElBQUksQ0FBQ0ksTUFBTSxFQUFDLEVBQUVELENBQUMsRUFDL0I7WUFDSTZCLE1BQU0sQ0FBQzNCLElBQUksQ0FBQyxJQUFJNEIsa0JBQVEsQ0FBQ2pDLElBQUksQ0FBQ0csQ0FBQyxDQUFDLENBQUNJLEVBQUUsRUFBRVAsSUFBSSxDQUFDRyxDQUFDLENBQUMsQ0FBQytCLGFBQWEsRUFBRWxDLElBQUksQ0FBQ0csQ0FBQyxDQUFDLENBQUNRLElBQUksRUFBRVgsSUFBSSxDQUFDRyxDQUFDLENBQUMsQ0FBQ2dDLEtBQUssQ0FBQyxDQUFDO1VBQzdGO1VBRUF6QyxRQUFRLENBQUNzQyxNQUFNLENBQUM7UUFDcEIsQ0FBQyxDQUFDO01BRU4sQ0FBQyxDQUFDO0lBQ047RUFBQztJQUFBO0lBQUEsT0FFRCx1QkFBcUJuQixFQUFTLEVBQUVuQixRQUFhLEVBQzdDO01BQ0ksSUFBSTBDLEtBQWM7TUFFbEIsSUFBSSxDQUFDakQsSUFBSSxDQUFDUyxhQUFhLENBQUMsVUFBU0MsR0FBTyxFQUFFQyxVQUFjLEVBQ3hEO1FBQ0ksSUFBSUQsR0FBRyxFQUFFLE1BQU1BLEdBQUc7UUFFbEJDLFVBQVUsQ0FBQ0MsS0FBSyxDQUFDLGtDQUFrQyxHQUFDYyxFQUFFLEVBQUUsVUFBVWhCLEdBQU8sRUFBRUcsSUFBUSxFQUFFQyxNQUFVLEVBQy9GO1VBQ0lILFVBQVUsQ0FBQ0ksT0FBTyxFQUFFO1VBRXBCLElBQUlMLEdBQUcsRUFBRSxNQUFNQSxHQUFHO1VBRWxCLEtBQUksSUFBSU0sQ0FBQyxHQUFDLENBQUMsRUFBQ0EsQ0FBQyxHQUFHSCxJQUFJLENBQUNJLE1BQU0sRUFBQyxFQUFFRCxDQUFDLEVBQy9CO1lBQ0lpQyxLQUFLLEdBQUcsSUFBSUgsa0JBQVEsQ0FBQ2pDLElBQUksQ0FBQ0csQ0FBQyxDQUFDLENBQUNJLEVBQUUsRUFBRVAsSUFBSSxDQUFDRyxDQUFDLENBQUMsQ0FBQytCLGFBQWEsRUFBRWxDLElBQUksQ0FBQ0csQ0FBQyxDQUFDLENBQUNRLElBQUksRUFBRVgsSUFBSSxDQUFDRyxDQUFDLENBQUMsQ0FBQ2dDLEtBQUssQ0FBQztVQUN4RjtVQUVBekMsUUFBUSxDQUFDMEMsS0FBSyxDQUFDO1FBQ25CLENBQUMsQ0FBQztNQUVOLENBQUMsQ0FBQztJQUNOO0VBQUM7SUFBQTtJQUFBLE9BRUQsOEJBQTRCQyxRQUFlLEVBQUUzQyxRQUFhLEVBQzFEO01BQ0ksSUFBSXNDLE1BQWlCLEdBQUcsRUFBRTtNQUUxQixJQUFJLENBQUM3QyxJQUFJLENBQUNTLGFBQWEsQ0FBQyxVQUFTQyxHQUFPLEVBQUVDLFVBQWMsRUFDeEQ7UUFDSSxJQUFJRCxHQUFHLEVBQUUsTUFBTUEsR0FBRztRQUVsQkMsVUFBVSxDQUFDQyxLQUFLLENBQUMsa0RBQWtELEdBQUNzQyxRQUFRLEdBQUMsSUFBSSxFQUFFLFVBQVV4QyxHQUFPLEVBQUVHLElBQVEsRUFBRUMsTUFBVSxFQUMxSDtVQUNJSCxVQUFVLENBQUNJLE9BQU8sRUFBRTtVQUVwQixJQUFJTCxHQUFHLEVBQUUsTUFBTUEsR0FBRztVQUVsQixLQUFJLElBQUlNLENBQUMsR0FBQyxDQUFDLEVBQUNBLENBQUMsR0FBR0gsSUFBSSxDQUFDSSxNQUFNLEVBQUMsRUFBRUQsQ0FBQyxFQUMvQjtZQUNJNkIsTUFBTSxDQUFDM0IsSUFBSSxDQUFDLElBQUk0QixrQkFBUSxDQUFDakMsSUFBSSxDQUFDRyxDQUFDLENBQUMsQ0FBQ0ksRUFBRSxFQUFFUCxJQUFJLENBQUNHLENBQUMsQ0FBQyxDQUFDK0IsYUFBYSxFQUFFbEMsSUFBSSxDQUFDRyxDQUFDLENBQUMsQ0FBQ1EsSUFBSSxFQUFFWCxJQUFJLENBQUNHLENBQUMsQ0FBQyxDQUFDZ0MsS0FBSyxDQUFDLENBQUM7VUFDN0Y7VUFFQXpDLFFBQVEsQ0FBQ3NDLE1BQU0sQ0FBQztRQUNwQixDQUFDLENBQUM7TUFFTixDQUFDLENBQUM7SUFDTjtFQUFDO0lBQUE7SUFBQSxPQUVELHFCQUFtQk0sQ0FBVSxFQUFFNUMsUUFBYSxFQUM1QztNQUNJLElBQUksQ0FBQ1AsSUFBSSxDQUFDUyxhQUFhO1FBQUEsMEZBQUMsa0JBQWVDLEdBQU8sRUFBRUMsVUFBYztVQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUFBO2tCQUUxREEsVUFBVSxDQUFDSSxPQUFPLEVBQUU7a0JBQUMsS0FFakJMLEdBQUc7b0JBQUE7b0JBQUE7a0JBQUE7a0JBQUEsTUFBUUEsR0FBRztnQkFBQTtrQkFFbEJDLFVBQVUsQ0FBQ0MsS0FBSyxHQUFHb0IsSUFBSSxDQUFDQyxTQUFTLENBQUN0QixVQUFVLENBQUNDLEtBQUssQ0FBQztrQkFBQztrQkFBQSxPQUNoQ0QsVUFBVSxDQUFDQyxLQUFLLENBQUMsK0RBQStELEVBQUUsQ0FBQ3VDLENBQUMsQ0FBQ0MsYUFBYSxFQUFFRCxDQUFDLENBQUNkLElBQUksRUFBRWMsQ0FBQyxDQUFDRSxLQUFLLENBQUMsQ0FBQztnQkFBQTtrQkFBcklkLE9BQU87a0JBQ1gsSUFBR0EsT0FBTyxDQUFDQyxZQUFZLElBQUksQ0FBQyxFQUFDO29CQUN6QmpDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztrQkFDaEI7a0JBQ0FBLFFBQVEsQ0FBQ2dDLE9BQU8sQ0FBQ0UsUUFBUSxDQUFDO2dCQUFDO2dCQUFBO2tCQUFBO2NBQUE7WUFBQTtVQUFBO1FBQUEsQ0FDOUI7UUFBQTtVQUFBO1FBQUE7TUFBQSxJQUFDO0lBQ047RUFBQztJQUFBO0lBQUEsT0FFRCxxQkFBbUJVLENBQVUsRUFBRTVDLFFBQWEsRUFDNUM7TUFDUSxJQUFJLENBQUNQLElBQUksQ0FBQ1MsYUFBYTtRQUFBLDBGQUFDLGtCQUFlQyxHQUFPLEVBQUVDLFVBQWM7VUFBQTtVQUFBO1lBQUE7Y0FBQTtnQkFBQTtrQkFFMURBLFVBQVUsQ0FBQ0ksT0FBTyxFQUFFO2tCQUFDLEtBRXJCTCxHQUFHO29CQUFBO29CQUFBO2tCQUFBO2tCQUFBLE1BQVFBLEdBQUc7Z0JBQUE7a0JBRVZnQyxPQUFPLEdBQUcsQ0FBQztrQkFDZi9CLFVBQVUsQ0FBQ0MsS0FBSyxHQUFHb0IsSUFBSSxDQUFDQyxTQUFTLENBQUN0QixVQUFVLENBQUNDLEtBQUssQ0FBQztrQkFBQztrQkFBQSxPQUNwQ0QsVUFBVSxDQUFDQyxLQUFLLENBQUMsK0RBQStELEVBQUUsQ0FBQ3VDLENBQUMsQ0FBQ0MsYUFBYSxFQUFFRCxDQUFDLENBQUNkLElBQUksRUFBRWMsQ0FBQyxDQUFDRSxLQUFLLEVBQUVGLENBQUMsQ0FBQ1IsRUFBRSxDQUFDLENBQUM7Z0JBQUE7a0JBQTNJSixPQUFPO2tCQUNYLElBQUdBLE9BQU8sQ0FBQ0ssV0FBVyxJQUFJLENBQUMsRUFDdkIsRUFBRUYsT0FBTztrQkFFYm5DLFFBQVEsQ0FBQ21DLE9BQU8sQ0FBQztnQkFBQztnQkFBQTtrQkFBQTtjQUFBO1lBQUE7VUFBQTtRQUFBLENBQ2pCO1FBQUE7VUFBQTtRQUFBO01BQUEsSUFBQztJQUNWO0VBQUM7SUFBQTtJQUFBLE9BRUQseUJBQXVCaEIsRUFBUyxFQUFFbkIsUUFBYSxFQUMvQztNQUNJLElBQUksQ0FBQ1AsSUFBSSxDQUFDUyxhQUFhO1FBQUEsMEZBQUMsa0JBQWVDLEdBQU8sRUFBRUMsVUFBYztVQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUFBO2tCQUUxREEsVUFBVSxDQUFDSSxPQUFPLEVBQUU7a0JBQUMsS0FFakJMLEdBQUc7b0JBQUE7b0JBQUE7a0JBQUE7a0JBQUEsTUFBUUEsR0FBRztnQkFBQTtrQkFFZGdDLE9BQU8sR0FBRyxDQUFDO2tCQUNmL0IsVUFBVSxDQUFDQyxLQUFLLEdBQUdvQixJQUFJLENBQUNDLFNBQVMsQ0FBQ3RCLFVBQVUsQ0FBQ0MsS0FBSyxDQUFDO2tCQUFDO2tCQUFBLE9BQ2hDRCxVQUFVLENBQUNDLEtBQUssQ0FBQyw4QkFBOEIsR0FBQ2MsRUFBRSxDQUFDO2dCQUFBO2tCQUFuRWEsT0FBTztrQkFDWEcsT0FBTyxHQUFHQSxPQUFPLEdBQUdILE9BQU8sQ0FBQ0MsWUFBWTtrQkFFeENqQyxRQUFRLENBQUNtQyxPQUFPLENBQUM7Z0JBQUM7Z0JBQUE7a0JBQUE7Y0FBQTtZQUFBO1VBQUE7UUFBQSxDQUNyQjtRQUFBO1VBQUE7UUFBQTtNQUFBLElBQUM7SUFDTjtFQUFDO0VBQUE7QUFBQTtBQUFBIn0=
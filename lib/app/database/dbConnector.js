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
    key: "update",
    value: function update(b, callback) {
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
      console.log(id);
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
  }]);
  return dbConnector;
}();
exports.dbConnector = dbConnector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkYkNvbm5lY3RvciIsImhvc3QiLCJwb3J0IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImluaXREYkNvbm5lY3Rpb24iLCJwb29sIiwibXlzcWwiLCJjcmVhdGVQb29sIiwidXNlciIsImRhdGFiYXNlIiwic2NoZW1hIiwiY29ubmVjdGlvbkxpbWl0IiwiY2FsbGJhY2siLCJib29rcyIsImdldENvbm5lY3Rpb24iLCJlcnIiLCJjb25uZWN0aW9uIiwicXVlcnkiLCJyb3dzIiwiZmllbGRzIiwicmVsZWFzZSIsIngiLCJsZW5ndGgiLCJwdXNoIiwiYm9va0RBTyIsIklEIiwiQVVUSE9SIiwiVElUTEUiLCJHRU5SRSIsIkNPU1QiLCJTVE9DSyIsImlkIiwiYm9vayIsImF1dGhvciIsImdlbnJlIiwidGl0bGUiLCJiIiwidXRpbCIsInByb21pc2lmeSIsIkF1dGhvciIsIlRpdGxlIiwiR2VucmUiLCJDb3N0IiwiU3RvY2siLCJyZXN1bHQxIiwiYWZmZWN0ZWRSb3dzIiwiaW5zZXJ0SWQiLCJjaGFuZ2VzIiwiSWQiLCJjaGFuZ2VkUm93cyIsImNvbnNvbGUiLCJsb2ciXSwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvZGF0YWJhc2UvZGJDb25uZWN0b3IudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYm9va0RBTyB9IGZyb20gXCIuLi9tb2RlbHMvYm9va0RBT1wiO1xyXG5pbXBvcnQgeyBvcmRlckRBTyB9IGZyb20gXCIuLi9tb2RlbHMvb3JkZXJEQU9cIjtcclxuaW1wb3J0ICogYXMgbXlzcWwgZnJvbSBcIm15c3FsXCI7XHJcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSBcInV0aWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBkYkNvbm5lY3RvclxyXG57XHJcbiAgICBwcml2YXRlIGhvc3Q6c3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgcG9ydDpudW1iZXIgPSAzMzA2O1xyXG4gICAgcHJpdmF0ZSB1c2VybmFtZTpzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBwYXNzd29yZDpzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBzY2hlbWE6c3RyaW5nID0gXCJib29rc3RvcmVcIjtcclxuICAgIHByaXZhdGUgcG9vbCA9IHRoaXMuaW5pdERiQ29ubmVjdGlvbigpO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcihob3N0OnN0cmluZywgcG9ydDpudW1iZXIsIHVzZXJuYW1lOnN0cmluZywgcGFzc3dvcmQ6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaG9zdCA9IGhvc3Q7XHJcbiAgICAgICAgdGhpcy5wb3J0ID0gcG9ydDtcclxuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XHJcbiAgICAgICAgdGhpcy5wYXNzd29yZCA9IHBhc3N3b3JkO1xyXG4gICAgICAgIHRoaXMucG9vbCA9IHRoaXMuaW5pdERiQ29ubmVjdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdERiQ29ubmVjdGlvbigpOmFueVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBteXNxbC5jcmVhdGVQb29sKHtob3N0OiB0aGlzLmhvc3QsIHBvcnQ6IHRoaXMucG9ydCwgdXNlcjogdGhpcy51c2VybmFtZSwgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsIGRhdGFiYXNlOiB0aGlzLnNjaGVtYSwgY29ubmVjdGlvbkxpbWl0OiAxMH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaW5kQWxsQm9va3MoY2FsbGJhY2s6IGFueSlcclxuICAgIHtcclxuICAgICAgICBsZXQgYm9va3M6Ym9va0RBT1tdID0gW107XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcclxuIFxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIGJvb2tzJywgZnVuY3Rpb24gKGVycjphbnksIHJvd3M6YW55LCBmaWVsZHM6YW55KSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXHJcblxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJvd3MubGVuZ3RoOysreClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBib29rcy5wdXNoKG5ldyBib29rREFPKHJvd3NbeF0uSUQsIHJvd3NbeF0uQVVUSE9SLCByb3dzW3hdLlRJVExFLCByb3dzW3hdLkdFTlJFLCByb3dzW3hdLkNPU1QsIHJvd3NbeF0uU1RPQ0spKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soYm9va3MpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgIH1cclxuXHJcbiAgICAgcHVibGljIGZpbmRCb29rQnlJZChpZDpudW1iZXIsIGNhbGxiYWNrOiBhbnkpXHJcbiAgICAge1xyXG4gICAgICAgICBsZXQgYm9vazpib29rREFPO1xyXG4gICAgICAgICBcclxuICAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxyXG4gIFxyXG4gICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSBib29rcyBXSEVSRSBJRCA9ICcraWQsIGZ1bmN0aW9uIChlcnI6YW55LCByb3dzOmFueSwgZmllbGRzOmFueSkgXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcbiBcclxuICAgICAgICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcclxuIFxyXG4gICAgICAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByb3dzLmxlbmd0aDsrK3gpXHJcbiAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICBib29rID0gbmV3IGJvb2tEQU8ocm93c1t4XS5JRCwgcm93c1t4XS5BVVRIT1IsIHJvd3NbeF0uVElUTEUsIHJvd3NbeF0uR0VOUkUsIHJvd3NbeF0uQ09TVCwgcm93c1t4XS5TVE9DSyk7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgIFxyXG4gICAgICAgICAgICAgICAgIGNhbGxiYWNrKGJvb2spO1xyXG4gICAgICAgICAgICAgfSk7XHJcbiAgICAgXHJcbiAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwdWJsaWMgZmluZEJvb2tzQnlBdXRob3IoYXV0aG9yOnN0cmluZywgY2FsbGJhY2s6IGFueSlcclxuICAgICAge1xyXG4gICAgICAgICAgbGV0IGJvb2tzOmJvb2tEQU9bXSA9IFtdO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnJcclxuICAgXHJcbiAgICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gYm9va3MgV0hFUkUgQVVUSE9SIExJS0UgJyVcIithdXRob3IrXCIlJ1wiLCBmdW5jdGlvbiAoZXJyOmFueSwgcm93czphbnksIGZpZWxkczphbnkpIFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcbiAgXHJcbiAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxyXG4gIFxyXG4gICAgICAgICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcm93cy5sZW5ndGg7Kyt4KVxyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBib29rcy5wdXNoKG5ldyBib29rREFPKHJvd3NbeF0uSUQsIHJvd3NbeF0uQVVUSE9SLCByb3dzW3hdLlRJVExFLCByb3dzW3hdLkdFTlJFLCByb3dzW3hdLkNPU1QsIHJvd3NbeF0uU1RPQ0spKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICBcclxuICAgICAgICAgICAgICAgICAgY2FsbGJhY2soYm9va3MpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgfSBcclxuXHJcbiAgICAgICBwdWJsaWMgZmluZEJvb2tzQnlHZW5yZShnZW5yZTpzdHJpbmcsIGNhbGxiYWNrOiBhbnkpXHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgbGV0IGJvb2tzOmJvb2tEQU9bXSA9IFtdO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXHJcbiAgICBcclxuICAgICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gYm9va3MgV0hFUkUgR0VOUkUgTElLRSAnJVwiK2dlbnJlK1wiJSdcIiwgZnVuY3Rpb24gKGVycjphbnksIHJvd3M6YW55LCBmaWVsZHM6YW55KSBcclxuICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcbiAgIFxyXG4gICAgICAgICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXHJcbiAgIFxyXG4gICAgICAgICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJvd3MubGVuZ3RoOysreClcclxuICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICBib29rcy5wdXNoKG5ldyBib29rREFPKHJvd3NbeF0uSUQsIHJvd3NbeF0uQVVUSE9SLCByb3dzW3hdLlRJVExFLCByb3dzW3hdLkdFTlJFLCByb3dzW3hdLkNPU1QsIHJvd3NbeF0uU1RPQ0spKTtcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgY2FsbGJhY2soYm9va3MpO1xyXG4gICAgICAgICAgICAgICB9KTtcclxuICAgICAgIFxyXG4gICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGZpbmRCb29rc0J5VGl0bGUodGl0bGU6c3RyaW5nLCBjYWxsYmFjazogYW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGJvb2tzOmJvb2tEQU9bXSA9IFtdO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxyXG4gICAgIFxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gYm9va3MgV0hFUkUgVElUTEUgTElLRSAnJVwiK3RpdGxlK1wiJSdcIiwgZnVuY3Rpb24gKGVycjphbnksIHJvd3M6YW55LCBmaWVsZHM6YW55KSBcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVyclxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCB4PTA7eCA8IHJvd3MubGVuZ3RoOysreClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvb2tzLnB1c2gobmV3IGJvb2tEQU8ocm93c1t4XS5JRCwgcm93c1t4XS5BVVRIT1IsIHJvd3NbeF0uVElUTEUsIHJvd3NbeF0uR0VOUkUsIHJvd3NbeF0uQ09TVCwgcm93c1t4XS5TVE9DSykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhib29rcyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlQm9vayhiOmJvb2tEQU8sIGNhbGxiYWNrOiBhbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdJTlNFUlQgSU5UTyBib29rcyAoQVVUSE9SLCBUSVRMRSwgR0VOUkUsIENPU1QsIFNUT0NLKSBWQUxVRVMoPyw/LD8sPyw/KScsIFtiLkF1dGhvciwgYi5UaXRsZSwgYi5HZW5yZSwgYi5Db3N0LCBiLlN0b2NrXSk7XHJcbiAgICAgICAgICAgICAgICBpZihyZXN1bHQxLmFmZmVjdGVkUm93cyAhPSAxKXtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygtMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXN1bHQxLmluc2VydElkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdXBkYXRlKGI6Ym9va0RBTywgY2FsbGJhY2s6IGFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgbGV0IGNoYW5nZXMgPSAwO1xyXG4gICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnVVBEQVRFIGJvb2tzIFNFVCBBVVRIT1I9PywgVElUTEU9PywgIEdFTlJFPT8sIENPU1Q9PywgU1RPQ0s9PyBXSEVSRSBJRD0/JywgW2IuQXV0aG9yLCBiLlRpdGxlLCBiLkdlbnJlLCBiLkNvc3QsIGIuU3RvY2ssIGIuSWRdKTtcclxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdDEuY2hhbmdlZFJvd3MgIT0gMClcclxuICAgICAgICAgICAgICAgICAgICArK2NoYW5nZXM7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soY2hhbmdlcyk7XHJcbiAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBkZWxldGVCb29rQnlJZChpZDpudW1iZXIsIGNhbGxiYWNrOiBhbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpZCk7XHJcbiAgICAgICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGxldCBjaGFuZ2VzID0gMDtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnREVMRVRFIEZST00gYm9va3MgV0hFUkUgSUQ9JytpZCk7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VzID0gY2hhbmdlcyArIHJlc3VsdDEuYWZmZWN0ZWRSb3dzO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhjaGFuZ2VzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG59Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQTtBQUNBO0FBQTZCO0FBQUE7QUFBQSxJQUVoQkEsV0FBVztFQVNwQixxQkFBWUMsSUFBVyxFQUFFQyxJQUFXLEVBQUVDLFFBQWUsRUFBRUMsUUFBZSxFQUN0RTtJQUFBO0lBQUEsK0NBUnNCLEVBQUU7SUFBQSwrQ0FDRixJQUFJO0lBQUEsbURBQ0EsRUFBRTtJQUFBLG1EQUNGLEVBQUU7SUFBQSxpREFDSixXQUFXO0lBQUEsK0NBQ3BCLElBQUksQ0FBQ0MsZ0JBQWdCLEVBQUU7SUFJbEMsSUFBSSxDQUFDSixJQUFJLEdBQUdBLElBQUk7SUFDaEIsSUFBSSxDQUFDQyxJQUFJLEdBQUdBLElBQUk7SUFDaEIsSUFBSSxDQUFDQyxRQUFR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
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _md = _interopRequireDefault(require("md5"));

require("reflect-metadata");

var _typeorm = require("typeorm");

var _Comment = require("./entity/Comment");

var _Post = require("./entity/Post");

var _User = require("./entity/User");

(0, _typeorm.createConnection)().then( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(connection) {
    var manager, user, post, comment;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            manager = connection.manager;
            user = new _User.User({
              username: 'user',
              passwordDigest: (0, _md["default"])('123')
            });
            _context.next = 4;
            return manager.save(user);

          case 4:
            post = new _Post.Post({
              title: 'Post',
              content: 'My first post',
              author: user
            });
            _context.next = 7;
            return manager.save(post);

          case 7:
            comment = new _Comment.Comment({
              content: 'blabla',
              author: user,
              post: post
            });
            _context.next = 10;
            return manager.save(comment);

          case 10:
            connection.close();

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}())["catch"](function (error) {
  return console.log(error);
});
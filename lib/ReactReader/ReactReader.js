'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('..');

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TocItem = function (_Component) {
  _inherits(TocItem, _Component);

  function TocItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TocItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TocItem.__proto__ || Object.getPrototypeOf(TocItem)).call.apply(_ref, [this].concat(args))), _this), _this.setLocation = function () {
      _this.props.setLocation(_this.props.href);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TocItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          label = _props.label,
          styles = _props.styles;

      return _react2.default.createElement(
        'button',
        { onClick: this.setLocation, style: styles },
        label
      );
    }
  }]);

  return TocItem;
}(_react.Component);

TocItem.propTypes = {
  label: _react.PropTypes.string,
  href: _react.PropTypes.string,
  setLocation: _react.PropTypes.func,
  styles: _react.PropTypes.object
};

var ReactReader = function (_Component2) {
  _inherits(ReactReader, _Component2);

  function ReactReader(props) {
    _classCallCheck(this, ReactReader);

    var _this2 = _possibleConstructorReturn(this, (ReactReader.__proto__ || Object.getPrototypeOf(ReactReader)).call(this, props));

    _this2.toggleToc = function () {
      _this2.setState({
        expanedToc: !_this2.state.expanedToc
      });
    };

    _this2.next = function () {
      _this2.refs.reader.nextPage();
    };

    _this2.prev = function () {
      _this2.refs.reader.prevPage();
    };

    _this2.onTocChange = function (navigation) {
      var tocChanged = _this2.props.tocChanged;

      _this2.setState({
        toc: navigation
      }, function () {
        return tocChanged && tocChanged(navigation);
      });
    };

    _this2.onLocationChange = function (loc) {
      var locationChanged = _this2.props.locationChanged;

      return locationChanged && locationChanged(loc);
    };

    _this2.setLocation = function (loc) {
      _this2.setState({
        location: loc,
        expanedToc: false
      });
    };

    var location = _this2.props.location;

    _this2.state = {
      expanedToc: false,
      toc: false,
      location: location
    };
    return _this2;
  }

  _createClass(ReactReader, [{
    key: 'renderToc',
    value: function renderToc() {
      var _this3 = this;

      var toc = this.state.toc;
      var styles = this.props.styles;

      return _react2.default.createElement(
        'div',
        { style: styles.tocArea },
        _react2.default.createElement(
          'div',
          { style: styles.toc },
          toc.map(function (item, i) {
            return _react2.default.createElement(TocItem, _extends({ key: item.href }, item, { setLocation: _this3.setLocation, styles: styles.tocAreaButton }));
          })
        )
      );
    }
  }, {
    key: 'renderTocToggle',
    value: function renderTocToggle() {
      var expanedToc = this.state.expanedToc;
      var styles = this.props.styles;

      return _react2.default.createElement(
        'button',
        { style: Object.assign({}, styles.tocButton, expanedToc ? styles.tocButtonExpaned : {}), onClick: this.toggleToc },
        _react2.default.createElement('span', { style: Object.assign({}, styles.tocButtonBar, styles.tocButtonBarTop) }),
        _react2.default.createElement('span', { style: Object.assign({}, styles.tocButtonBar, styles.tocButtonBottom) })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          url = _props2.url,
          title = _props2.title,
          showToc = _props2.showToc,
          loadingView = _props2.loadingView;
      var _state = this.state,
          toc = _state.toc,
          location = _state.location,
          expanedToc = _state.expanedToc;
      var styles = this.props.styles;

      return _react2.default.createElement(
        'div',
        { style: styles.container },
        _react2.default.createElement(
          'div',
          { style: Object.assign({}, styles.readerArea, expanedToc ? styles.containerExpaned : {}) },
          showToc && this.renderTocToggle(),
          _react2.default.createElement(
            'div',
            { style: styles.titleArea },
            title
          ),
          _react2.default.createElement(
            'div',
            { style: styles.reader },
            _react2.default.createElement(_.EpubView, {
              ref: 'reader',
              url: url,
              location: location,
              loadingView: loadingView,
              tocChanged: this.onTocChange,
              locationChanged: this.onLocationChange
            })
          ),
          _react2.default.createElement(
            'button',
            { style: Object.assign({}, styles.arrow, styles.prev), onClick: this.prev },
            '\u2039'
          ),
          _react2.default.createElement(
            'button',
            { style: Object.assign({}, styles.arrow, styles.next), onClick: this.next },
            '\u203A'
          )
        ),
        showToc && toc && this.renderToc()
      );
    }
  }]);

  return ReactReader;
}(_react.Component);

var LoadingView = function (_Component3) {
  _inherits(LoadingView, _Component3);

  function LoadingView() {
    _classCallCheck(this, LoadingView);

    return _possibleConstructorReturn(this, (LoadingView.__proto__ || Object.getPrototypeOf(LoadingView)).apply(this, arguments));
  }

  _createClass(LoadingView, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: _style2.default.loadingView },
        'Loading\u2026'
      );
    }
  }]);

  return LoadingView;
}(_react.Component);

ReactReader.defaultProps = {
  loadingView: _react2.default.createElement(LoadingView, null),
  locationChanged: null,
  tocChanged: null,
  showToc: true,
  styles: _style2.default
};

ReactReader.propTypes = {
  title: _react.PropTypes.string,
  loadingView: _react.PropTypes.element,
  url: _react.PropTypes.string,
  showToc: _react.PropTypes.bool,
  location: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  locationChanged: _react.PropTypes.func,
  tocChanged: _react.PropTypes.func,
  styles: _react.PropTypes.object
};

exports.default = ReactReader;
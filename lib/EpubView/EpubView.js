'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _epubjsEs = require('epubjs-es6');

var _epubjsEs2 = _interopRequireDefault(_epubjsEs);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EpubView = function (_Component) {
  _inherits(EpubView, _Component);

  function EpubView(props) {
    _classCallCheck(this, EpubView);

    var _this = _possibleConstructorReturn(this, (EpubView.__proto__ || Object.getPrototypeOf(EpubView)).call(this, props));

    _this.state = {
      isLoaded: false,
      toc: []
    };
    _this.book = _this.rendition = _this.prevPage = _this.nextPage = null;
    return _this;
  }

  _createClass(EpubView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          url = _props.url,
          tocChanged = _props.tocChanged;

      this.book = new _epubjsEs2.default(url);
      this.book.loaded.navigation.then(function (toc) {
        _this2.setState({
          isLoaded: true,
          toc: toc
        }, function () {
          tocChanged && tocChanged(toc);
          _this2.initReader();
        });
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.book = this.rendition = this.prevPage = this.nextPage = null;
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !this.state.isLoaded || nextProps.location !== this.state.location;
    }
  }, {
    key: 'initReader',
    value: function initReader() {
      var _this3 = this;

      var viewer = this.refs.viewer;
      var toc = this.state.toc;
      var _props2 = this.props,
          location = _props2.location,
          locationChanged = _props2.locationChanged;

      this.rendition = this.book.renderTo(viewer, {
        method: 'paginate',
        width: '100%',
        height: '100%'
      });
      this.rendition.display(location || toc[0].href);

      this.prevPage = function () {
        _this3.rendition.prev();
      };
      this.nextPage = function () {
        _this3.rendition.next();
      };
      this.rendition.on('locationChanged', function (loc) {
        loc && loc.end && locationChanged && locationChanged(loc.end);
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.location !== this.props.location) {
        this.rendition.display(this.props.location);
      }
    }
  }, {
    key: 'renderBook',
    value: function renderBook() {
      var styles = this.props.styles;

      return _react2.default.createElement('div', { ref: 'viewer', style: styles.view });
    }
  }, {
    key: 'render',
    value: function render() {
      var isLoaded = this.state.isLoaded;
      var _props3 = this.props,
          loadingView = _props3.loadingView,
          styles = _props3.styles;

      return _react2.default.createElement(
        'div',
        { style: styles.viewHolder },
        isLoaded && this.renderBook() || loadingView
      );
    }
  }]);

  return EpubView;
}(_react.Component);

EpubView.defaultProps = {
  loadingView: null,
  locationChanged: null,
  tocChanged: null,
  styles: _style2.default
};

EpubView.propTypes = {
  url: _react.PropTypes.string,
  loadingView: _react.PropTypes.element,
  location: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  locationChanged: _react.PropTypes.func,
  tocChanged: _react.PropTypes.func,
  styles: _react.PropTypes.object
};

exports.default = EpubView;
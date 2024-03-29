"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _youtubePlayer = _interopRequireDefault(require("youtube-player"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
        };
    }
    return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: { value: subClass, writable: true, configurable: true }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf =
        Object.setPrototypeOf ||
        function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };
    return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived),
            result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}

function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}

function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
        return true;
    } catch (e) {
        return false;
    }
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function _getPrototypeOf(o) {
              return o.__proto__ || Object.getPrototypeOf(o);
          };
    return _getPrototypeOf(o);
}

function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
            symbols = symbols.filter(function (sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        keys.push.apply(keys, symbols);
    }
    return keys;
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function (key) {
                _defineProperty(target, key, source[key]);
            });
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
            ownKeys(Object(source)).forEach(function (key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
        }
    }
    return target;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }
    return obj;
}

/**
 * Check whether a `props` change should result in the video being updated.
 *
 * @param {Object} prevProps
 * @param {Object} props
 */
function shouldUpdateVideo(prevProps, props) {
    // A changing video should always trigger an update
    if (prevProps.videoId !== props.videoId) {
        return true;
    } // Otherwise, a change in the start/end time playerVars also requires a player
    // update.

    var prevVars = prevProps.opts.playerVars || {};
    var vars = props.opts.playerVars || {};
    return prevVars.start !== vars.start || prevVars.end !== vars.end;
}
/**
 * Neutralize API options that only require a video update, leaving only options
 * that require a player reset. The results can then be compared to see if a
 * player reset is necessary.
 *
 * @param {Object} opts
 */

function filterResetOptions(opts) {
    return _objectSpread(
        _objectSpread({}, opts),
        {},
        {
            playerVars: _objectSpread(
                {
                    autoplay: 0,
                    start: 0,
                    end: 0
                },
                opts.playerVars
            )
        }
    );
}
/**
 * Check whether a `props` change should result in the player being reset.
 * The player is reset when the `props.opts` change, except if the only change
 * is in the `start` and `end` playerVars, because a video update can deal with
 * those.
 *
 * @param {Object} prevProps
 * @param {Object} props
 */

function shouldResetPlayer(prevProps, props) {
    return !(0, _fastDeepEqual.default)(filterResetOptions(prevProps.opts), filterResetOptions(props.opts));
}
/**
 * Check whether a props change should result in an id or className update.
 *
 * @param {Object} prevProps
 * @param {Object} props
 */

function shouldUpdatePlayer(prevProps, props) {
    return prevProps.id !== props.id || prevProps.className !== props.className;
}

var YouTube = /*#__PURE__*/ (function (_React$Component) {
    _inherits(YouTube, _React$Component);

    var _super = _createSuper(YouTube);

    /**
     * Expose PlayerState constants for convenience. These constants can also be
     * accessed through the global YT object after the YouTube IFrame API is instantiated.
     * https://developers.google.com/youtube/iframe_api_reference#onStateChange
     */
    function YouTube(props) {
        var _this;

        _classCallCheck(this, YouTube);

        _this = _super.call(this, props);

        _defineProperty(_assertThisInitialized(_this), "onPlayerReady", function (event) {
            return _this.props.onReady(event);
        });

        _defineProperty(_assertThisInitialized(_this), "onPlayerError", function (event) {
            return _this.props.onError(event);
        });

        _defineProperty(_assertThisInitialized(_this), "onPlayerStateChange", function (event) {
            _this.props.onStateChange(event);

            switch (event.data) {
                case YouTube.PlayerState.ENDED:
                    _this.props.onEnd(event);

                    break;

                case YouTube.PlayerState.PLAYING:
                    _this.props.onPlay(event);

                    break;

                case YouTube.PlayerState.PAUSED:
                    _this.props.onPause(event);

                    break;

                default:
            }
        });

        _defineProperty(_assertThisInitialized(_this), "onPlayerPlaybackRateChange", function (event) {
            return _this.props.onPlaybackRateChange(event);
        });

        _defineProperty(_assertThisInitialized(_this), "onPlayerPlaybackQualityChange", function (event) {
            return _this.props.onPlaybackQualityChange(event);
        });

        _defineProperty(_assertThisInitialized(_this), "createPlayer", function () {
            // do not attempt to create a player server-side, it won't work
            if (typeof document === "undefined") return; // create player

            var playerOpts = _objectSpread(
                _objectSpread({}, _this.props.opts),
                {},
                {
                    // preload the `videoId` video if one is already given
                    videoId: _this.props.videoId
                }
            );

            _this.internalPlayer = (0, _youtubePlayer.default)(_this.container, playerOpts); // attach event handlers

            _this.internalPlayer.on("ready", _this.onPlayerReady);

            _this.internalPlayer.on("error", _this.onPlayerError);

            _this.internalPlayer.on("stateChange", _this.onPlayerStateChange);

            _this.internalPlayer.on("playbackRateChange", _this.onPlayerPlaybackRateChange);

            _this.internalPlayer.on("playbackQualityChange", _this.onPlayerPlaybackQualityChange);
        });

        _defineProperty(_assertThisInitialized(_this), "resetPlayer", function () {
            return _this.internalPlayer.destroy().then(_this.createPlayer);
        });

        _defineProperty(_assertThisInitialized(_this), "updatePlayer", function () {
            _this.internalPlayer.getIframe().then(function (iframe) {
                if (_this.props.id) iframe.setAttribute("id", _this.props.id);
                else iframe.removeAttribute("id");
                if (_this.props.className) iframe.setAttribute("class", _this.props.className);
                else iframe.removeAttribute("class");
            });
        });

        _defineProperty(_assertThisInitialized(_this), "getInternalPlayer", function () {
            return _this.internalPlayer;
        });

        _defineProperty(_assertThisInitialized(_this), "updateVideo", function () {
            if (typeof _this.props.videoId === "undefined" || _this.props.videoId === null) {
                _this.internalPlayer.stopVideo();

                return;
            } // set queueing options

            var autoplay = false;
            var opts = {
                videoId: _this.props.videoId
            };

            if ("playerVars" in _this.props.opts) {
                autoplay = _this.props.opts.playerVars.autoplay === 1;

                if ("start" in _this.props.opts.playerVars) {
                    opts.startSeconds = _this.props.opts.playerVars.start;
                }

                if ("end" in _this.props.opts.playerVars) {
                    opts.endSeconds = _this.props.opts.playerVars.end;
                }
            } // if autoplay is enabled loadVideoById

            if (autoplay) {
                _this.internalPlayer.loadVideoById(opts);

                return;
            } // default behaviour just cues the video

            _this.internalPlayer.cueVideoById(opts);
        });

        _defineProperty(_assertThisInitialized(_this), "refContainer", function (container) {
            _this.container = container;
        });

        _this.container = null;
        _this.internalPlayer = null;
        return _this;
    }

    _createClass(YouTube, [
        {
            key: "componentDidMount",
            value: function componentDidMount() {
                this.createPlayer();
            }
        },
        {
            key: "componentDidUpdate",
            value: function componentDidUpdate(prevProps) {
                if (shouldUpdatePlayer(prevProps, this.props)) {
                    this.updatePlayer();
                }

                if (shouldResetPlayer(prevProps, this.props)) {
                    this.resetPlayer();
                }

                if (shouldUpdateVideo(prevProps, this.props)) {
                    this.updateVideo();
                }
            }
        },
        {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                /**
                 * Note: The `youtube-player` package that is used promisifies all YouTube
                 * Player API calls, which introduces a delay of a tick before it actually
                 * gets destroyed. Since React attempts to remove the element instantly
                 * this method isn't quick enough to reset the container element.
                 */
                this.internalPlayer.destroy();
            }
            /**
             * https://developers.google.com/youtube/iframe_api_reference#onReady
             *
             * @param {Object} event
             *   @param {Object} target - player object
             */
        },
        {
            key: "render",
            value: function render() {
                return /*#__PURE__*/ _react.default.createElement(
                    "div",
                    {
                        className: this.props.containerClassName
                    },
                    /*#__PURE__*/ _react.default.createElement("div", {
                        id: this.props.id,
                        className: this.props.className,
                        ref: this.refContainer
                    })
                );
            }
        }
    ]);

    return YouTube;
})(_react.default.Component);

_defineProperty(YouTube, "PlayerState", {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5
});

YouTube.propTypes = {
    videoId: _propTypes.default.string,
    // custom ID for player element
    id: _propTypes.default.string,
    // custom class name for player element
    className: _propTypes.default.string,
    // custom class name for player container element
    containerClassName: _propTypes.default.string,
    // https://developers.google.com/youtube/iframe_api_reference#Loading_a_Video_Player
    opts: _propTypes.default.objectOf(_propTypes.default.any),
    // event subscriptions
    onReady: _propTypes.default.func,
    onError: _propTypes.default.func,
    onPlay: _propTypes.default.func,
    onPause: _propTypes.default.func,
    onEnd: _propTypes.default.func,
    onStateChange: _propTypes.default.func,
    onPlaybackRateChange: _propTypes.default.func,
    onPlaybackQualityChange: _propTypes.default.func
};
YouTube.defaultProps = {
    videoId: null,
    id: null,
    className: null,
    opts: {},
    containerClassName: "my-iframe-wrapper",
    onReady: function onReady() {},
    onError: function onError() {},
    onPlay: function onPlay() {},
    onPause: function onPause() {},
    onEnd: function onEnd() {},
    onStateChange: function onStateChange() {},
    onPlaybackRateChange: function onPlaybackRateChange() {},
    onPlaybackQualityChange: function onPlaybackQualityChange() {}
};
var _default = YouTube;
exports.default = _default;

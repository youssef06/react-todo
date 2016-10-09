(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Todo = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TodoItem = require('./TodoItem.jsx');

var _todoTpl = require('./templates/todo.tpl.jsx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DISPLAY_TYPES = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed'
}; /**
    * Created by youssef on 10/10/16.
    */
var Todo = exports.Todo = _react2.default.createClass({
    displayName: 'Todo',

    getInitialState: function getInitialState() {
        return {
            nowShowing: DISPLAY_TYPES.ALL,
            items: [{ content: 'Learn React', completed: false }, { content: 'Pay bills', completed: false }, { content: 'Hit the gym', completed: true }, { content: 'Buy eggs', completed: false }]
        };
    },
    handleNewItemKeyPress: function handleNewItemKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleNewItemClick();
        }
    },
    handleNewItemClick: function handleNewItemClick() {
        var state = this.state;
        state.items.push({ content: document.getElementById('newItem').value, completed: false });
        this.setState(state);
        document.getElementById('newItem').value = "";
    },
    removeItem: function removeItem(item) {
        var index = this.state.items.indexOf(item);
        var state = this.state;
        state.items.splice(index, 1);
        this.setState(state);
    },
    toggleItem: function toggleItem(item) {
        var index = this.state.items.indexOf(item);
        item.completed = !item.completed;
        this.state.items[index] = item;
        this.setState(this.state);
    },
    render: function render() {
        var _this = this;

        var data = {}; //this will be passed to the template as a parameter

        //filter items to display, depends on nowShowing value
        var itemsToShow = this.state.items.filter(function (item) {
            switch (_this.state.nowShowing) {
                case DISPLAY_TYPES.ACTIVE:
                    return !item.completed;
                case DISPLAY_TYPES.COMPLETED:
                    return item.completed;
                default:
                    return true;
            }
        });

        //build an array of Item components
        data.items = itemsToShow.map(function (item, i) {
            //we add key because react needs each element in an array to have a unique key
            return _react2.default.createElement(_TodoItem.TodoItem, {
                content: item.content,
                completed: item.completed,
                onRemove: _this.removeItem.bind(_this, item),
                key: i,
                index: i,
                onToggle: _this.toggleItem.bind(_this, item)
            });
        });

        data.countCompleted = this.state.items.reduce(function (previousValue, currentValue, currentIndex, arr) {
            return currentValue.completed ? ++previousValue : previousValue;
        }, 0);

        data.countActive = this.state.items.length - data.countCompleted;

        return _todoTpl.todoTpl.call(this, data);
    }
});

},{"./TodoItem.jsx":3,"./templates/todo.tpl.jsx":5,"react":"react"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TodoFooter = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _todoFooterTpl = require('./templates/todoFooter.tpl.jsx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by youssef on 10/10/16.
 */
var TodoFooter = exports.TodoFooter = _react2.default.createClass({
    displayName: 'TodoFooter',

    render: function render() {
        return _todoFooterTpl.todoFooterTpl.call(this);
    }
});

},{"./templates/todoFooter.tpl.jsx":6,"react":"react"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TodoItem = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _todoItemTpl = require('./templates/todoItem.tpl.jsx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by youssef on 10/10/16.
 */
var TodoItem = exports.TodoItem = _react2.default.createClass({
    displayName: 'TodoItem',

    getInitialState: function getInitialState() {
        return {
            mouseInside: false
        };
    },
    handleMouseEnter: function handleMouseEnter() {
        this.setState({ mouseInside: true });
    },
    handleMouseLeave: function handleMouseLeave() {
        this.setState({ mouseInside: false });
    },
    render: function render() {
        return _todoItemTpl.todoItemTpl.bind(this)();
    }
});

},{"./templates/todoItem.tpl.jsx":7,"react":"react"}],4:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Todo = require('./Todo.jsx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var todoComponent = _reactDom2.default.render(_react2.default.createElement(_Todo.Todo, null), document.getElementById('app')); /**
                                                                                                                                 * Created by youssef on 10/10/16.
                                                                                                                                 */

},{"./Todo.jsx":1,"react":"react","react-dom":"react-dom"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.todoTpl = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TodoFooter = require('../TodoFooter.jsx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Note: we pass an empty function as second argument to setState because otherwize we get an error
 * "Uncaught Invariant Violation: setState(...): Expected the last optional `callback` argument
 * to be a function. Instead received: SyntheticMouseEvent."
 * @param data
 * @returns {XML}
 */
/**
 * Created by youssef on 10/10/16.
 */
var todoTpl = exports.todoTpl = function todoTpl(data) {
    return _react2.default.createElement(
        'div',
        { className: 'col-md-10 col-md-offset-1' },
        _react2.default.createElement(
            'h1',
            null,
            'todos'
        ),
        _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
                'div',
                { className: 'col-md-12 box' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'box-header' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-md-11' },
                            _react2.default.createElement('input', {
                                type: 'text',
                                className: 'form-control',
                                id: 'newItem',
                                placeholder: 'What do you need to do?',
                                onKeyPress: this.handleNewItemKeyPress
                            })
                        ),
                        _react2.default.createElement(
                            'button',
                            { id: 'btn', className: 'btn btn-info col-md-1', onClick: this.handleNewItemClick },
                            _react2.default.createElement('span', { className: 'glyphicon glyphicon-plus' })
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'table',
                        { className: 'table' },
                        _react2.default.createElement(
                            'tbody',
                            null,
                            data.items,
                            _react2.default.createElement(_TodoFooter.TodoFooter, {
                                countCompleted: data.countCompleted, countActive: data.countActive,
                                onShowAll: this.setState.bind(this, { nowShowing: 'all' }, function () {}),
                                onShowActive: this.setState.bind(this, { nowShowing: 'active' }, function () {}),
                                onShowCompleted: this.setState.bind(this, { nowShowing: 'completed' }, function () {})
                            })
                        )
                    )
                )
            )
        )
    );
};

},{"../TodoFooter.jsx":2,"react":"react"}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.todoFooterTpl = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var todoFooterTpl = exports.todoFooterTpl = function todoFooterTpl() {
    return _react2.default.createElement(
        "tr",
        { className: "margin-5" },
        _react2.default.createElement(
            "td",
            { colSpan: "2" },
            _react2.default.createElement(
                "div",
                { className: "col-md-4" },
                this.props.countCompleted,
                " done / ",
                this.props.countActive,
                " left"
            ),
            _react2.default.createElement(
                "div",
                { className: "col-md-8" },
                _react2.default.createElement(
                    "button",
                    { className: "btn col-md-3", onClick: this.props.onShowAll },
                    "All"
                ),
                _react2.default.createElement(
                    "button",
                    { className: "btn col-md-3", onClick: this.props.onShowActive },
                    "Active"
                ),
                _react2.default.createElement(
                    "button",
                    { className: "btn col-md-3", onClick: this.props.onShowCompleted },
                    "Completed"
                )
            )
        )
    );
}; /**
    * Created by youssef on 10/10/16.
    */

},{"react":"react"}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.todoItemTpl = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var todoItemTpl = exports.todoItemTpl = function todoItemTpl() {
    return _react2.default.createElement(
        "tr",
        { className: "margin-5", onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave },
        _react2.default.createElement(
            "td",
            { className: "col-md-11 checkbox-container" },
            _react2.default.createElement("input", { type: "checkbox", id: this.props.index, onChange: this.props.onToggle, checked: this.props.completed }),
            _react2.default.createElement(
                "label",
                { htmlFor: this.props.index },
                this.props.content,
                _react2.default.createElement(
                    "svg",
                    { viewBox: "0 0 60 40", xmlns: "http://www.w3.org/2000/svg" },
                    _react2.default.createElement("path", {
                        d: "M21,2 C13.4580219,4.16027394 1.62349378,18.3117469 3,19 C9.03653312,22.0182666 25.2482171,10.3758914 30,8 C32.9363621,6.53181896 41.321398,1.67860195 39,4 C36.1186011,6.8813989 3.11316157,27.1131616 5,29 C10.3223659,34.3223659 30.6434647,19.7426141 35,18 C41.2281047,15.5087581 46.3445303,13.6554697 46,14 C42.8258073,17.1741927 36.9154967,19.650702 33,22 C30.3136243,23.6118254 17,31.162498 17,34 C17,40.4724865 54,12.4064021 54,17 C54,23.7416728 34,27.2286213 34,37",
                        id: "Path-1",
                        strokeWidth: "4",
                        fill: "none",
                        stroke: "rgb(91, 167, 141)",
                        strokeDasharray: "270",
                        strokeDashoffset: "270"
                    })
                )
            )
        ),
        _react2.default.createElement(
            "td",
            null,
            this.state.mouseInside ? _react2.default.createElement("button", { className: "btn-delete", onClick: this.props.onRemove }) : null
        )
    );
}; /**
    * Created by youssef on 10/10/16.
    */

},{"react":"react"}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvVG9kby5qc3giLCJhcHAvanMvVG9kb0Zvb3Rlci5qc3giLCJhcHAvanMvVG9kb0l0ZW0uanN4IiwiYXBwL2pzL2FwcC5qcyIsImFwcC9qcy90ZW1wbGF0ZXMvdG9kby50cGwuanN4IiwiYXBwL2pzL3RlbXBsYXRlcy90b2RvRm9vdGVyLnRwbC5qc3giLCJhcHAvanMvdGVtcGxhdGVzL3RvZG9JdGVtLnRwbC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDR0E7Ozs7QUFDQTs7QUFDQTs7OztBQUVBLElBQU0sZ0JBQWdCO0FBQ2xCLFNBQUssS0FEYTtBQUVsQixZQUFRLFFBRlU7QUFHbEIsZUFBVztBQUhPLENBQXRCLEMsQ0FQQTs7O0FBYU8sSUFBSSxzQkFBTyxnQkFBTSxXQUFOLENBQWtCO0FBQUE7O0FBQ2hDLHFCQUFpQiwyQkFBWTtBQUN6QixlQUFPO0FBQ0gsd0JBQVksY0FBYyxHQUR2QjtBQUVILG1CQUFPLENBQ0gsRUFBQyxTQUFTLGFBQVYsRUFBeUIsV0FBVyxLQUFwQyxFQURHLEVBRUgsRUFBQyxTQUFTLFdBQVYsRUFBdUIsV0FBVyxLQUFsQyxFQUZHLEVBR0gsRUFBQyxTQUFTLGFBQVYsRUFBeUIsV0FBVyxJQUFwQyxFQUhHLEVBSUgsRUFBQyxTQUFTLFVBQVYsRUFBc0IsV0FBVyxLQUFqQyxFQUpHO0FBRkosU0FBUDtBQVNILEtBWCtCO0FBWWhDLDJCQUF1QiwrQkFBVSxDQUFWLEVBQWE7QUFDaEMsWUFBSSxFQUFFLEdBQUYsS0FBVSxPQUFkLEVBQXVCO0FBQ25CLGlCQUFLLGtCQUFMO0FBQ0g7QUFDSixLQWhCK0I7QUFpQmhDLHdCQUFvQiw4QkFBWTtBQUM1QixZQUFJLFFBQVEsS0FBSyxLQUFqQjtBQUNBLGNBQU0sS0FBTixDQUFZLElBQVosQ0FBaUIsRUFBQyxTQUFTLFNBQVMsY0FBVCxDQUF3QixTQUF4QixFQUFtQyxLQUE3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O0FBY0gsQ0FmTSxDLENBTFA7Ozs7Ozs7Ozs7OztBQ0dBOzs7Ozs7QUFFTyxJQUFJLG9DQUFjLFNBQWQsV0FBYyxHQUFZO0FBQ2pDLFdBQ0k7QUFBQTtBQUFBLFVBQUksV0FBVSxVQUFkLEVBQXlCLGNBQWMsS0FBSyxnQkFBNUMsRUFBOEQsY0FBYyxLQUFLLGdCQUFqRjtBQUNJO0FBQUE7QUFBQSxjQUFJLFdBQVUsOEJBQWQ7QUFDSSxxREFBTyxNQUFLLFVBQVosRUFBdUIsSUFBSSxLQUFLLEtBQUwsQ0FBVyxLQUF0QyxFQUE2QyxVQUFVLEtBQUssS0FBTCxDQUFXLFFBQWxFLEVBQTRFLFNBQVMsS0FBSyxLQUFMLENBQVcsU0FBaEcsR0FESjtBQUVJO0FBQUE7QUFBQSxrQkFBTyxTQUFTLEtBQUssS0FBTCxDQUFXLEtBQTNCO0FBQW1DLHFCQUFLLEtBQUwsQ0FBVyxPQUE5QztBQUNJO0FBQUE7QUFBQSxzQkFBSyxTQUFRLFdBQWIsRUFBeUIsT0FBTSw0QkFBL0I7QUFDSTtBQUNJLDJCQUFFLHFkQUROO0FBRUksNEJBQUcsUUFGUDtBQUdJLHFDQUFZLEdBSGhCO0FBSUksOEJBQUssTUFKVDtBQUtJLGdDQUFPLG1CQUxYO0FBTUkseUNBQWdCLEtBTnBCO0FBT0ksMENBQWlCO0FBUHJCO0FBREo7QUFESjtBQUZKLFNBREo7QUFpQkk7QUFBQTtBQUFBO0FBQ0ssaUJBQUssS0FBTCxDQUFXLFdBQVgsR0FDRywwQ0FBUSxXQUFVLFlBQWxCLEVBQStCLFNBQVMsS0FBSyxLQUFMLENBQVcsUUFBbkQsR0FESCxHQUVLO0FBSFY7QUFqQkosS0FESjtBQXlCSCxDQTFCTSxDLENBTFAiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHlvdXNzZWYgb24gMTAvMTAvMTYuXG4gKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1RvZG9JdGVtfSBmcm9tICcuL1RvZG9JdGVtLmpzeCc7XG5pbXBvcnQge3RvZG9UcGx9IGZyb20gJy4vdGVtcGxhdGVzL3RvZG8udHBsLmpzeCc7XG5cbmNvbnN0IERJU1BMQVlfVFlQRVMgPSB7XG4gICAgQUxMOiAnYWxsJyxcbiAgICBBQ1RJVkU6ICdhY3RpdmUnLFxuICAgIENPTVBMRVRFRDogJ2NvbXBsZXRlZCdcbn07XG5cbmV4cG9ydCB2YXIgVG9kbyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5vd1Nob3dpbmc6IERJU1BMQVlfVFlQRVMuQUxMLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7Y29udGVudDogJ0xlYXJuIFJlYWN0JywgY29tcGxldGVkOiBmYWxzZX0sXG4gICAgICAgICAgICAgICAge2NvbnRlbnQ6ICdQYXkgYmlsbHMnLCBjb21wbGV0ZWQ6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICB7Y29udGVudDogJ0hpdCB0aGUgZ3ltJywgY29tcGxldGVkOiB0cnVlfSxcbiAgICAgICAgICAgICAgICB7Y29udGVudDogJ0J1eSBlZ2dzJywgY29tcGxldGVkOiBmYWxzZX0sXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBoYW5kbGVOZXdJdGVtS2V5UHJlc3M6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVOZXdJdGVtQ2xpY2soKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgaGFuZGxlTmV3SXRlbUNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIHN0YXRlLml0ZW1zLnB1c2goe2NvbnRlbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdJdGVtJykudmFsdWUsIGNvbXBsZXRlZDogZmFsc2V9KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdJdGVtJykudmFsdWUgPSBcIlwiO1xuICAgIH0sXG4gICAgcmVtb3ZlSXRlbTogZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5zdGF0ZS5pdGVtcy5pbmRleE9mKGl0ZW0pO1xuICAgICAgICB2YXIgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBzdGF0ZS5pdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTtcbiAgICB9LFxuICAgIHRvZ2dsZUl0ZW06IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuc3RhdGUuaXRlbXMuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgaXRlbS5jb21wbGV0ZWQgPSAhaXRlbS5jb21wbGV0ZWQ7XG4gICAgICAgIHRoaXMuc3RhdGUuaXRlbXNbaW5kZXhdID0gaXRlbTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLnN0YXRlKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGF0YSA9IHt9OyAvL3RoaXMgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHRlbXBsYXRlIGFzIGEgcGFyYW1ldGVyXG5cbiAgICAgICAgLy9maWx0ZXIgaXRlbXMgdG8gZGlzcGxheSwgZGVwZW5kcyBvbiBub3dTaG93aW5nIHZhbHVlXG4gICAgICAgIHZhciBpdGVtc1RvU2hvdyA9IHRoaXMuc3RhdGUuaXRlbXMuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUubm93U2hvd2luZykge1xuICAgICAgICAgICAgICAgIGNhc2UgRElTUExBWV9UWVBFUy5BQ1RJVkU6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhaXRlbS5jb21wbGV0ZWQ7XG4gICAgICAgICAgICAgICAgY2FzZSBESVNQTEFZX1RZUEVTLkNPTVBMRVRFRDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY29tcGxldGVkO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvL2J1aWxkIGFuIGFycmF5IG9mIEl0ZW0gY29tcG9uZW50c1xuICAgICAgICBkYXRhLml0ZW1zID0gaXRlbXNUb1Nob3cubWFwKChpdGVtLCBpKSA9PiB7XG4gICAgICAgICAgICAvL3dlIGFkZCBrZXkgYmVjYXVzZSByZWFjdCBuZWVkcyBlYWNoIGVsZW1lbnQgaW4gYW4gYXJyYXkgdG8gaGF2ZSBhIHVuaXF1ZSBrZXlcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFRvZG9JdGVtXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ9e2l0ZW0uY29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkPXtpdGVtLmNvbXBsZXRlZH1cbiAgICAgICAgICAgICAgICAgICAgb25SZW1vdmU9e3RoaXMucmVtb3ZlSXRlbS5iaW5kKHRoaXMsIGl0ZW0pfVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICAgIGluZGV4PXtpfVxuICAgICAgICAgICAgICAgICAgICBvblRvZ2dsZT17dGhpcy50b2dnbGVJdGVtLmJpbmQodGhpcywgaXRlbSl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRhdGEuY291bnRDb21wbGV0ZWQgPSB0aGlzLnN0YXRlLml0ZW1zLnJlZHVjZSgocHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlLCBjdXJyZW50SW5kZXgsIGFycikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRWYWx1ZS5jb21wbGV0ZWQgPyArK3ByZXZpb3VzVmFsdWUgOiBwcmV2aW91c1ZhbHVlO1xuICAgICAgICB9LCAwKTtcblxuICAgICAgICBkYXRhLmNvdW50QWN0aXZlID0gdGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGggLSBkYXRhLmNvdW50Q29tcGxldGVkO1xuXG4gICAgICAgIHJldHVybiB0b2RvVHBsLmNhbGwodGhpcywgZGF0YSk7XG4gICAgfVxufSk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHlvdXNzZWYgb24gMTAvMTAvMTYuXG4gKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge3RvZG9Gb290ZXJUcGx9IGZyb20gJy4vdGVtcGxhdGVzL3RvZG9Gb290ZXIudHBsLmpzeCc7XG5cbmV4cG9ydCB2YXIgVG9kb0Zvb3RlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRvZG9Gb290ZXJUcGwuY2FsbCh0aGlzKTtcbiAgICB9XG59KTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgeW91c3NlZiBvbiAxMC8xMC8xNi5cbiAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7dG9kb0l0ZW1UcGx9IGZyb20gJy4vdGVtcGxhdGVzL3RvZG9JdGVtLnRwbC5qc3gnO1xuXG5leHBvcnQgdmFyIFRvZG9JdGVtID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbW91c2VJbnNpZGU6IGZhbHNlXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBoYW5kbGVNb3VzZUVudGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe21vdXNlSW5zaWRlOiB0cnVlfSk7XG4gICAgfSxcbiAgICBoYW5kbGVNb3VzZUxlYXZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe21vdXNlSW5zaWRlOiBmYWxzZX0pO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0b2RvSXRlbVRwbC5iaW5kKHRoaXMpKCk7XG4gICAgfVxufSk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHlvdXNzZWYgb24gMTAvMTAvMTYuXG4gKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7VG9kb30gZnJvbSAnLi9Ub2RvLmpzeCc7XG5cbnZhciB0b2RvQ29tcG9uZW50ID0gUmVhY3RET00ucmVuZGVyKFxuICAgIDxUb2RvIC8+LFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxuKTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgeW91c3NlZiBvbiAxMC8xMC8xNi5cbiAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7VG9kb0Zvb3Rlcn0gZnJvbSAnLi4vVG9kb0Zvb3Rlci5qc3gnO1xuXG4vKipcbiAqIE5vdGU6IHdlIHBhc3MgYW4gZW1wdHkgZnVuY3Rpb24gYXMgc2Vjb25kIGFyZ3VtZW50IHRvIHNldFN0YXRlIGJlY2F1c2Ugb3RoZXJ3aXplIHdlIGdldCBhbiBlcnJvclxuICogXCJVbmNhdWdodCBJbnZhcmlhbnQgVmlvbGF0aW9uOiBzZXRTdGF0ZSguLi4pOiBFeHBlY3RlZCB0aGUgbGFzdCBvcHRpb25hbCBgY2FsbGJhY2tgIGFyZ3VtZW50XG4gKiB0byBiZSBhIGZ1bmN0aW9uLiBJbnN0ZWFkIHJlY2VpdmVkOiBTeW50aGV0aWNNb3VzZUV2ZW50LlwiXG4gKiBAcGFyYW0gZGF0YVxuICogQHJldHVybnMge1hNTH1cbiAqL1xuZXhwb3J0IHZhciB0b2RvVHBsID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0xMCBjb2wtbWQtb2Zmc2V0LTFcIj5cbiAgICAgICAgICAgIDxoMT50b2RvczwvaDE+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTEyIGJveFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3gtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJuZXdJdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiV2hhdCBkbyB5b3UgbmVlZCB0byBkbz9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25LZXlQcmVzcz17dGhpcy5oYW5kbGVOZXdJdGVtS2V5UHJlc3N9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImJ0blwiIGNsYXNzTmFtZT1cImJ0biBidG4taW5mbyBjb2wtbWQtMVwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTmV3SXRlbUNsaWNrfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRhLml0ZW1zfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUb2RvRm9vdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50Q29tcGxldGVkPXtkYXRhLmNvdW50Q29tcGxldGVkfSBjb3VudEFjdGl2ZT17ZGF0YS5jb3VudEFjdGl2ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TaG93QWxsPXt0aGlzLnNldFN0YXRlLmJpbmQodGhpcywge25vd1Nob3dpbmc6ICdhbGwnfSwgKCkgPT4ge30pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNob3dBY3RpdmU9e3RoaXMuc2V0U3RhdGUuYmluZCh0aGlzLCB7bm93U2hvd2luZzogJ2FjdGl2ZSd9LCAoKSA9PiB7fSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2hvd0NvbXBsZXRlZD17dGhpcy5zZXRTdGF0ZS5iaW5kKHRoaXMsIHtub3dTaG93aW5nOiAnY29tcGxldGVkJ30sICgpID0+IHt9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufSIsIi8qKlxuICogQ3JlYXRlZCBieSB5b3Vzc2VmIG9uIDEwLzEwLzE2LlxuICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgdmFyIHRvZG9Gb290ZXJUcGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPHRyIGNsYXNzTmFtZT1cIm1hcmdpbi01XCI+XG4gICAgICAgICAgICA8dGQgY29sU3Bhbj1cIjJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC00XCI+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNvdW50Q29tcGxldGVkfSBkb25lIC8ge3RoaXMucHJvcHMuY291bnRBY3RpdmV9IGxlZnRcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC04XCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGNvbC1tZC0zXCIgb25DbGljaz17dGhpcy5wcm9wcy5vblNob3dBbGx9PkFsbDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBjb2wtbWQtM1wiIG9uQ2xpY2s9e3RoaXMucHJvcHMub25TaG93QWN0aXZlfT5BY3RpdmU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gY29sLW1kLTNcIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uU2hvd0NvbXBsZXRlZH0+Q29tcGxldGVkPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICA8L3RyPlxuICAgICk7XG59IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHlvdXNzZWYgb24gMTAvMTAvMTYuXG4gKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCB2YXIgdG9kb0l0ZW1UcGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPHRyIGNsYXNzTmFtZT1cIm1hcmdpbi01XCIgb25Nb3VzZUVudGVyPXt0aGlzLmhhbmRsZU1vdXNlRW50ZXJ9IG9uTW91c2VMZWF2ZT17dGhpcy5oYW5kbGVNb3VzZUxlYXZlfT5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJjb2wtbWQtMTEgY2hlY2tib3gtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPXt0aGlzLnByb3BzLmluZGV4fSBvbkNoYW5nZT17dGhpcy5wcm9wcy5vblRvZ2dsZX0gY2hlY2tlZD17dGhpcy5wcm9wcy5jb21wbGV0ZWR9Lz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17dGhpcy5wcm9wcy5pbmRleH0+e3RoaXMucHJvcHMuY29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDYwIDQwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkPVwiTTIxLDIgQzEzLjQ1ODAyMTksNC4xNjAyNzM5NCAxLjYyMzQ5Mzc4LDE4LjMxMTc0NjkgMywxOSBDOS4wMzY1MzMxMiwyMi4wMTgyNjY2IDI1LjI0ODIxNzEsMTAuMzc1ODkxNCAzMCw4IEMzMi45MzYzNjIxLDYuNTMxODE4OTYgNDEuMzIxMzk4LDEuNjc4NjAxOTUgMzksNCBDMzYuMTE4NjAxMSw2Ljg4MTM5ODkgMy4xMTMxNjE1NywyNy4xMTMxNjE2IDUsMjkgQzEwLjMyMjM2NTksMzQuMzIyMzY1OSAzMC42NDM0NjQ3LDE5Ljc0MjYxNDEgMzUsMTggQzQxLjIyODEwNDcsMTUuNTA4NzU4MSA0Ni4zNDQ1MzAzLDEzLjY1NTQ2OTcgNDYsMTQgQzQyLjgyNTgwNzMsMTcuMTc0MTkyNyAzNi45MTU0OTY3LDE5LjY1MDcwMiAzMywyMiBDMzAuMzEzNjI0MywyMy42MTE4MjU0IDE3LDMxLjE2MjQ5OCAxNywzNCBDMTcsNDAuNDcyNDg2NSA1NCwxMi40MDY0MDIxIDU0LDE3IEM1NCwyMy43NDE2NzI4IDM0LDI3LjIyODYyMTMgMzQsMzdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiUGF0aC0xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD1cIjRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2U9XCJyZ2IoOTEsIDE2NywgMTQxKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlRGFzaGFycmF5PVwiMjcwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VEYXNob2Zmc2V0PVwiMjcwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID48L3BhdGg+XG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLm1vdXNlSW5zaWRlID9cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4tZGVsZXRlXCIgb25DbGljaz17dGhpcy5wcm9wcy5vblJlbW92ZX0+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDogbnVsbH1cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgKTtcbn0iXX0=

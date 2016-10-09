/**
 * Created by youssef on 10/10/16.
 */
import React from 'react';
import {todoItemTpl} from './templates/todoItem.tpl.jsx';

export var TodoItem = React.createClass({
    getInitialState: function () {
        return {
            mouseInside: false
        };
    },
    handleMouseEnter: function () {
        this.setState({mouseInside: true});
    },
    handleMouseLeave: function () {
        this.setState({mouseInside: false});
    },
    render: function () {
        return todoItemTpl.bind(this)();
    }
});
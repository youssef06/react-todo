/**
 * Created by youssef on 10/10/16.
 */
import React from 'react';
import {todoFooterTpl} from './templates/todoFooter.tpl.jsx';

export var TodoFooter = React.createClass({
    render: function () {
        return todoFooterTpl.call(this);
    }
});
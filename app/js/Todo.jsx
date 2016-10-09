/**
 * Created by youssef on 10/10/16.
 */
import React from 'react';
import {TodoItem} from './TodoItem.jsx';
import {todoTpl} from './templates/todo.tpl.jsx';

const DISPLAY_TYPES = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed'
};

export var Todo = React.createClass({
    getInitialState: function () {
        return {
            nowShowing: DISPLAY_TYPES.ALL,
            items: [
                {content: 'Learn React', completed: false},
                {content: 'Pay bills', completed: false},
                {content: 'Hit the gym', completed: true},
                {content: 'Buy eggs', completed: false},
            ]
        };
    },
    handleNewItemKeyPress: function (e) {
        if (e.key === 'Enter') {
            this.handleNewItemClick();
        }
    },
    handleNewItemClick: function () {
        var state = this.state;
        state.items.push({content: document.getElementById('newItem').value, completed: false});
        this.setState(state);
        document.getElementById('newItem').value = "";
    },
    removeItem: function (item) {
        var index = this.state.items.indexOf(item);
        var state = this.state;
        state.items.splice(index, 1);
        this.setState(state);
    },
    toggleItem: function (item) {
        var index = this.state.items.indexOf(item);
        item.completed = !item.completed;
        this.state.items[index] = item;
        this.setState(this.state);
    },
    render: function () {
        var data = {}; //this will be passed to the template as a parameter

        //filter items to display, depends on nowShowing value
        var itemsToShow = this.state.items.filter((item) => {
            switch (this.state.nowShowing) {
                case DISPLAY_TYPES.ACTIVE:
                    return !item.completed;
                case DISPLAY_TYPES.COMPLETED:
                    return item.completed;
                default:
                    return true;
            }
        });

        //build an array of Item components
        data.items = itemsToShow.map((item, i) => {
            //we add key because react needs each element in an array to have a unique key
            return (
                <TodoItem
                    content={item.content}
                    completed={item.completed}
                    onRemove={this.removeItem.bind(this, item)}
                    key={i}
                    index={i}
                    onToggle={this.toggleItem.bind(this, item)}
                />
            );
        });

        data.countCompleted = this.state.items.reduce((previousValue, currentValue, currentIndex, arr) => {
            return currentValue.completed ? ++previousValue : previousValue;
        }, 0);

        data.countActive = this.state.items.length - data.countCompleted;

        return todoTpl.call(this, data);
    }
});
/**
 * Created by youssef on 10/10/16.
 */
import React from 'react';
import {TodoFooter} from '../TodoFooter.jsx';

/**
 * Note: we pass an empty function as second argument to setState because otherwize we get an error
 * "Uncaught Invariant Violation: setState(...): Expected the last optional `callback` argument
 * to be a function. Instead received: SyntheticMouseEvent."
 * @param data
 * @returns {XML}
 */
export var todoTpl = function (data) {
    return (
        <div className="col-md-10 col-md-offset-1">
            <h1>todos</h1>
            <div className="row">
                <div className="col-md-12 box">
                    <div className="row">
                        <div className="box-header">
                            <div className="col-md-11">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="newItem"
                                    placeholder="What do you need to do?"
                                    onKeyPress={this.handleNewItemKeyPress}
                                />
                            </div>
                            <button id="btn" className="btn btn-info col-md-1" onClick={this.handleNewItemClick}>
                                <span className="glyphicon glyphicon-plus"></span>
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <table className="table">
                            <tbody>
                            {data.items}
                            <TodoFooter
                                countCompleted={data.countCompleted} countActive={data.countActive}
                                onShowAll={this.setState.bind(this, {nowShowing: 'all'}, () => {})}
                                onShowActive={this.setState.bind(this, {nowShowing: 'active'}, () => {})}
                                onShowCompleted={this.setState.bind(this, {nowShowing: 'completed'}, () => {})}
                            />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
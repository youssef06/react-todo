/**
 * Created by youssef on 10/10/16.
 */
import React from 'react';

export var todoFooterTpl = function () {
    return (
        <tr className="margin-5">
            <td colSpan="2">
                <div className="col-md-4">
                    {this.props.countCompleted} done / {this.props.countActive} left
                </div>
                <div className="col-md-8">
                    <button className="btn col-md-3" onClick={this.props.onShowAll}>All</button>
                    <button className="btn col-md-3" onClick={this.props.onShowActive}>Active</button>
                    <button className="btn col-md-3" onClick={this.props.onShowCompleted}>Completed</button>
                </div>
            </td>
        </tr>
    );
}
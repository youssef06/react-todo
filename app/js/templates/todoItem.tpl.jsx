/**
 * Created by youssef on 10/10/16.
 */
import React from 'react';

export var todoItemTpl = function () {
    return (
        <tr className="margin-5" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
            <td className="col-md-11 checkbox-container">
                <input type="checkbox" id={this.props.index} onChange={this.props.onToggle} checked={this.props.completed}/>
                <label htmlFor={this.props.index}>{this.props.content}
                    <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M21,2 C13.4580219,4.16027394 1.62349378,18.3117469 3,19 C9.03653312,22.0182666 25.2482171,10.3758914 30,8 C32.9363621,6.53181896 41.321398,1.67860195 39,4 C36.1186011,6.8813989 3.11316157,27.1131616 5,29 C10.3223659,34.3223659 30.6434647,19.7426141 35,18 C41.2281047,15.5087581 46.3445303,13.6554697 46,14 C42.8258073,17.1741927 36.9154967,19.650702 33,22 C30.3136243,23.6118254 17,31.162498 17,34 C17,40.4724865 54,12.4064021 54,17 C54,23.7416728 34,27.2286213 34,37"
                            id="Path-1"
                            strokeWidth="4"
                            fill="none"
                            stroke="rgb(91, 167, 141)"
                            strokeDasharray="270"
                            strokeDashoffset="270"
                        ></path>
                    </svg>
                </label>
            </td>
            <td>
                {this.state.mouseInside ?
                    <button className="btn-delete" onClick={this.props.onRemove}></button>
                    : null}
            </td>
        </tr>
    );
}
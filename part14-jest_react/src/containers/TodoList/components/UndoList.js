import React, { Component } from "react";

export default class UndoList extends Component {
    render() {
        const { list, deleteItem } = this.props;
        return (
            <div className="undolist-box">
                <div className="undolist-title">
			        正在进行:
                    <span data-test="count" className="count">{ list && list.length }</span>
                </div>
                <ul className="list">
                    {
                        list && list.map((newItem, index) => {
                                return (
                                    <li key={index}
                                        data-test="item"
                                        className="item">
                                        {newItem}

                                        <span
                                            className="deleteBtn"
                                            data-test="deleteBtn"
                                            onClick={() => deleteItem(index)}>-</span>
                                    </li>
                                )
                        })
                    }
                </ul>
           </div> 
        );
    }
}


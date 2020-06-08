import React, { Component } from "react";

export default class UndoList extends Component {
    render() {
        const {
            list,
            deleteItem,
            changeStatus,
            onInputBlur,
            onInputBlurToSave,
        } = this.props;

        return (
            <div className="undolist-box">
                <div className="undolist-title">
                    正在进行:
                    <span data-test="count" className="count">
                        {list && list.length}
                    </span>
                </div>
                <ul className="list">
                    {list &&
                        list.map((newItem, index) => {
                            return (
                                <li
                                    key={index}
                                    data-test="item"
                                    className="item"
                                    onClick={() => changeStatus(index)}
                                >
                                    {newItem.status === "div" ? (
                                        newItem.value
                                    ) : (
                                        <input
                                            data-test="input"
                                            value={newItem.value}
                                            onBlur={() => onInputBlur(index)}
                                            onChange={(e) =>
                                                onInputBlurToSave(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    )}
                                    <span
                                        className="deleteBtn"
                                        data-test="deleteBtn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteItem(index);
                                        }}
                                    >
                                        -
                                    </span>
                                </li>
                            );
                        })}
                </ul>
            </div>
        );
    }
}

import React, { Component } from "react";

export default class Header extends Component {
    state = {
        value: "",
    };
    handleInputChange(e) {
        this.setState({
            value: e.target.value,
        });
    }
    handleInputKeyUp(e) {
        const { value } = this.state;
        if (e.keyCode === 13 && value) {
            this.props.addUndoItem(value);
            this.setState({
                value : ''
            })
        }
    }
    render() {
        const { value } = this.state;
        return (
            <div className="header-box" data-test="Header">
                <div className="header-content">
                    TodoList
                    <input
                        className="header-input"
                        data-test="input"
                        placeholder = "请输入待办事项"
                        value={value}
                        onChange={this.handleInputChange.bind(this)}
                        onKeyUp={this.handleInputKeyUp.bind(this)}/>
                </div>  
            </div>
        );
    }
}

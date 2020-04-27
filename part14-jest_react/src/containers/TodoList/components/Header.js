import React, { Component } from "react";

class Header extends Component {
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
        }
    }
    render() {
        const { value } = this.state;
        return (
            <div class="Header" data-test="Header">
                <input
                    data-test="input"
                    value={value}
                    onChange={this.handleInputChange.bind(this)}
                    onKeyUp={this.handleInputKeyUp.bind(this)}
                />
            </div>
        );
    }
}
export default Header;

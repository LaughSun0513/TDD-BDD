import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from '../store';

class Header extends Component {
    handleInputKeyUp(e) {
        const { value } = this.props;
        if (e.keyCode === 13 && value) {
            this.props.addUndoItem(value);
            this.props.handleInputChange('');
        }
    }
    render() {
        const {
            value,
            handleInputChange
        } = this.props;
        return (
            <div className="header-box" data-test="Header">
                <div className="header-content">
                    TodoList
                    <input
                        className="header-input"
                        data-test="header-input"
                        placeholder = "请输入待办事项"
                        value={value}
                        onChange = {
                            e => handleInputChange(e.target.value)
                        }
                        onKeyUp = {
                            this.handleInputKeyUp.bind(this)
                        }
                        />
                </div>  
            </div>
        );
    }
}

const mapStateToProps = state => { 
    return {
        value: state.todo.inputValue
    }
}
const mapDispatchToProps = dispatch => ({
    handleInputChange(value) {
        dispatch(actions.handleInputChange(value));
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)
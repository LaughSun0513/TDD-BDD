import React, { Component } from "react";
import Header from "./components/Header";
import UndoList from "./components/UndoList";
import './index.css';

class TodoList extends Component {
    state = {
        undoList : []
    }
    addUndoItem = (value) => { 
        this.setState({
            undoList: [...this.state.undoList, value]
        })
    }
    deleteItem = (index) => { 
        const newList = [...this.state.undoList];
        newList.splice(index, 1);
        this.setState({
            undoList:newList
        })
    }
    render() {
        const { undoList } = this.state;
        return (
            <>
                <Header addUndoItem={this.addUndoItem} />
                <UndoList list={undoList} deleteItem={this.deleteItem}/>
            </>
        )

    }
}
export default TodoList;

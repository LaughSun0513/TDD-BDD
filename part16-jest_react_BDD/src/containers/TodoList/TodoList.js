import React, { Component } from "react";
import Header from "./components/Header";
import UndoList from "./components/UndoList";
import './index.css';
import axios from "axios";

class TodoList extends Component {
    state = {
        undoList : []
    }
    addUndoItem = (value) => { 
        this.setState({
            undoList: [...this.state.undoList, {
                status: 'div',
                value
            }]
        })
    }
    deleteItem = (index) => { 
        const newList = [...this.state.undoList];
        newList.splice(index, 1);
        this.setState({
            undoList:newList
        })
    }
    changeStatus = (index) => { 
        const newList = this.state.undoList.map((listItem, listIndex) => {
            if (listIndex === index) {
                return {
                    status: 'input',
                    value: listItem.value
                }
            }
            return {
                status: 'div',
                value: listItem.value
            }
        });

        this.setState({
            undoList: newList
        });
    }
    onInputBlur = (index) => { 
        const newList = this.state.undoList.map((listItem, listIndex) => {
            if (listIndex === index) {
                return {
                    ...listItem,
                    status: 'div'
                }
            }
            return listItem;
        });

        this.setState({
            undoList: newList
        });
    }
    onInputBlurToSave = (index,newValue) => {
        const newList = this.state.undoList.map((listItem, listIndex) => {
            if (listIndex === index) {
                return {
                    ...listItem,
                    value: newValue
                }
            }
            return listItem;
        });

        this.setState({
            undoList: newList
        });
    }
    componentDidMount() { 
        axios.get('/undoList.json').then(res => {
            this.setState({
                undoList: res.data
            });
        }).catch(e => {
            console.log(e);
        });

        setTimeout(() => { 
            axios.get('/undoList2.json').then(res => {
                this.setState({
                    undoList: res.data
                });
            }).catch(e => {
                console.log(e);
            });
        },4000)
    }
    render() {
        const { undoList } = this.state;
        return (
            <>
                <Header addUndoItem={this.addUndoItem} />
                <UndoList
                    list={undoList}
                    deleteItem={this.deleteItem}
                    changeStatus={this.changeStatus}
                    onInputBlur={this.onInputBlur}
                    onInputBlurToSave={this.onInputBlurToSave}
                />
            </>
        )

    }
}
export default TodoList;

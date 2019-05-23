import React, { Component } from 'react'

class TodoStatus extends Component<any, any> {
    constructor(props) {
        super(props)
    }
    private computCount(): number {
        return this.props.allTask.filter((item) => {
            return item.isChecked
        }).length
    }
    public render() {
        return (
            <div className="todo-status">
                <div className="appName">spark todo list</div>
                <div>已完成{this.computCount()}/{(this.props.allTask as string).length}</div>
            </div>
        )
    }
}

export default TodoStatus
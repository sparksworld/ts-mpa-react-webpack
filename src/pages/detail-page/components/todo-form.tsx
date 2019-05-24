import React, { Component } from 'react'

class TodoForm extends Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            taskName: ''
        }
    }
    private changeValue = (e) => {
        let target = e.target
        this.setState({
            taskName: target.value
        })
    }

    private sureAdd = () => {
        this.props.addEvent(this.state)
        this.setState({
            taskName: ''
        })
    }

    public render() {
        return (
            <div className="todo-form">
                <input type="text"
                    placeholder='请输入你要做的事项'
                    onChange={this.changeValue}
                    value={this.state.taskName}
                    onFocus={() => {setTimeout(()=>window.document.body.scrollTop = window.document.body.scrollHeight)}}
                />
                <button
                    className="btn btn-primary add"
                    onClick={this.sureAdd}
                >添加</button>
            </div>
        )
    }
}

export default TodoForm
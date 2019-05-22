import React, { Component } from 'react'
// import ReactDOM from 'react-dom'

class TodoItem extends Component<any, any> {
    constructor(props) {
        super(props)
    }
    render() {
        return <li>{this.props.taskname}</li>
    }
}

export default TodoItem
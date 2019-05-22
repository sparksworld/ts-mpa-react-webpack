import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import TodoItem from './components/todo-item'
import api from './api'
//http://www.wukai.me/simplest-react-todolist/
// // @ts-ignore
// // import test from "~/lib/test"
import './assets/sass/style.scss'
class App extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            tasks: [{
                id: 1,
                taskName: '写日报'
            }, {
                id: 2,
                taskName: '吃饭'
            }, {
                id: 3,
                taskName: '睡觉'
            }, {
                id: 4,
                taskName: '打豆豆'
            }]
        }
    }
    public render() {
        const list: object[] =  this.state.tasks.map((item: {
            id: number,
            taskName: string
        }) => (
            <TodoItem key={item.id} taskname={item.taskName}></TodoItem>
        ))
        return (
            <div>
                <div className="todo_box">
                    <ul>{list}</ul>
                </div>
            </div>
        )
    }
    public componentDidMount() {
    }
}


ReactDOM.render(
    <App a="1" />,
    document.querySelector('#app')
);
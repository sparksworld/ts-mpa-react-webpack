import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import TodoItem from './components/todo-item'
import TodoStatus from './components/todo-status'
import TodoForm from './components/todo-form'
import api from './api'
import './assets/sass/style.scss'

declare module 'react' {
    interface Component {
        [x: string]: any
    }
}
// api.getSearchType()
Component.prototype.$axios = api

class App extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            tasks: [{
                id: 1,
                taskName: '写日报',
                isChecked: false,
                isEdit: false
            }, {
                id: 2,
                taskName: '吃饭',
                isChecked: false,
                isEdit: false
            }, {
                id: 3,
                taskName: '睡觉',
                isChecked: false,
                isEdit: false
            }, {
                id: 4,
                taskName: '打豆豆',
                isChecked: false,
                isEdit: false
            }]
        }
    }
    private addEvent = (p: { taskName: any; }) => {
        // console.log(p)
        let _tasks = this.state.tasks
        if (p.taskName) {
            _tasks.push({
                id: new Date().getTime(),
                taskName: p.taskName,
                isChecked: false,
                isEdit: false
            })
            this.setState({
                tasks: _tasks
            })
        }

    }
    protected handleChange(_index: number, _type: string, _content?: string) {
        let runTask: any = {
            delete: this.setState.bind(this, ({ tasks }: any) => {
                tasks.splice(_index, 1)
                return {
                    tasks: tasks
                }
            }),
            active: this.setState.bind(this, (({ tasks }: any) => {
                return tasks.map((item: { isChecked: boolean; isEdit: boolean; }, i: number) => {
                    if (i == _index) {
                        item.isChecked = !item.isChecked
                        if (item.isEdit) {
                            item.isEdit = !item.isEdit
                        }
                    } else {
                        item.isEdit = false
                    }
                })
            })),
            edit: this.setState.bind(this, ({ tasks }: any) => {
                return tasks.map((item: { isEdit: boolean; }, i: number) => {
                    if (i == _index) {
                        item.isEdit = !item.isEdit
                    } else {
                        item.isEdit = false
                    }
                })
            }),
            sure: this.setState.bind(this, ({ tasks }: any) => {
                return tasks.map((item: { taskName: string; isEdit: boolean; }, i: number) => {
                    if (i == _index) {
                        item.taskName = _content
                        item.isEdit = !item.isEdit
                    }
                })
            })
        }
        runTask[_type]()
    }

    public render() {
        return (
            <div className="todo-list">
                <TodoStatus allTask={this.state.tasks}></TodoStatus>
                <div className="todo_box">
                    <ul>{
                        this.state.tasks.map((item: {
                            id: number,
                            taskName: string,
                            isChecked: boolean
                        }, index: number) => (
                                <TodoItem
                                    key={item.id}
                                    taskItem={item}
                                    index={index}
                                    stateChange={
                                        (_index: number, _type: string, _content?: string) => this.handleChange(_index, _type, _content)
                                    }
                                ></TodoItem>
                            ))
                    }</ul>
                </div>
                <TodoForm addEvent={(p: any) => this.addEvent(p)}></TodoForm>
            </div>
        )
    }
    public componentDidMount() {
    }
}


ReactDOM.render(
    <App />,
    document.querySelector('#app')
);
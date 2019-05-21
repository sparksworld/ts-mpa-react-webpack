import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// // @ts-ignore
// // import test from "~/lib/test"
import './assets/sass/style.scss'
class App extends Component<any, any> {
    protected arr: Array<any> = ['aaa']
    constructor(props: any) {
        super(props);
        this.state = {
            t: 2,
            b: 2
        }
    }
    public render() {
        return (
            <div>
                {this.state.t}
            </div>
        )
    }
    public componentDidMount() {
        console.log(this.arr as number[])
        setTimeout((): void => {
            this.setState({
                t: 1
            })
        }, 2000)

        // console.log(this.props)

    }
}

// class HelloMessage extends Component<any, any> {
//     public render() {
//         return <h1>{this.props.test}</h1>;
//     }
//     public componentDidMount() {
//         // console.log(this.props)
//     }
// }

ReactDOM.render(
    <App a="1" />,
    document.querySelector('#app')
);
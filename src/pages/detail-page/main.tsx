import * as React from 'react'
import * as ReactDOM from 'react-dom'
// @ts-ignore
import test from "~/lib/test"
import './assets/sass/style.scss'


class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            1: 'spark'
        }
    }
    public render() {
        return (
            <div>
                <HelloMessage test={this.props.a} />
            </div>
        )
    }
    public componentDidMount() {
        // console.log(this.props)
    }
}

class HelloMessage extends React.Component<any, any> {
    public render() {
        return <h1>{this.props.test}</h1>;
    }
    public componentDidMount() {
        // console.log(this.props)
    }
}

ReactDOM.render(
    <App a="1" />,
    document.querySelector('#app')
);
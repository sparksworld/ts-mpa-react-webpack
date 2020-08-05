import React, { Component } from "react";

class TodoStatus extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			author: "spark",
			title: "Spark ToDoList"
		};
	}
	private computCount(): number {
		return this.props.allTask.filter((item: { isChecked: any }) => {
			return item.isChecked;
		}).length;
	}
	public render() {
		return (
			<div className="todo-status">
				<div className="appName">{this.state.title}</div>
				<div>
					已完成{this.computCount()}/
					{(this.props.allTask as string).length}
				</div>
			</div>
		);
	}
}

export default TodoStatus;

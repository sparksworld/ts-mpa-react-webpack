import React, { Component } from "react";
// import ReactDOM from 'react-dom'
// console.log(React)
class TodoItem extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			editContent: this.props.taskItem.taskName
		};
	}
	private stateChange(i: any, t: string, e: { stopPropagation: () => void }) {
		e.stopPropagation();
		this.props.stateChange(i, t, this.state.editContent);
		if (t != "sure") {
			this.setState({
				editContent: this.props.taskItem.taskName
			});
		}
	}
	private keyPress(e: any) {
		e.keyCode === 13 && this.stateChange(this.props.index, "sure", e);
	}
	private changText(e: { target: any }) {
		let target = e.target;
		this.setState({
			editContent: target.value
		});
	}
	public render() {
		return (
			<li
				onClick={this.stateChange.bind(
					this,
					this.props.index,
					"active"
				)}
				className={
					this.props.taskItem.isChecked
						? "item-style"
						: "item-style-active"
				}
			>
				<input
					type="checkbox"
					readOnly
					checked={this.props.taskItem.isChecked}
				/>
				<div className="edit_box">
					{this.props.taskItem.isEdit ? (
						<input
							type="text"
							onClick={(e) => e.stopPropagation()}
							onKeyUp={this.keyPress.bind(this)}
							onChange={this.changText.bind(this)}
							value={this.state.editContent}
						/>
					) : (
						this.props.taskItem.taskName
					)}
				</div>

				{this.props.taskItem.isChecked ? (
					<button
						onClick={this.stateChange.bind(
							this,
							this.props.index,
							"delete"
						)}
						className="btn btn-warning"
					>
						删除
					</button>
				) : this.props.taskItem.isEdit ? (
					<button
						onClick={this.stateChange.bind(
							this,
							this.props.index,
							"sure"
						)}
						className="btn btn-primary"
					>
						确定
					</button>
				) : (
					<button
						onClick={this.stateChange.bind(
							this,
							this.props.index,
							"edit"
						)}
						className="btn btn-primary"
					>
						编辑
					</button>
				)}
			</li>
		);
	}
}

export default TodoItem;

import React from 'react';

class TaskColumn extends React.Component {

	constructor(props){ 
		super(props);
		this.state = { 
			name : this.props.name,
			listItems: this.props.listItems
		}

	}

	render() {
		return (
			<div>
				<label> {this.state.name} </label>
				{this.state.listItems.map((item) => <li>{item}</li>)}
			</div>
		)
	}
}

export default TaskColumn
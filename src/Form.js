import React from 'react';

class Form extends React.Component {

	constructor(props){ 
		super(props);
		this.state = { 
			newProjectName: ''
		}

	}

	handleNewProjectNameChange = (event) => { 
		this.setState({ 
			newProjectName: event.target.value
		})
	}

	handleAddNewProjectName = (event) => { 
		if (event.key === 'Enter') {
      		this.props.onAddNewProjectName(this.state.newProjectName);
      		this.setState({ newProjectName: ''});
    	}
	}

	render() {
		return (
			<div>
				<label> Add Project </label>
				<input type="text" value={this.state.newProjectName} style={{height: '20px', width: '200px',margin: '20px 20px 0px 0px', fontSize:'15px'}}
				onChange={this.handleNewProjectNameChange} onKeyDown={this.handleAddNewProjectName}/>
			</div>
		)
	}
}

export default Form
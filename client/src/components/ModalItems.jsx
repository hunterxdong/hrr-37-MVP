import React from 'react';

class ModalItems extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			names: this.props.names
		};
	}

	render() {
		return (
			<div>
				{this.props.names[0]} ${this.props.together[this.props.names[0]]}
			</div>
		);
	}
}

export default ModalItems;

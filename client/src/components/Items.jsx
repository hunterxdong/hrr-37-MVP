import React from 'react';
import $ from 'jquery';

class Items extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	clickX() {
        this.props.del(this.props.index);
	}
	render() {
		return (
			<div>
				<div className="container-data">
                    {this.props.name} owes you {this.props.amount} for {this.props.why} 
					<div className="deleteMe" onClick={this.clickX.bind(this)}>
						X
					</div>
				</div>
			</div>
		);
	}
}
export default Items;

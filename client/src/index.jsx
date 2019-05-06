import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			total: 0
		};
	}
	clickAddButton = function() {
		this.setState({ total: this.state.total + 1 });
	};
	absolveAll = function() {
		this.setState({ total: 0 });
	};
	render() {
		return (
			<div>
				<div className="container-main">
					<header className="money">Who's got ME Money?!</header>
					<div className="container-form">
						<input type="text" className="input-key" placeholder="WHO?" />
						<input
							type="number"
							className="input-value"
							placeholder="HOW MUCH?!?!?!"
						/>
						<button
							className="btn-add"
							onClick={this.clickAddButton.bind(this)}
						>
							Submit
						</button>
						<button className="btn-clear" onClick={this.absolveAll.bind(this)}>
							Absolve All
						</button>
						<div className="total-owed">Total $:</div>
						<div className="total">{this.state.total}</div>
					</div>
				</div>
				<div className="container-data" />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

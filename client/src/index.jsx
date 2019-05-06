import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Items from './components/Items.jsx';
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			total: 0,
			keyData: '',
			valueData: 0,
			index: 0,
			delIndex: 0,
			who: []
		};
	}
	//send a get request to the database to populate the react dom
	deleteOne = function(num) {
		var newArr = this.state.who.slice(0);
		var holder;
		this.setState({ delIndex: num });
		for (var i = 0; i < newArr.length; i++) {
			if (newArr[i].index === this.state.delIndex) {
				holder = parseInt(newArr[i].amount);
				this.setState({ total: parseInt(this.state.total) - holder });
				newArr.splice(i, 1);
			}
		}
		this.setState({ who: newArr });
	};
	clickAddButton = function() {
		//this.setState({ total: this.state.total + 1 });
		var keyData = $('.input-key').val();
		var valueData = $('.input-value').val();
		var whyData = $('.input-why').val();
		if (!whyData) {
			alert('Please input a reason');
			return false;
		}
		// write to db
		if (!valueData) {
			alert('Please input a number');
			return false;
		}
		if (!keyData) {
			alert('Please input a name');
			return false;
		}
		var newObj = {};
		this.setState({ keyData: $('.input-key').val() });
		this.setState({ valueData: parseInt($('.input-value').val()) });
		this.setState({
			total: this.state.total + parseInt($('.input-value').val())
		});
		newObj.index = this.state.index;
		newObj.name = $('.input-key').val();
		newObj.amount = parseInt($('.input-value').val());
		newObj.why = $('.input-why').val();
		this.state.who.push(newObj);
		this.setState({ who: this.state.who });
		this.setState({ index: this.state.index + 1 });
	};
	absolveAll = function() {
		this.setState({ total: 0, who: [] });
		alert('please enter credit card info');
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
							placeholder="HOW MUCH!?!"
						/>
						<input type="text" className="input-why" placeholder="FOR WHAT?" />
						<br />
						<button
							className="btn-add"
							onClick={this.clickAddButton.bind(this)}
						>
							Submit
						</button>
						<button className="btn-clear" onClick={this.absolveAll.bind(this)}>
							Absolve All
						</button>
						<div className="total-owed">Total $: {this.state.total}</div>
					</div>
				</div>
				{this.state.who.map(data => (
					<Items
						name={data.name}
						amount={data.amount}
						why={data.why}
						index={data.index}
						del={this.deleteOne.bind(this)}
					/>
				))}
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

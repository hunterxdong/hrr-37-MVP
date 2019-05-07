import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Items from './components/Items.jsx';
import TotalsModal from './components/TotalsModal.jsx';
import axios from 'axios';
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			total: 0,
			keyData: '',
			valueData: 0,
			who: []
		};
	}
	componentDidMount() {
		axios
			.get(`/api/debts`)
			.then(response => {
				this.setState({ who: response.data });
				var totalNums = 0;
				for (var i = 0; i < response.data.length; i++) {
					totalNums += response.data[i].amount;
				}
				this.setState({ total: totalNums });
			})
			.catch(error => {
				console.log(error);
			});
	}
	//send a get request to the database to populate the react dom
	deleteOne = function(num) {
		axios.post(`/api/delete`, { id: num }).catch(error => {
			console.log(error);
		});
		axios
			.get(`/api/debts`)
			.then(response => {
				this.setState({ who: response.data });
				var totalNums = 0;
				for (var i = 0; i < response.data.length; i++) {
					totalNums += response.data[i].amount;
				}
				this.setState({ total: totalNums });
			})
			.catch(error => {
				console.log(error);
			});
	};
	clickAddButton = function() {
		//this.setState({ total: this.state.total + 1 });
		event.preventDefault();
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
		axios
			.post(`/api/add`, newObj)
			.then(function(response) {
				console.log(response);
			})
			.catch(function(error) {
				console.log(error);
			});
		document.getElementById('input1').value = '';
		document.getElementById('input2').value = '';
		document.getElementById('input3').value = '';
	};
	absolveAll = function() {
		if (confirm('Are you sure?')) {
			this.setState({ total: 0, who: [] });
			axios.delete(`/api/absolve`);
		}
		// alert('please enter credit card info');
	};
	render() {
		return (
			<div>
				<div className="container-main">
					<header className="money">Who's got ME Money?!</header>
					<form className="container-form">
						<input
							type="text"
							className="input-key"
							placeholder="WHO?"
							id="input3"
						/>
						<input
							type="number"
							className="input-value"
							placeholder="HOW MUCH!?!"
							id="input2"
						/>
						<input
							type="text"
							className="input-why"
							id="input1"
							placeholder="FOR WHAT?"
						/>
						<br />
						<button
							className="btn-add"
							onClick={this.clickAddButton.bind(this)}
							onSubmit={this.clickAddButton.bind(this)}
						>
							Submit
						</button>
						<button className="btn-clear" onClick={this.absolveAll.bind(this)}>
							Absolve All
						</button>
					</form>
					<TotalsModal data={this.state.who} />
					<div className="total-owed">Total $: {this.state.total}</div>
				</div>
				{this.state.who.map(data => (
					<Items
						name={data.name}
						amount={data.amount}
						why={data.why}
						id={data.id}
						del={this.deleteOne.bind(this)}
					/>
				))}
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

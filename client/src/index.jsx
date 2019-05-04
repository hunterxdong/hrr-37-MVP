import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
	componentDidMount() {
		$(document).ready(function() {
			// this is where we jquery
			//var keyData = 'ourKey'; // going to need to make this dynamic?

			$('.btn-add').on('click', function(e) {
				console.log(e);
				var keyData = $('.input-key').val();
				var valueData = $('.input-value').val();
				// write to db
				if (valueData === '') {
					alert('Please input a number');
					return false;
				}
				if (keyData === '') {
					alert('Please input a name');
					return false;
				}
				localStorage.setItem(keyData, valueData);
				// read from db
				var displayText = keyData + ' | ' + localStorage.getItem(keyData);
				// this only displays the last one? might want to switch to html
				// and append a div
				// <div class="display-data-item" data-keyValue="keyData">valueData</div>
				// if you use backticks ` you can use ${templateLiterals}
				// TODO make this vars make sense across the app
				$(
					'<ul class="display-data-item" data-keyValue="' +
						keyData +
						'">' +
						keyData +
						' ' +
						'$' +
						valueData +
						'<div class="deleteMe">X</div></ul>'
				).appendTo('.container-data');
				$('.total').html(parseInt($('.total').html()) + parseInt(valueData));
				$('.input-key').val('');
				$('.input-value').val('');
			});

			// update db
			// need to expand when  more than 1 item is added

			// delete item
			$('.container-data').on('click', '.display-data-item', function(e) {
				console.log(e);
				var keyData = e.currentTarget.dataset.keyvalue;
				$('.total').html(
					parseInt($('.total').html()) - parseInt(localStorage.getItem(keyData))
				);
				$(this)
					.closest('ul')
					.remove();
				var audio = document.getElementsByTagName('audio')[0];
				audio.play();
			});

			// delete all?
			$('.btn-clear').click(function() {
				alert('please enter credit card info');
				localStorage.clear();
				$('.container-data').text('');
				$('.total').html(parseInt($('.total').html()) * 0);
			});
		});
	}

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
						<button className="btn-add" onClick={this.clickAddButton}>
							Submit
						</button>
						<button className="btn-clear" onClick={this.absolveAll}>
							Absolve All
						</button>
						<div className="total-owed">Total $:</div>
						<div className="total">0</div>
					</div>
				</div>
				<div className="container-data" />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

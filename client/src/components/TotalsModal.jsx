import React from 'react';
import Modal from 'react-modal';
import ModalItems from './ModalItems.jsx';

class TotalsModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalstate: false,
			totals: []
		};
	}
	toggle() {
		var nameArr = [];
		var newArr = [];
		for (var i = 0; i < this.props.data.length; i++) {
			if (!nameArr.includes(this.props.data[i].name)) {
				nameArr.push(this.props.data[i].name);
			}
		}
		for (i = 0; i < nameArr.length; i++) {
			var newObj = {};
			newObj[nameArr[i]] = 0;
			for (var j = 0; j < this.props.data.length; j++) {
				if (this.props.data[j].name === nameArr[i]) {
					newObj[nameArr[i]] += this.props.data[j].amount;
				}
			}
			newArr.push(newObj);
		}
		this.setState({ totals: newArr });
		this.setState({
			modalstate: !this.state.modalstate
		});
	}
	componentDidMount() {}
	render() {
		return (
			<div>
				<button className="btn-show" onClick={this.toggle.bind(this)}>
					Show Debtors
				</button>
				<Modal isOpen={this.state.modalstate} ariaHideApp={false}>
					<div className="closeModal" onClick={this.toggle.bind(this)}>
						x
					</div>
					<div className="modal-data" onClick={this.toggle.bind(this)}>
						{this.state.totals.map(data => (
							<ModalItems together={data} names={Object.keys(data)} />
						))}
					</div>
				</Modal>
				/>
			</div>
		);
	}
}

export default TotalsModal;

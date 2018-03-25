// Externals
import React from 'react';
//Data
import Store from '../data/param-store';
//Components
import Widget from '../components/widget';
import DateField from '../components/date-picker';

class Graph extends React.Component {

	constructor() {
		super();
		this.state =  {
			dateEnd : Store.getParams().dateEnd,	
			dateStart : Store.getParams().dateStart
		}
	}

	onDateStartChange(value){
		this.setState({
			dateStart : value
		});
		Store.setParam({dateStart : value});
	}

	onDateEndChange(value){
		this.setState({
			dateEnd : value
		});
		Store.setParam({dateEnd : value});
	}

	render(){
		const {dateStart, dateEnd} = this.state;
		return (
			<Widget title="Real time data">
			<div className='dates'>
				<div className='date-start'>
					Début
					<DateField 
						value = {dateStart}
						onSave = {this.onDateStartChange.bind(this)}
					/>
				</div>
				<div className='date-end'>
					Fin
					<DateField 
						value = {dateEnd}
						onSave = {this.onDateEndChange.bind(this)}
					/>
				</div>
			</div>
			</Widget>
		);
	}
}

Graph.displayName=('graph');
export default Graph;

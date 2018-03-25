// Externals
import React from 'react';
//Data
import ParamStore from '../data/param-store';
//Components
import Widget from '../components/widget';
import Field from '../components/display-field';

class DataAnalysis extends React.Component {

	constructor() {
		super();
		this.state = ParamStore.getValues();
	}

	componentWillMount(){
		ParamStore.addListener(this.onStoreChange.bind(this));
	}

	componentWillUnmount(){
		ParamStore.removeListener(this.onStoreChange.bind(this));
	}

	onStoreChange(){
		this.setState(ParamStore.getValues());
	}

	render(){
		const {max, min, average, overThresh, underThresh, valueThresh} = this.state;
		return (
			<Widget title="Data analysis">
				<div className='rows'>
					<div className='column'>
						<Field label="Maximum" value={max}/>
						<Field label="Average" value={average}/>
						<Field label="Minimum" value={min}/>
					</div>
					<div className='column'>
						<Field label="% over threshold" value={overThresh}/>
						<Field label="Value at threshold" value={valueThresh}/>
						<Field label="% under threshold" value={underThresh}/>
					</div>
				</div>
			</Widget>
		);
	}
}

DataAnalysis.displayName=('data-analysis');
export default DataAnalysis;

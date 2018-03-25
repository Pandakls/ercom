// Externals
import React from 'react';
//Data
import Store from '../data/param-store';
//Components
import Widget from '../components/widget';
import Select from 'react-select';
import InputField from '../components/input-field';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip
const SliderWithToolTip = createSliderWithTooltip(Slider);

let values = [
	{value: 'used', label : 'MEMORY - Used'},
	{value: 'buff', label : 'MEMORY - Buffer'},
	{value: 'cach', label : 'MEMORY - Cach'},
	{value: 'free', label : 'MEMORY - Free'},

	{value: 'usr', label : 'CPU USAGE - User'},
	{value: 'sys', label : 'CPU USAGE - System'},
	{value: 'idl', label : 'CPU USAGE - Idle'},
	{value: 'wai', label : 'CPU USAGE - Waiting'},
	{value: 'hiq', label : 'CPU USAGE - Hiq'},
	{value: 'siq', label : 'CPU USAGE - Siq'},

	{value: 'send', label : 'NETWORK - Bytes sended'},
	{value: 'recv', label : 'NETWORK - Bytes received'},
	{value: 'read', label : 'NETWORK - Read on disk'},
	{value: 'written', label : 'NETWORK - Written on disk'},

	{value: '1m', label : 'LOAD TIME - 1 min'},
	{value: '5m', label : 'LOAD TIME - 5 min'},
	{value: '15m', label : 'LOAD TIME - 15 min'},

	{value: 'files', label : 'Number of files'},
	{value: 'inodes', label : 'Numer of inodes'}
]

class Filter extends React.Component {

	constructor() {
		super();
		this.state =  Store.getParams();		
	}

	onDataChange(selected){		
		this.setState({
			analysedData : selected.value
		});
		Store.setParam({analysedData : selected.value})
	}

	onPeriodChange(){
		let fullPeriod = !this.state.fullPeriod;
		this.setState({
			fullPeriod : fullPeriod
		});
		Store.setParam({fullPeriod : fullPeriod});
	}

	onThresholdChange(value){
		this.setState({
			threshold : value
		});
		Store.setParam({threshold : value});
	}

	render(){
		const {analysedData, fullPeriod} = this.state;
		return (
			<Widget title="Reporting filter">
				<InputField label = "Data">
					<Select 
						options = {values}
						onChange = {this.onDataChange.bind(this)}
						value = {analysedData}
						clearable = {false}
					/>
				</InputField>
				
				<InputField label = "Period">
					<div className='radio'>
						<label>
							<input  type='radio' 
									value= "yes" 
									checked={fullPeriod} 
									onChange={this.onPeriodChange.bind(this)}/>
							All Set
						</label>
						<label>
							<input  type='radio' 
									value= "no" 
									checked={!fullPeriod} 
									onChange={this.onPeriodChange.bind(this)}/>
							Current period only
						</label>
					</div>
				</InputField>

				<InputField label = "Threshold">
					<SliderWithToolTip 
						onChange={this.onThresholdChange.bind(this)}
						tipFormatter={(value) => {return value + ' %'}}
						tipProps= {{left: 0}}
					/>
					<div className='slider-legend'>
						<div className='start'>0%</div>
						<div className='end'>100%</div>
					</div>
				</InputField>
			</Widget>
		);
	}
}

Filter.displayName=('filter');
export default Filter;

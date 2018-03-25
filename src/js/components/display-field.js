// Externals
import React from 'react';

/**
 * Props : 
 * label : string
 * value : displayable
 */
class DisplayField extends React.Component {

	constructor() {
		super();
		this.state = {
		};
	}

	render(){
		const {label, value} = this.props;
		return (
			<div className='display-field'>
				<div className='label'>
					{label}
				</div>
				<div className='value'>
					{value}
				</div>
			</div>
		);
	}
}

DisplayField.displayName=('display-field');
export default DisplayField;

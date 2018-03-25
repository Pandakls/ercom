// Externals
import React from 'react';

/**
 * Props : 
 * label : string
 * children : component
 */
class InputField extends React.Component {

	constructor() {
		super();
		this.state = {
		};
	}

	render(){
		const {label, children} = this.props;
		return (
			<div className='input-field'>
				<div className='label'>
					{label}
				</div>
				<div className='input'>
					{children}
				</div>
			</div>
		);
	}
}

InputField.displayName=('input-field');
export default InputField;

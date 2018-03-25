// Externals
import React from 'react';

/**
 * Props : 
 * Title - string
 * children - jsx
 */
class Widget extends React.Component {

	constructor() {
		super();
		this.state = {
		};
	}

	render(){
		const {title, children} = this.props;
		return (
			<div className='widget'>
				<h1>{title}</h1>
				<div className='widget-content'>
					{children}
				</div>
			</div>
		);
	}
}

Widget.displayName=('widget');
export default Widget;

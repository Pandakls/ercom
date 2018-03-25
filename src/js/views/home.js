// Externals
import React from 'react';
import Graph from './graph';
import Filter from './filter';
import DataAnalysis from './data-analysis';

class HomePage extends React.Component {

	constructor() {
		super();
		this.state = {
		};
	}

	render(){
		return (
			<div className='content'>
				<header>
					Computer status
				</header>
				<section className='dataviz'>
                	<Graph />
				</section>
				<section className='reporting'>
					<div className='filters'>
						<Filter />
					</div>
					<div className='data-analysis'>
						<DataAnalysis />
					</div>
				</section>
			</div>
		);
	}
}

HomePage.displayName=('home');
export default HomePage;

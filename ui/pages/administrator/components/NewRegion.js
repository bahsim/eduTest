import React, { Component } from 'react';
import axios from 'axios'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const panel = () => ([
	{
		link		: '/admin/regions',
		icon		: ArrowBackIcon,
		label		:	'Назад',
	},
])

class NewRegion extends Component {  
	state = {}
	
	componentDidMount() {
		const { setPanel } = this.props
		
		setPanel(panel())
	}	
	
	render() {
		return (
			<div>
				New region
			</div>
		);
	}	
}

export default NewRegion
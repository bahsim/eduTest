import React, { Component } from 'react';
import axios from 'axios'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const panel = () => ([
	{
		link	: '/admin/regions',
		icon	: ArrowBackIcon,
		label	:	'Назад',
	},
])

class EditRegion extends Component {  
	state = {}
	
	componentDidMount() {
		const { setPanel, history, location } = this.props
		const { id } = queryString.parse(location.search)
		
		if (!id) history.replace('/admin/regions')
		
		setPanel(panel())
	}	
	
	render() {
		return (
			<div>
				Edit region
			</div>
		);
	}	
}

export default withRouter(EditRegion)
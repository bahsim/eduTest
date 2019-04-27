import React from 'react';

import Paper from '@material-ui/core/Paper'

const Tests = (props) => {  
	const { top } = props
	
	const registryHeight = ((window.innerHeight - top) - 15 ) + 'px'
	const stylePaper = {height: registryHeight, overflow: 'auto'}
  
	return (
    <Paper style={stylePaper}>
			Tests
    </Paper>
  );
}

export default Tests;
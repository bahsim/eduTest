import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import TextField 			from '@material-ui/core/TextField'

import Input 					from '@material-ui/core/Input'
import InputLabel 		from '@material-ui/core/InputLabel'
import MenuItem 			from '@material-ui/core/MenuItem'
import FormControl 		from '@material-ui/core/FormControl'
import Select 				from '@material-ui/core/Select'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
})

const TextView = (props) => (
  <FormControl className={props.classes.formControl}>
    <InputLabel htmlFor="my-input">
      {props.label}
    </InputLabel>
    <Select
      value='value'
      inputProps={{
        name: 'input',
        id: 'my-input',
      }}
    >
      <MenuItem value="value">
        {props.value}
      </MenuItem>
    </Select>
  </FormControl>
)

export default withStyles(styles)(TextView)

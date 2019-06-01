import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import TextField 			from '@material-ui/core/TextField'

const styles = theme => ({
  textField: {
    margin: theme.spacing.unit,
    width: 200,
  },
})

const DatePicker = (props) => (
  <TextField
    label={props.label}
    type="datetime-local"
    value={props.value}
    className={props.classes.textField}
    onChange={(e) => props.onChange(e.target.value)}
    InputLabelProps={{
      shrink: true,
    }}
  />
)

export default withStyles(styles)(DatePicker)

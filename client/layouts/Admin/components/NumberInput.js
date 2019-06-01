import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import TextField 			from '@material-ui/core/TextField'

const styles = theme => ({
  textField: {
    margin: theme.spacing.unit,
    // width: 200,
    // flexBasis: 200,
  },
})

const NumberInput = (props) => (
  <TextField
    label={props.label}
    type="number"
    value={props.value}
    className={props.classes.textField}
    onChange={(e) => props.onChange(e.target.value)}
    InputLabelProps={{
      shrink: true,
    }}
  />
)

export default withStyles(styles)(NumberInput)

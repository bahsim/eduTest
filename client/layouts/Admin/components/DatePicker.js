import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import TextField 			from '@material-ui/core/TextField'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing.unit,
    width: 150,
  },
})

const DatePicker = (props) => {
  const { classes, label, value, onChange } = props

  return (
    <TextField
      label={label}
      type="date"
      value={value}
      className={classes.textField}
      onChange={(e) => onChange(e.target.value)}
      InputLabelProps={{
        shrink: true,
      }}
    />
  )
}

export default withStyles(styles)(DatePicker)

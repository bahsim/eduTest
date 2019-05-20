import React, { useState, useEffect } from 'react'
import { cloneDeep } from 'lodash'

import { withStyles } from '@material-ui/core/styles'
import TextField      from '@material-ui/core/TextField'
import Button         from '@material-ui/core/Button'
import Checkbox       from '@material-ui/core/Checkbox'
import AddIcon 			  from '@material-ui/icons/Add'
import DeleteIcon 		from '@material-ui/icons/Delete'
import Divider      	from '@material-ui/core/Divider'

const styles = theme => ({
  textField: {
    marginLeft  : theme.spacing.unit,
    marginRight : theme.spacing.unit,
    width       : '100%',
  },
	button: {
    margin      : theme.spacing.unit/2,
		marginRight : theme.spacing.unit*2,
  },
  icon: {
		marginRight : theme.spacing.unit,
	},
  divider: {
    marginBottom: theme.spacing.unit
  }
})

const LABEL_SAVE 	= 'Сохранить'

interface BaseComponentProps {
  classes: {
    textField : object
    button    : object,
    icon      : object,
    divider   : object,
  },
  question    : string,
  variants    : any,
  onClick     : (data: any) => any,
}

const TestItemInput = (props: BaseComponentProps) => {

  const [ variants, setVariants ] = useState([])

  const addVariant = () => {
    setVariants([...variants, {value: '', mark: false}])
  }

  const setVariantMark = (e, index) => {
    const newVariants = cloneDeep(variants)
    newVariants[index].mark = e.target.checked
    setVariants(newVariants)
  }

  const setVariantValue = (e, index) => {
    const newVariants = cloneDeep(variants)
    newVariants[index].value = e.target.value
    setVariants(newVariants)
  }

  const deleteVariant = (index) => {
    const newVariants = cloneDeep(variants)
    newVariants.splice(index, 1)
    setVariants(newVariants)
  }

  const handleSubmit = (e) => {
		e.preventDefault()

    const question = e.target.question.value.trim()
    if (question === '') return

    for (let i = 0; i < variants.length ; i++) {
      const { value } = variants[i]
      if (value.trim() === '') return
    }

    props.onClick({
      value   : question,
      variants: variants,
    })
	}

  useEffect(() => {
    setVariants(props.variants)
  }, [])

	return (
  	<form onSubmit={handleSubmit} noValidate autoComplete="off">
  		<TextField
  			label={'Вопрос'}
  			name="question"
  			className={props.classes.textField}
        defaultValue={props.question}
  			margin="normal"
  			autoFocus
  		/>
      {variants.map((item, index) => (
        <TextField
          key={index}
          label={`Ответ ${index + 1}`}
    			name={`variant${index + 1}`}
          value={item.value}
          onChange={(e) => setVariantValue(e, index)}
    			className={props.classes.textField}
    			margin="normal"
          InputProps={{
            startAdornment: (
              <Checkbox
                checked={item.mark}
                value=""
                color="primary"
                onClick={(e) => setVariantMark(e, index)}
              />
            ),
            endAdornment: (
              <Button
                className={props.classes.button}
                onClick={() => deleteVariant(index)}
              >
                <DeleteIcon className={props.classes.icon} />
              </Button>
            ),
          }}
    		/>
      ))}
      <Button className	= {props.classes.button} onClick={addVariant}>
        <AddIcon className={props.classes.icon} />
        {'Вариант ответа'}
      </Button>
      <Divider className={props.classes.divider} />
  		<Button
  			type="submit"
  			variant="contained"
  			className={props.classes.button}
  			color="primary"
  		>
  			{LABEL_SAVE}
  		</Button>
  	</form>
	)
}

export default withStyles(styles)(TestItemInput)

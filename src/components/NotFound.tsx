import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import React from 'react'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2)
    },
    bar: {
      display: 'flex',
      marginTop: theme.spacing()
    }
  })
)

const NotFound = () => {
  const classes = useStyles()
  const history = useHistory()

  const handleClick = (): void => {
    history.push('/')
  }

  return (
    <Paper className={classes.paper}>
      <Alert variant='outlined' severity='error'>
        404 Not Found
      </Alert>
      <div className={classes.bar}>
        <div style={{ flexGrow: 1 }} />
        <Button
          variant='contained'
          size='small'
          color='secondary'
          onClick={handleClick}
        >
          返回首页
        </Button>
      </div>
    </Paper>
  )
}

export default NotFound

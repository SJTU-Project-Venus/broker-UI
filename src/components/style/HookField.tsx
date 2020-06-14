import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import React from 'react'

export type XS_SIZE = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface HookFieldProps {
  label: string
  children: any
  labelProps?: { xs?: XS_SIZE }
  fieldProps?: { xs?: XS_SIZE }
}

const HookField: React.FunctionComponent<HookFieldProps> = ({
  label,
  children,
  labelProps,
  fieldProps
}: HookFieldProps) => {

  return (
    <React.Fragment>
      <Grid container alignItems='center'>
        <Grid item xs={labelProps && labelProps.xs ? labelProps.xs : 4}>
          <Typography variant='subtitle2' display='inline'>
            {label}
          </Typography>
        </Grid>
        <Grid item xs={fieldProps && fieldProps.xs ? fieldProps.xs : 8}>
          {children}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default HookField

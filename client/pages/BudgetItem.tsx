/* eslint-disable func-style */
import React from 'react';
import { CssTextField, Grid, InputAdornment, AttachMoneyIcon, UseTheme  } from '../styles/material';

type BudgetItemProps = {
  label: string;
  value?: number;
  onChange?: () => void;
};

const fontColor = {
  style: { color: '#a352ff' },
};


function BudgetItem({ label, value, onChange }: BudgetItemProps): JSX.Element {

  const theme = UseTheme();
  const inverseMode = theme.palette.secondary.main;

  const inputstyle = {
    style: {
      WebkitBoxShadow: `0 0 0 1000px ${inverseMode} inset`,
      "&:-webkit-autofill": {
        WebkitBoxShadow: `0 0 0 1000px #a352ff inset`,
      },
      '-webkit-text-fill-color': '#a352ff',
      color: '#a352ff',
    }
  };

  return (
    <div className="page-body">
    <Grid container sx={{ mt: '20px' }}>
      <Grid item xs={12}>
        <CssTextField
          InputLabelProps={fontColor}
          inputProps={inputstyle}
          color='secondary'
          label={`Enter Your ${label} Budget`}
          variant='outlined'
          value={value}
          onChange={onChange}
          fullWidth
          InputProps={{startAdornment:
            (
              <InputAdornment position="start" sx={{color: '#a352ff'}}>
                <AttachMoneyIcon
                />
              </InputAdornment>
            )}}
        />
      </Grid>
    </Grid>
    <br></br>
    </div>
  );
}
export default BudgetItem;

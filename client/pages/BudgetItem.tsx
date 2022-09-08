/* eslint-disable func-style */
import React from 'react';
import { CssTextField, Grid, InputAdornment, AttachMoneyIcon, UseTheme  } from '../styles/material';

type BudgetItemProps = {
  label: string;
  value?: number;
  onChange?: () => void;
};

const fontColor = {
  style: { color: '#9B27B0' },
};


function BudgetItem({ label, value, onChange }: BudgetItemProps): JSX.Element {

  const theme = UseTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const inputStyle = {
    style: {
      WebkitBoxShadow: `0 0 0 1000px ${inverseMode} inset`,
      "&:-webkit-autofill": {
        WebkitBoxShadow: `0 0 0 1000px #9B27B0 inset`,
      },
      '-webkit-text-fill-color': '#9B27B0',
      color: '#9B27B0',
    }
  };

  return (
    <div className="page-body">
    <Grid container sx={{ mt: '20px' }}>
      <Grid item xs={12}>
        <CssTextField
          InputLabelProps={fontColor}
          inputProps={inputStyle}
          color='secondary'
          label={`Enter Your ${label} Budget`}
          variant='outlined'
          value={value}
          onChange={onChange}
          fullWidth
          InputProps={{startAdornment:
            (
              <InputAdornment position="start" sx={{color: '#9B27B0'}}>
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

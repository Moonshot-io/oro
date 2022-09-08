/* eslint-disable func-style */
import React from 'react';
import { CssTextField, Grid, InputAdornment, AttachMoneyIcon  } from '../styles/material';

type BudgetItemProps = {
  label: string;
  value?: number;
  onChange?: () => void;
};

const fontColor = {
  style: { color: '#9B27B0' },
};

function BudgetItem({ label, value, onChange }: BudgetItemProps): JSX.Element {
  return (
    <div className="page-body">
    <Grid container sx={{ mt: '20px' }}>
      <Grid item xs={12}>
        <CssTextField
          InputLabelProps={fontColor}
          inputProps={fontColor}
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

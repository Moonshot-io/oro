/* eslint-disable func-style */
import React from 'react';
import { CssTextField, Grid } from '../styles/material';

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
    <Grid container sx={{ mt: '20px' }}>
      <Grid item xs={2}>
        <span>{label}</span>
      </Grid>
      <Grid item xs={8}>
        <CssTextField
          InputLabelProps={fontColor}
          inputProps={fontColor}
          color='secondary'
          label={`Enter Your ${label} Budget`}
          variant='outlined'
          value={value}
          onChange={onChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={1}>
        <span>: ${value ?? 0}</span>
      </Grid>
    </Grid>
  );
}
export default BudgetItem;

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText('#a352ff'),
  backgroundColor: '#a352ff',
  '&:hover': {
    backgroundColor: '#a352ff',
  },
}));

export default function CustomizedButtons() {
  return (
    <Stack spacing={2} direction="row">
      <ColorButton variant="contained">Custom CSS</ColorButton>
    </Stack>
  );
}

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function OutlinedButtons({children,onClick}: { children: React.ReactNode, onClick?: () => void}) {
  return (
    <>
      <Button variant="outlined">{children}</Button>
    </>
  );
}
import React from 'react';
import Button from '@mui/material/Button';

export const Btn = (props) => {
    return <Button {...props}>{props.children}</Button>
}


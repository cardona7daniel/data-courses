import React from 'react';
import Button from '@mui/material/Button';

const Btn = (props) => {
    return <Button {...props}>{props.children}</Button>
}

export default Btn;

import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export function SimpleBackdrop(props) {
  const { open = false } = props;
  const [isOpened, setOpen] = useState(false);

  useEffect(() => {
    setOpen(open);
  }, [open])

  return (
    <Backdrop
      sx={{ color: '#027373', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isOpened}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

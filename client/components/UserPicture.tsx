import React, { useState } from 'react';
import Comments from './Comments';
import { Grid, Box, ImageListItem, CloseRoundedIcon, Dialog, DialogContent, AppBar, Toolbar, Slide, IconButton } from '../styles/material';
import { useTheme} from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserPicture: React.FC = ({ photo }) => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ImageListItem>
        <img
          src={`${photo.photoUrl}?w=100&h=100&fit=crop&auto=format`}
          srcSet={`${photo.photoUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          alt=""
          onClick={handleOpen}
        />
      </ImageListItem>
      <Dialog 
        open={open}
        onClose={handleClose} 
        TransitionComponent={Transition}
        sx={{ bgcolor: inverseMode, colors: inverseMode }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="end"
              color="secondary"
              onClick={handleClose}
              aria-label="close"
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: "secondary",
              }}
            >
              <CloseRoundedIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Box sx={{ margin: 'auto', bgcolor: inverseMode, width: 350, alignItems: 'center', justifyContent: 'center' }}>
            <img width='300px' height='auto' margin='auto' src={photo.photoUrl}/>
            <Grid container>
              <Comments photo={photo} />
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UserPicture;
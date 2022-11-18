import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { NavLink } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function BasicModal(props) {
  const [open] = React.useState(true);
  const handleClose = () => {
    props.catchClose(false)
  } 

  return (
    <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
        >
          <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                  {props.errorMessage}
                  {(props.errorMessage === 'Inloggad' || props.errorMessage === 'Filmen är skapad') ? <NavLink to={`/movies`}
                  state={{weAreIn: 'weAreIn'}}
                  ><br/>Gå till filmlistan</NavLink> :
                  <div>
                  <br/>
                  <NavLink to={`/login`}>Logga in</NavLink>
                  <br/>
                  <NavLink to={`/signUp`}>Skapa nytt konto</NavLink>
                  
                  </div>
                  }
              </Typography>
              
          </Box>
        </Modal>
    </div>
  );
}

export default BasicModal;
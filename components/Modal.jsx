import React, { Component, useEffect } from 'react';
import Slide from '@material-ui/core/Slide';
import { Snackbar } from '@material-ui/core';
import styles from './../styles/Home.module.css'
import { useState } from 'react';


function SlideTransition(props) {
  return <Slide {...props} direction="" />;
}
const MySnackbar = ({setOpen, message, open}) => {
     
    const [transition, setTransition] = useState(Slide)
    useEffect(() => {
        setTimeout(() => {
            setOpen(false)
        }, 3000);
    })

    const handleClose= () => {
    setOpen(false)
  };
    return ( 
          <Snackbar
          className={styles.my_snack}
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        message={message}
        key={transition}
      />
     );
}
 
export default MySnackbar;
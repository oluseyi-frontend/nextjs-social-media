import styles from "./../styles/Navbar.module.css";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { Menu, Container} from "semantic-ui-react";
import { useEffect, useState, useContext } from "react";
import {useRouter} from 'next/router'
import { DataCentral } from "./Context";



const Navbar = () => {
  const [activeItem, setActiveItem] = useState('')
  const router = useRouter()
const {token, settingToken} = useContext(DataCentral)

  
  // useEffect(() => {
  // setActiveItem(router.pathname)
  // }, [activeItem])
  


  
  const handleItemClick = () => {
    // console.log(router.pathname)
    // setActiveItem(router.pathname)
  }

  const handleLogout = () => {
    
settingToken(undefined, undefined)
  }
  
  return (
     <Container className={styles.my_navbar}>
      <Menu pointing secondary>
        <Link href='/'>
         <Menu.Item
            name='home'
            active={activeItem === '/'}
            onClick={handleItemClick}
          />
        </Link>
         
          
        <Menu.Menu position='right'>
          {
            token ?   <Link href='/' >
                <Menu.Item
                name='logout'
                active={activeItem === '/'}
                  onClick={handleLogout}
               />
                </Link>:
              <>
                <Link href='/login'>
                <Menu.Item
                name='login'
                active={activeItem === '/login'}
                  onClick={handleItemClick}
               />
                </Link>
            
             <Link href='/register'>
                <Menu.Item
                name='register'
                active={activeItem === '/register'}
                  onClick={handleItemClick}
               />
                </Link>
          </>
          }
         
          </Menu.Menu>
        </Menu>
  </Container>
    
  );
};

export default Navbar;

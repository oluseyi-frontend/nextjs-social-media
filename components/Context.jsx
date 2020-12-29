import React from 'react'
import { useState } from 'react';

export const DataCentral = React.createContext()

const SocialMediaContext = (props) => {
    const [token, setToken] = useState('')
    const [username, setUsername] = useState('')
   
    const settingToken = (data, username) => {
        setToken(data)
        setUsername(username)
    
    }


    return ( 
        <DataCentral.Provider value={{
            settingToken,
            token,
            username
        }}>
            {props.children}
        </DataCentral.Provider>
     );
}
 
export default SocialMediaContext;   
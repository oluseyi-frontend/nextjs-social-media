
import jwt from 'jsonwebtoken'

const verify = (token) => {

  if (token) {
    const authcode = token.split()
    
    
    if (authcode) {
      try {
        const user = jwt.verify(authcode[0], process.env.SECRET_KEY);
       
          return user;
      } catch (error) {
        console.log(error)
      }
    
    } 


  } else {
    console.log("please input token");
  }
};

module.exports = verify;




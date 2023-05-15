const { pool } = require('../../connection/postgresql');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
require('dotenv').config();
const config = require('../../config/config');

const {ACCESS_TOKEN_SECRET} = config


const getUser = async(req, res) => {
    let query = await `SELECT * FROM users`;
    pool.query(query, (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows);
    })
} 


const loginUser =  (req, res) => {
    const { email, password } = req.body;
  
    const query = {
      text: 'SELECT * FROM users WHERE email = $1 and password = $2',
      values: [email,password]
    }
  
    pool.query(query, (err, result) => {
      if (err) {
        console.log(err.stack)
      } else {
        const user = result.rows[0];
        if (!user) {
          return res.status(401).json({
            message: 'User Not Found'
          });
        }
        console.log('pass',password)
        console.log('passus',user.password)
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.log(err);
          }
        //   if (!isMatch) {
        //     return res.status(401).json({
        //       message: 'Incorrect Password'
        //     });
        //   }
        const accessToken = jwt.sign({email,password}, ACCESS_TOKEN_SECRET);
        
        res.status(200).json({ accessToken ,message:'Login successfull'})
              
        });
      }
    });
       
}



  
  
  
  
  


  
    
  


const createUser = async(req,res)=>{
  
  console.log(req.body)
    const {username,contact_no,email,password} = req.body;


    try{
        
     const query = await `INSERT INTO users (username, contact_no,email,password) VALUES ('${username}', '${contact_no}', '${email}', '${password}') `;
     pool.query(query, (error, result) => {
         console.log(result);
         if (error) {
             res.status(500).json("server error")           
         }    
         const accessToken = jwt.sign(req.body, ACCESS_TOKEN_SECRET);
         res.status(200).json({ accessToken }); 
        //  res.status(200).json(result.rows[0])
     })
 
    }catch(error){
     console.log(error);
    }
 }



const updateUser = async(req, res) => {
    const { username,contact_no,email,password } = req.body;
    const query = await `UPDATE users SET (username, contact_no, email, password) = ('${username}', '${contact_no}', '${email}', '${password}') WHERE user_id = '${req.params.id}'`;
    pool.query(query, (error, result) => {
        console.log(query);
        if (error) {
            throw error
        }
        res.status(200).json(req.body)
    })
}


const deleteUser = async(req, res) => {  
    const query = await `DELETE FROM users WHERE user_id = '${req.params.id}'`;
    pool.query(query,(error, result) => {
        console.log(query);
        if (error) {
            throw error
        }
        res.status(200).json({message:"record deleted"})
    })
}



  
   

  



module.exports = { getUser,createUser,updateUser,deleteUser,loginUser };
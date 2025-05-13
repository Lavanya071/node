const express=require('express')
const UserRouter=express.Router();

const { createUserHandler,deleteUserById,getUserById,getUsers }=require('../controller/UserController')
function checkInput(req, res, next) {
    if (req.method === 'POST' && Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Request body cannot be empty',
      });
    }
    next();
  }
  

UserRouter.post('/', checkInput, createUserHandler);
UserRouter.get('/', getUsers);
UserRouter.get('/:userId', getUserById);
UserRouter.delete('/:userId', deleteUserById);

module.exports = UserRouter; 
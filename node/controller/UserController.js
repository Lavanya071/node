const userModel=require('../model/ProductModel'); 


const {createFactory,deleteByIdFactory,getByIdFactory,getAllFactory}=require('../utility/crudFactory'); 

const createUserHandler = createFactory(userModel);
const deleteUserById = deleteByIdFactory(userModel);
const getUserById = getByIdFactory(userModel);
const getUsers = getAllFactory(userModel);
module.exports={
    createUserHandler,deleteUserById,getUserById,getUsers 
}
const ProductModel=require('../model/ProductModel'); 

const {createFactory,getByIdFactory,getAllFactory,deleteByIdFactory}= require('../utility/crudFactory'); 


const createProductHandler = createFactory(ProductModel);
const getProductById = getByIdFactory(ProductModel);
const getProducts = getAllFactory(ProductModel);
const deleteProductById = deleteByIdFactory(ProductModel);

module.exports={
    getProducts,getProductById,createProductHandler,deleteProductById 
}
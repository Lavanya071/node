const express=require('express')
const ProductRouter=express.Router();


const { getProducts,getProductById,createProductHandler,deleteProductById }= require('../controller/ProductController'); 
function checkInput(req, res, next) {
    if (req.method === 'POST' && Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Request body cannot be empty',
      });
    }
    next();
  }
  


  const getAllProducts = async function(req, res) {
    try{

      let query = req.query;
      let selectQuery= query.select; 
      let sortQuery=query.sort;
      let queryResProm=ProductModel.find();
      if (sortQuery){
        let order=sortQuery.split(" ")[1];
        let sortParam=sortQuery.split(" ")[0];
        if (order=="inc"){
          queryResProm= queryResProm.sort(sortParam);
  
        }else{
          queryResProm=queryResProm.sort(-sortParam)
        }
      }if (selectQuery){
        queryResProm=queryResProm.select(selectQuery);
      }
      const result=await queryResProm;
      res.status(200).json({
        message:result, 
        status:"success"
      })
  
    }
  catch (error) {
      res.status(500).json({
        message: 'An error occurred while retrieving products',
        status: 'error',
        error: error.message
      });
    }
  }

ProductRouter.post('/', checkInput, createProductHandler);
ProductRouter.get('/', getProducts);
ProductRouter.get('/:productId', getProductById);
ProductRouter.delete('/:productId', deleteProductById);
module.exports=ProductRouter;


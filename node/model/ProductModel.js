const mongoose=require('mongoose'); 

const newSchemaRules={
  name:{
    type:String,required:[true, "Kindly pass name"],
    unique:[true, "product name should be unique"],
    maxlength:[40,"Your Product name length is more"] 
  },
  categories: {
    type: [String],
    required: true,
  },
  
  
  productImages:{type:String},
  averageRating:Number,
  price: {
    type: Number,
    required: [true, 'Kindly pass price'],
    min: [0, 'Price cannot be negative'],
  },
  discountedPrice: {
    type: Number,
    validate: {
      validator: function (v) {
        return v < this.price;
      },
      message: 'Discount must be less than actual price',
    }
  },
   description:{
    type:String,
    required:[true,'kindly add'],
    maxlength:[2000,"description not big"]
  }
  ,stock_quantity: {
    type: Number,
    required: [true, 'You should enter stock quantity'],
    min: [0, 'Stock quantity cannot be negative'],
  }
  ,brand:{
    type:String,required:[true,"enter it"]  
   }
  }
const productSchema=new mongoose.Schema(newSchemaRules);


let validateCategory=["Electronics","Audio","Clothing","Accessories"]; 
productSchema.pre("save",function(next){
  const product=this;
  const invalidCategories = product.categories.filter((cat)=>{return !validateCategory.includes(cat)});
  if (invalidCategories.length>0){
    const err = new Error("products from these categories are not allow"); 
    return next(err);
  }else{
    next(); 
  }
})

const ProductModel=mongoose.model("newProductModels",productSchema); 
// ... rest of your Express app setup ...
module.exports=ProductModel;

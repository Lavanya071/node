const getAllFactory=function(Model) {
    return async (req, res) => {
      try {
        const elementDetails = await Model.find();
        if (elementDetails.length === 0) {
          throw new Error('No records found');
        }
        res.status(200).json({ status: 'success', elementDetails });
      } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
      }
    };
  }
  const createFactory=function(Model){
    return async (req, res) => {
        try {
          const element = await Model.create(req.body);
          res.status(200).json({ status: 'success', data: element });
        } catch (err) {
          res.status(500).json({ status: 'error', message: err.message });
        }
      };
  }
  const getByIdFactory = function(Model) {
    return async (req, res) => {
      try {
        const id = req.params.userId || req.params.productId;
        const elementDetails = await Model.findById(id);
        if (!elementDetails) {
          return res.status(404).json({
            status: 'fail',
            message: `${Model.modelName} not found`,
          });
        }
        res.status(200).json({ status: 'success', data: elementDetails });
      } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
      }
    };
  };
  
  const deleteByIdFactory = function(Model) {
    return async (req, res) => {
      const id = req.params.userId || req.params.productId;
      try {
        const element = await Model.findByIdAndDelete(id);
        if (!element) {
          return res.status(404).json({
            status: 'fail',
            message: `${Model.modelName} not found`,
          });
        }
        res.status(200).json({ status: 'success', data: element });
      } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
      }
    };
  };
  
  module.exports={getAllFactory,createFactory,getByIdFactory,deleteByIdFactory}
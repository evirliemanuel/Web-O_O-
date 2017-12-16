const express = require('express');
const router = express.Router();

router.get('/',(request, response, next)=>{
    response.status(200).json({
        message:'Handling GET request to /products'
     
    });
});

router.post('/',(request, response, next)=>{
    const product = {
        name: request.body.name,
        price: request.body.price
    };
    response.status(201).json({
        message:'Handling POST request to /products',
        createdProduct : product
    });
});

router.get('/:productID',(request, response, next)=>{
    const id = request.params.productID;
    if (id === 'special'){
    response.status(200).json({
        message:'Your discovered the special ID',
        id: id
    });
}else{
    response.status(200).json({
        message : 'Yoy passes an ID'
    });
}
});

router.patch('/:productID',(request, response, next)=>{
    response.status(200).json({
        message : 'Updated products!'
    });
});

router.delete('/:productID',(request, response, next)=>{
    response.status(200).json({
        message : 'Deleted products!'
    });
});



module.exports = router;
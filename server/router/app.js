const express = require('express');

const multer = require('multer');

const router = express.Router();

const Product = require("../model/productSchema");


const Storage = multer.diskStorage({ 
    destination:'./uploads' ,
    filename: (req,file,cb)=>{
        cb(null, file.originalname)
    }
})

var upload = multer({
    storage:Storage
}).single('Image')


//Post Api's--->
router.post('/save',upload, (req, res,next) =>{

    const file = req.file
    const Img = file.filename;
    console.log(file)
    
    const {Name , UnitPrice, TotalAmount, Date, Quantity, Status} = req.body;


    
    if(!Name || !UnitPrice || !TotalAmount || !Date || !Quantity || !Status){
        res.status(422).json({ error: "please fill all the fields"});
    }


    const pro = new Product({Name, UnitPrice, TotalAmount, Date, Quantity,Image:Img, Status});

    pro.save().then(() =>{
        res.status(201).json({ message: "data saved in DB"})
    }).catch((err) => res.status(500).json({error: "data not saved in database"}))
})


//Get Api's ---->
router.get('/getData', (req, res) =>{

    Product.find((err, result) =>{
        if(err){
            console.log('Connection Failed')
        }else{
            res.status(200).json(result)
        }
    })


});

router.get('/paidstatus',async (req, res) =>{
  
     const results =   await Product.find(
        {
            Status: 'Paid'

        },
        {
           _id:0, __v:0
        }
        );
        res.status(200).json(results)

})

router.get('/unpaidstatus',async (req, res) =>{
  
    const results =   await Product.find(
       {
           Status: 'Unpaid'

       },
       {
          _id:0, __v:0
       }
       );
       res.status(200).json(results)

})

router.get('/getdatabyDate/:Date',(req, res) =>{

    const date = req.params.Date;
  
 Product.find(
    {
        Date: date,
        Status: 'Paid'
    },
    {
        Name:1, TotalAmount:1, Image:1, Status:1, Date:1, Quantity:1
    }
    ).then(result =>{
        res.status(200).json(result)
    }).catch(err =>{
        console.log(err);
        res.status(500).json({message: "Not succeed"})
    })

})

router.get('/getdatabyDateQauntity/:Date',async (req, res) =>{

    const date = req.params.Date;
  
var result = await Product.find(
    {Date: date,Status: 'Paid'},
    {Name:1,Quantity:1,Image:1, UnitPrice:1}
    ).select({Quantity: 1})
    .sort({Quantity:-1}).limit(5).then(result =>{
        res.status(200).json(result)
    }).catch(err =>{
        console.log(err);
        res.status(500).json({message: "Not succeed"})
    })

})

router.get('/getdataById/:id',(req, res) =>{

    const Id = req.params.id;
    console.log(Id);
  
 Product.find(
    {
        _id: Id
       
    },
    {
        __v:0
    }
    ).then(result =>{
        res.status(200).json(result)
    }).catch(err =>{
        console.log(err);
        res.status(500).json({message: "Not succeed"})
    })

})

//Delete Api's ---->
router.delete('/deleteById/:id', (req, res, next) =>{
  
    const Id = req.params.id;
    console.log(Id)

    Product.deleteOne({_id:Id}, (err, result) =>{
        if(err){
            return next(err)
        }else{

            res.status(200).json({message: "successfully"})
        }
    })


})


router.delete('/deleteAll', (req, res, next) =>{
  
    Product.deleteMany((err, result) =>{
        if(err){
            return next(err)
        }else{

            res.status(200).json({message: "All Data Deleted Successfully"})
        }
    })


})


//Update Api ---->
router.put('/updateData/:id',upload, (req, res, next) =>{

    const Id = req.params.id;
    console.log(Id);

    const file = req.file
    const Img = file.filename;
    console.log(file)


  
 Product.updateMany(
    {
        _id: Id
    },
    {
        $set: {
            Name: req.body.Name,
            UnitPrice: req.body.UnitPrice,
            Quantity: req.body.Quantity,
            TotalAmount: req.body.TotalAmount,
            Date: req.body.Date,
            Image: Img,
            Status: req.body.Status
        }
    }

    ).then(result =>{
        res.status(200).json(result)
    }).catch(err =>{
        console.log(err);
        res.status(500).json({message: "Not succeed"})
    })

})


module.exports = router;
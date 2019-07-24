const express= require("express");
const multer= require("multer");
const ejs=require("ejs");
const path= require("path");


//set storage engine with multer
const storage=multer.diskStorage({
    destination:'./public/uploads/',
    filename: function(req,file,cb){
        cb(null,file.fieldname+ '-'+Date.now()+path.extname(file.originalname))
    }
});


//init upload variable
const upload=multer({
    storage:storage,
    limits:{fileSize:1000000},
    fileFilter:function(req,file,cb){
        checkFileType(file,cb)
    }
}).single('image');

function checkFileType(file,cb){
    // Allowed extensions 
    const filetypes= /jpeg|jpg|png|gif/;
    //check ext
    const extname= filetypes.test(path.extname(file.originalname).toLowerCase());

    //check the mime type
    const mimetype= filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    }
    else{
        cb('Error: Images Only');
    }
}



const app= express();


app.set('view engine','ejs');

//public folder
app.use(express.static('./public'));


app.get('/',(req,res)=>{
    res.render('index.ejs')
});


app.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            res.render('index.ejs',{
                msg:err
            })
        }
        else{
            if(req.file== undefined){
                res.render('index.ejs',{
                    msg:'ERROR:NO FILE SELECTED'
                });
            }
            else{
                res.render('index.ejs',{
                    msg:'File Uploaded',
                    file:`uploads/${req.file.filename}`
                })
            }
        }
    })

})







const port=8000;
app.listen(port,()=>{
    console.log(`POrt started on ${port}`);
});
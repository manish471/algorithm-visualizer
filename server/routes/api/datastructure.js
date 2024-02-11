const router = require("express").Router();
const isdatastructure = require('../helper/isDatastructure');
const Code = require('../../models/Code');



//Identify Datastructures and send ouput
router.get('/isDatastructure/',(req,res,next)=>{


    Code.findOne({$or: [{ googleID: req.user.googleID }, { githubID: req.user.githubID }],_id:req.user.code})
    .then(data=>{
        
        const code  = data.code;

        const {_identifier} = req.query;
        let isDatastructure = false
        
        try{
            isDatastructure = isdatastructure(code,_identifier);
        }catch(err){
            console.log('error : '+err);
        }
        

        res.status(200).json({isDatastructure,_identifier});
    })

    
});


module.exports = router;
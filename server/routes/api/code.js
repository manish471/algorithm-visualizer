const router = require("express").Router();
const User = require('../../models/User');
const Code = require('../../models/Code');



router.get('/',async (req,res,next)=>{

    let {lang} = req.query;
        
    Code.findOne({$or: [{ googleID: req.user.googleID }, { githubID: req.user.githubID }],_id:lang === 'Javascript'?req.user.code_js:req.user.code_py})
            .then(data=>{
                res.status(200).json({data,error:null});
            })
            .catch(err=>{
                res.status(200).json({data:null,error:"Invalid code id!!!"});
            })

    
});

router.get('/list',async (req,res,next)=>{

    let {lang} = req.query;
    
    Code.find(req.user.googleID?{ googleID: req.user.googleID,language:lang }: { githubID: req.user.githubID,language:lang })
            .then(data=>{
                res.status(200).json({data,error:null});
            })
            .catch(err=>{
                res.status(200).json({data:null,error:"Invalid code id!!!"});
            })

    
});

router.post('/newCode',async (req,res,next)=>{

    const {title,lang} = req.body;

    let code="// write your code here\nconsole.log('Hello');\nconsole.log('Coder');\nconsole.log('Welcome to algorithm visualizer');";
    let pyCode = "# write your code here\nprint('Hello');\nprint('Coder');\nprint('Welcome to algorithm visualizer');";

    if(req.user.googleID){
        defaultCode = new Code({code:lang === 'Javascript'?code:pyCode,title,googleID:req.user.googleID,language:lang});
    }else{
        defaultCode = new Code({code:lang === 'Javascript'?code:pyCode,title,githubID:req.user.githubID,language:lang});
    }

    defaultCode.save().then(newCode=>{
        console.log("new code saved");
        res.status(200).json({newCode,error:null});
    }).catch(err=>{
        res.status(200).json({newCode:null,error:"Invalid code id!!!"});
    })
    
});

router.post('/currentCode',async (req,res,next)=>{

    const {code_id,lang} = req.body;

    User.updateOne(req.user.googleID?{ googleID: req.user.googleID }: { githubID: req.user.githubID },{$set:lang === 'Javascript'?{code_js:code_id}:{code_py:code_id}})
    .then(data=>{
        console.log(data,code_id);
        Code.findOne(req.user.googleID?{ googleID: req.user.googleID,_id:code_id }: { githubID: req.user.githubID,_id:code_id })
            .then(currentCode=>{
                res.status(200).json({currentCode});
            })
            .catch(err=>{
                res.status(200).json({updated:false})
        })

    })
    .catch(err=>res.status(200).json({updated:false}))

    

    
});

router.delete('/delete/',async (req,res,next)=>{

    const {code_id,lang} = req.query;

    Code.findOne(req.user.googleID?{ googleID: req.user.googleID,defaultCode:true,language:lang }: { githubID: req.user.githubID,defaultCode:true,language:lang })
        .then(currentCode=>{
            User.updateOne(req.user.googleID?{ googleID: req.user.googleID }: { githubID: req.user.githubID },{$set:lang === 'Javascript'?{code_js:currentCode._id}:{code_py:currentCode._id}})
            .then(data=>{
                Code.deleteOne({_id:code_id})
                .then(data=>res.status(200).json({deleted:true,currentCode}))
                .catch(err=>res.status(200).json({deleted:false,currentCode}))
            })
            .catch(err=>console.log(err))
        })
        .catch(err=>{
            console.log(err);
        })
    

    
    
});

router.post('/autosave',async (req,res,next)=>{

    const {code,lang} = req.body;
    Code.updateOne({$or: [{ githubID: req.user.githubID },{googleID: req.user.googleID}],_id:lang === 'Javascript'?req.user.code_js:req.user.code_py},{$set:{code:code}})
    .then(data=>res.status(200).json({saved:true}))
    .catch(err=>res.status(200).json({saved:false}))

    
    
});

router.post('/setDSInfo',async (req,res,next)=>{

    const {ds,lang} = req.body;
    
    Code.updateOne({$or: [{ githubID: req.user.githubID },{googleID: req.user.googleID}],_id:lang === 'Javascript'?req.user.code_js:req.user.code_py},{$set:{dsStringValue:ds.str,datastructures:ds.datastructures}})
    .then(data=>res.status(200).json({saved:true}))
    .catch(err=>res.status(200).json({saved:false}))

    
    
});


module.exports = router;
const router = require("express").Router();
const transpiler = require('../helper/transpiler');
const sandbox = require("../helper/sandbox");
const input = { _name: null, references: {} }
const Code = require('../../models/Code');
const { spawn } = require("child_process");



//Transpile code and send ouput
router.get('/js',(req,res,next)=>{

    let { code_id } = req.query;

    if (!req.user) {
        req.user = {
            googleID: 'public',
            githubID: 'public',
            code_js: code_id?code_id:'65cd0acdb4db858f5855d6a5'
        }
    }

    Code.findOne({$or: [{ googleID: req.user.googleID }, { githubID: req.user.githubID }],_id:req.user.code_js})
    .then(data=>{
        
        const code  = data.dsStringValue + data.code;

        console.log("code Fetched!!!",code);
        let transpiledCode,metaData = null;
        
        try{
            transpiledCode = transpiler(code,input);
    
            console.log(transpiledCode);
    
            const { _name } = input;
    
            console.log(_name+"*");
    
            metaData = sandbox(_name,transpiledCode,code);
        }catch(err){
            console.log('error : '+err);
        }
        
    
        res.status(200).json({"metaData":metaData});
    })
    
    
});


router.get('/py',async (req,res,next)=>{

    let code = "";

    await new Promise((resolve, reject) => {
        Code.findOne({$or: [{ googleID: req.user.googleID }, { githubID: req.user.githubID }],_id:req.user.code_py})
        .then(data=>{
            
            code  = data.dsStringValue + data.code;

            console.log("code Fetched!!!",code);

            resolve();
            
        });
    })

    let metaData = null;
        
    const result = {
        stdout:"",
        stderr:"",
    };
    
    await new Promise((resolve, reject) => {
        const output = spawn('python', ['./server/routes/helper/python/main.py',code]);
        let out = "";
        let err = "";
        output.stdout.on("data", data => {
            console.log(`stdout: ${data}`);
            out += data.toString();
        });
    
        output.stderr.on("data", data => {
            console.log(`stderr: ${data}`);
            err += data.toString();
        });
    
        output.on('error', (error) => {
            console.log(`error: ${error.message}`);
            reject(error);
        });
    
        output.on("close", code => {
            console.log(`child process exited with code ${code}`);
            result.stdout = out;
            result.stderr = err;
            resolve();
        });
    })
    

    res.status(200).json({"metaData":result.stdout});

    
});

module.exports = router;
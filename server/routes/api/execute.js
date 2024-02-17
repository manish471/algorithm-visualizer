const router = require("express").Router();
const fs = require('fs');
const { spawn } = require("child_process");
const User = require('../../models/User');
const Code = require('../../models/Code');



//Execute code and send ouput
router.post('/',async (req,res,next)=>{

    const {code,language} = req.body;
    
    let cmd = "node";
    let fileName = "/tmp/test.js"

    if(language === "Python"){
        cmd = "python"
        fileName = "test.py";
    }

    console.log("code Fetched!!!",code);


    await new Promise((resolve, reject) => {
        fs.writeFile(fileName, code , (err) => {
            if (err){
                reject(err);
            }
            console.log('File saved!');
            resolve();
        });
    })

    

    const result = {
        stdout:"",
        stderr:"",
    };

    await new Promise((resolve, reject) => {
        const output = spawn(cmd, [fileName]);
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

    await new Promise((resolve, reject) => {
        fs.unlink(fileName, (err) => {
            if(err)
                reject(err);                
            console.log('File deleted ...');
            resolve();
        });
    })
    
    console.log(result);


    

    res.status(200).json({"output":result});
});


module.exports = router;
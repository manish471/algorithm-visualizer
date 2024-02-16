if (process.env.NODE_ENV !== 'production') { 
      require('dotenv').config(); 
} 
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const GithubStrategy = require("passport-github2");
const mongoose = require("mongoose");

const User = mongoose.model("User");
const Code = mongoose.model("Code");

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then(user=>done(null,user));
})

//passport for google auth
passport.use(
    new GoogleStrategy({
        callbackURL:'/api/auth/google/callback',
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        scope: ["profile", "email"],
        proxy: true,
    },
    (accessToken, refreshToken, profile, done)=>{
        // console.log(profile);
        const newUser = {
            googleID: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            userPhoto:profile.photos[0].value,
            metaData:null
        };

        User.findOne({$or: [{ googleID: profile.id }, { email: profile.emails[0].value }]})
            .then(currentUser=>{
                if(currentUser){
                    // If user already exists in db
                    console.log('already exist');
                    done(null,currentUser);
                }else{
                    let code="// write your code here\nconsole.log('Hello');\nconsole.log('Coder');\nconsole.log('Welcome to algorithm visualizer');";
                    defaultCode = new Code({code,googleID:profile.id,defaultCode:true});

                    defaultCode.save().then(newCode=>{
                        console.log("new code saved");
                        newUser.code_js = newCode._id;

                        let pyCode = "# write your code here\nprint('Hello');\nprint('Coder');\nprint('Welcome to algorithm visualizer');";
                        let pythonDefaultCode = new Code({code:pyCode,googleID:profile.id,defaultCode:true,language:'Python'});
                        pythonDefaultCode.save().then(newCode=>{
                            console.log("new py code saved");
                            newUser.code_py = newCode._id;
                            user = new User(newUser);
                            user.save().then(newUser=>{
                                console.log("new user created");
                                done(null,newUser);
                            })
                        })

                        

                    })

                    

                    
                }
            })

        
    }
));

//passport for github auth
passport.use(
    new GithubStrategy({
        callbackURL:'https://algovis.onrender.com/api/auth/github/callback',
        clientID:process.env.GITHUB_CLIENT_ID,
        clientSecret:process.env.GITHUB_CLIENT_SECRET,
        scope: ['user:email'],
    },
    (accessToken, refreshToken, profile, done)=>{
        // console.log(profile);
        const newUser = {
            githubID: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            userPhoto:profile.photos[0].value,
            metaData:null
        };

        User.findOne({$or: [{ githubID: profile.id },{email: profile.emails[0].value}]})
            .then(currentUser=>{
                if(currentUser){
                    // If user already exists in db
                    console.log('already exist');
                    done(null,currentUser);
                }else{
                    let code="// write your code here\nconsole.log('Hello');\nconsole.log('Coder');\nconsole.log('Welcome to algorithm visualizer');";
                    defaultCode = new Code({code,githubID:profile.id,defaultCode:true});

                    defaultCode.save().then(newCode=>{
                        console.log("new js code saved");
                        newUser.code_js = newCode._id;

                        let pyCode = "# write your code here\nprint('Hello');\nprint('Coder');\nprint('Welcome to algorithm visualizer');";
                        let pythonDefaultCode = new Code({code:pyCode,githubID:profile.id,defaultCode:true,language:'Python'});
                        pythonDefaultCode.save().then(newCode=>{
                            console.log("new py code saved");
                            newUser.code_py = newCode._id;
                            user = new User(newUser);
                            user.save().then(newUser=>{
                                console.log("new user created");
                                done(null,newUser);
                            })
                        })

                        

                    })

                    
                }
            })

        
    }
));

module.exports = passport;
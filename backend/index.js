const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const UserModel = require('./models/user')
const pdf = require('pdf-parse')
const multer = require("multer")

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(cookieParser())

mongoose.connect('mongodb://************/pdf');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const varifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json("Token is missing")
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json("Error with token")
            } else {
                if(decoded.role === "admin") {
                    next()
                } else {
                    return res.json("not admin")
                }
            }
        })
    }
}

app.post('/signup', (req, res) => {
    const {name, email, password} = req.body;
    bcryptjs.hash(password, 10)
    .then(hash => {
        UserModel.create({name, email, password: hash})
        .then(user => res.json("Success"))
        .catch(err => res.json(err))
    }).catch(err => res.json(err))
})

app.post('/Login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user) {
            bcryptjs.compare(password, user.password, (err, response) => {
                if(response) {
                  const token = jwt.sign({email: user.email, role: user.role},
                        "jwt-secret-key", {expiresIn: '1d'})  
                    res.cookie('token', token)
                    return res.json({Status: "Success", role: user.role})
                }else {
                    return res.json("The password is incorrect")
                }
            })
        } else {
            return res.json("No record existed")
        }
    })
})

app.post('/Home', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const userName = req.body.userName;

    pdf(userUploadedFile.buffer).then((data) => {
        const numPages = data.numpages;

        res.json({ userName,numPages});
    });    
});


app.listen(3001, () => {
    console.log("Server is Running")
})

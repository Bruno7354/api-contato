const express = require('express')
const nodemailer = require('nodemailer')
const app = express()
const cors = require('cors')

require('dotenv').config();


app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


app.post('/send', (req, res) =>{

let email = req.body.email;
let UserName = req.body.UserName;
let message = req.body.message;
let subject = req.body.subject;

transporter.sendMail({
    
    from: process.env.EMAIL_USER,
    to: "atendimentosifet@gmail.com", 
    replyTo: email,
    subject: subject,
    text: message + "                             De: " + email + 
       "  Nome: " + UserName,
}).then(info=>{
    console.log(info);
    res.send("Email enviado com sucesso!")
}).catch(error=>{
    console.log(error);
    res.send("Ocorreu um erro")
})

})

app.listen(3000, () =>{
    console.log("running on 3000")
})

const express = require('express')

const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    return res.json({message:"im in home page"})
})

app.listen(3333)
const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(express.json())

//to save data information
const costumers = []

app.post('/account',(req,res)=>{
    const { cpf, name } = req.body
    const id = uuidv4()
    console.log(id)

    //this will be save data from body
    costumers.push({
        cpf,
        name,
        id,
        statements:[]
    })

    return res.status(201).send()
})

app.listen(3333)
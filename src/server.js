const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(express.json())

//to save data information
const costumers = []

app.post('/account',(req,res)=>{
    const { cpf, name } = req.body

    //find in arrays of costumers have same cpf
    const customerAlreadyExists = costumers.some(
        (customer) => customer.cpf === cpf)
    
        //if customer already exists, show message and error
    if(customerAlreadyExists){
        return res.status(400).json({error:"customer already exists!!!"})
    }

    //this will be save data from body
    costumers.push({
        cpf,
        name,
        id:uuidv4(),
        statements:[]
    })

    return res.status(201).send()
})

app.listen(3333)
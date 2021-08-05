const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(express.json())

//to save data information
const customers = []


/**
 *important*
 *all routes bolow will use this middleware
 *maybe can use to show error?
*/
//app.use(verifyAccountExist)

//verify Account Exist with cpf in header
function verifyAccountExist(req, res, next) {
    //get cpf from params
    const { cpf } = req.headers
    //find and return cpf from customers array
    const customer = customers.find(customer => customer.cpf === cpf)

    if (!customer) {
        return res.status(400).json({ error: "customer not found" })
    }
    //
    req.customer = customer
    return next()

}

app.post('/account', (req, res) => {
    const { cpf, name } = req.body

    //find in arrays of customers have same cpf
    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf)

    //if customer already exists, show message and error
    if (customerAlreadyExists) {
        return res.status(400).json({ error: "customer already exists!!!" })
    }

    //this will be save data from body
    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    })

    return res.status(201).send()
})

app.get('/statement', verifyAccountExist, (req, res) => {
    const { customer } = req
    return res.json(customer.statement)
})

app.listen(3333)
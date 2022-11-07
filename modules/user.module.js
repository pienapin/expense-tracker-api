const prisma = require('../helpers/database')
const Joi = require('joi')
const bcrypt = require('bcrypt')

class _user {

    UMasukUser = async (body) => {
    try {
            // Validation input
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const password = bcrypt.hashSync(body.password, 10)
            console.log(body.password, password)

            // nama, email, password
            const add = await prisma.user.create({
                data: {
                    email: body.email,
                    name: body.name,
                    password: password
                }
            })

            return {
                status: true,
                data: add
            }
            
        } catch (error) {
            console.error('createUser user module Error: ', error)

            return {
                status: false,
                error: error.message
            }
        }
    }

    UKeluarUser = async (body) => {
        try {
                // Validation input
                const schema = Joi.object({
                    name: Joi.string().required(),
                    email: Joi.string().required(),
                    password: Joi.string().required()
                })
    
                const validation = schema.validate(body)
    
                if (validation.error) {
                    const errorDetails = validation.error.details.map(detail => detail.message)
    
                    return {
                        status: false,
                        code: 422,
                        error: errorDetails.join(', ')
                    }
                }
    
                const password = bcrypt.hashSync(body.password, 10)
                console.log(body.password, password)
    
                // nama, email, password
                const add = await prisma.user.create({
                    data: {
                        email: body.email,
                        name: body.name,
                        password: password
                    }
                })
    
                return {
                    status: true,
                    data: add
                }
                
            } catch (error) {
                console.error('createUser user module Error: ', error)
    
                return {
                    status: false,
                    error: error.message
                }
            }
        }

    updateUser = async (body) => {
        try {
            // Validation input
            const schema = Joi.object({
                id: Joi.number().required(),
                name: Joi.string(),
                email: Joi.string(),
                password: Joi.string()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            let password
            if (body.password) {
                password = bcrypt.hashSync(body.password, 10)
            }
             
            // nama, email, password
            const update = await prisma.user.update({
                where: {
                    id: body.id
                },
                data: {
                    email: body.email,
                    name: body.name,
                    password: password
                }
            })

            return {
                status: true,
                data: update
            }
            
        } catch (error) {
            console.error('updateUser user module Error: ', error)

            return {
                status: false,
                error: error.message
            }
        }
    }

    deleteUser = async (id) => {
        try {
            // Validation input
            const schema = Joi.number().required()

            const validation = schema.validate(id)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const del = await prisma.user.delete({
                where: {
                    id: id
                }
            })

            return{
                status: true,
                data: del
            }
        } catch (error) {
            console.error('deleteUser user module Error: ', error)

            return {
                status: false,
                error: error.message
            }
        }
    }
}

module.exports = new _user()
'use strict' //Modo estricto

import User from './user.model.js'
import { checkPassword, checkUpdate, encrypt } from '../../utils/validator.js'

export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}

export const register = async (req, res) => {
    try {
        //Capturar el formulario (body)
        let data = req.body
        //Encriptar la contraseña
        data.password = await encrypt(data.password)
        //Asignar el rol por defecto
        data.role = 'CLIENT'
        //Guardar la información en la BD
        let user = new User(data)
        await user.save()
        //Responder al usuario
        return res.send({ message: `Registered succesfully, was logged with username: ${user.username}` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering user', err: err })
    }
}

export const login = async (req, res) => {
    try {
        //Capturar los datos (body)
        let { username, password } = req.body
        //Validar que el usuario exista
        let user = await User.findOne({ username }) //Buscar un solo registro
        //Verifico qu ela contraseña exista
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                username: user.username,
                name: user.name,
                role: user.role
            }
            //Respondo al usuario
            return res.send({ message: `Welcome ${loggedUser.name}`, loggedUser })
        }
        return res.status(404).send({ message: 'User not found' })
        //Responde al usuario
        return res.send({ message: `Welcome ${user.name}` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error to login' })
    }
}

export const update = async(req, res)=>{
    try{
        //Obtener el id del usuario actualizar
        let { id } = req.params
        //Obtener los datos a actualizzar
        let data = req.body
        //Validar si data trae los datos
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        //Validar si tiene permisos (tokenización) xX Hoy no lo vemos Xx
        //Actualizar (BD)
        let updatedUser = await User.findOneAndUpdate(
            {_id: id}, //ObjectsId son Hexadecimales y tienen:(Hora sys, Versión mongo, llave privada...)
            data,
            { new: true}//Objeto de la DB ya actualizado
        )
        //Validar la actualización
        if(!updatedUser) return res.status(401).send({message: 'User not found and not updated'})
        //Responde usuario
        return res.send({message: 'Updated user', updatedUser})
    }catch(err){
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `Username ${err.keyValue.username} is already taken`})
        return res.status(500).send({message: 'Error updating account'})
    }
}

export const deleteU = async(req, res)=>{
    try{
        //Obtener el id
        let { id } = req.params
        //Validar si esta logeado y es el mismo xXNo lo veremos hoyXx
        //Eliminar (deleteOne / findOneAndDelete)
        let deleteUser = await User.findOneAndDelete({_id: id})
        //Verificar que se eliminó
        if(!deleteUser) return res.status(404).send({message: 'Account not found and not deleted'})
        //responder
        return res.send({message: `Account with username ${deleteUser.user} deleted succesfully`}) //Status 200
    }catch(err){
        console.error(err)
        console.error.status(500).send({message: 'Error deleting account'})
    }
}
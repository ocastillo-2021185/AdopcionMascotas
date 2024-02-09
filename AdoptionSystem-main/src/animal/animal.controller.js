'use strict'

import Animal from './animal.model.js'

export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}

export const registerA = async (req, res) => {
    try {
        //Capturar el formulario (body)
        let data = req.body
        //Asignar el rol por defecto
        data.role = 'DOMESTIC'
        //Guardar la información en la BD
        let animal = new Animal(data)
        await animal.save()
        //Responder al usuario
        return res.send({ message: `Registered succesfully, was logged with animalN: ${animal.animalN}` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering animal', err: err })
    }
}

export const deleteA = async(req, res)=>{
    try{
        //Obtener el id
        let { id } = req.params
        //Eliminar (deleteOne / findOneAndDelete)
        let deleteAnimal = await Animal.findOneAndDelete({_id: id})
        //Verificar que se eliminó
        if(!deleteAnimal) return res.status(404).send({message: 'Animal not found and not deleted'})
        //responder
        return res.send({message: `Aanimal with name ${deleteAnimal.animal} deleted succesfully`}) //Status 200
    }catch(err){
        console.error(err)
        console.error.status(500).send({message: 'Error deleting animal'})
    }
}


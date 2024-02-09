import mongoose from "mongoose"

const animalSchema = mongoose.Schema({
    animal: {
        type: String,
        required: true
    },
    color: {
        type: String,
        require: true
    },
    age: {
        type: String,
        require: true
    },
    keeper: {
        type: String,
        required: true,
    },
    typeOfAnimal: {
        type: String,
        enum: ['WILD', 'DOMESTIC']
    }
})

//pre mongoose
                            //pluralizar
                            export default mongoose.model('animal', animalSchema)
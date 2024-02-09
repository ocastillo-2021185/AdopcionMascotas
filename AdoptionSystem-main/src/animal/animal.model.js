import mongoose from "mongoose"

const animalSchema = mongoose.Schema({
    animalN: {
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
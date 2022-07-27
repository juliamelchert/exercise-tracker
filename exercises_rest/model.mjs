// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to the database exercises_db in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb://localhost:27017/exercises_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

// Defining the schema
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: {type: String, required: true},
    date: { type: String, required: true }
});


// Compiling the model from the schema
const Exercise = mongoose.model("exercise", exerciseSchema);

const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date});
    return exercise.save();
}

const findExercises = async () => {
    const query = Exercise.find();
    return query.exec();
}

const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    await Exercise.replaceOne({ _id: _id }, { name: name, reps: reps, weight: weight, unit: unit, date: date});
}

const deleteById = async (id) => {
    const result = await Exercise.deleteOne({ _id: id });
    return result.deletedCount;
}


export { createExercise, findExercises, replaceExercise, deleteById };
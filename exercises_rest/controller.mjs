import * as exercises from './model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());

/**
 * Create a new exercise with the name, reps, weight, unit, and date provided in the body
 */
app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        // In case of error:
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: error });
        });
});


/**
 * Retrive all of the exercises.
 */
app.get('/exercises', (req, res) => {
    exercises.findExercises()
        .then(exercises => {
            res.status(200).json(exercises);
        })
        // In case of error:
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: error });
        });
});


/**
 * Update the exercise whose id is provided in the path parameter and set
 * its title, year and language to the values provided in the body.
 */
app.put('/exercises/:_id', (req, res) => {
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(() => {
            res.status(200).json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
        })
        // In case of error:
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: error });
        });
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            }
        })
        // In case of error:
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: error });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
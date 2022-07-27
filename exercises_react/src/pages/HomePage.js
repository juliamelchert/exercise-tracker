import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseTable from "../components/ExerciseTable"
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercises] = useState([]);
    const history = useHistory();

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if (response.status === 204) {
            setExercises(exercises.filter(element => element._id !== _id));
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`)
        }
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        history.push('/edit-exercise');
    }

    const loadExercises = async () => {
        const response = await fetch('/exercises', {headers: {'Content-Type': 'application/json'}});
        const data = await response.json();
        setExercises(data);
    }

    // Loads the exercises when the component is mounted.
    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h1>Exercise Tracker</h1>
            <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseTable>
            <Link to="/create-exercise" className="App-link">Add an exercise</Link>
        </>
    );
}

export default HomePage;
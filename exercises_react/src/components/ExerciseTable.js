import React from 'react';
import '../ExerciseTable.css';
import ExerciseRow from "./ExerciseRow"


function ExerciseTable({ exercises, onDelete, onEdit }) {
    return (
        <div className="exercise-table">
        <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Reps</th>
                <th>Weight</th>
                <th>Unit</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
          {exercises.map((exercise, i) => <ExerciseRow exercise={exercise} onDelete={onDelete} onEdit={onEdit} key={i} />)}
        </tbody>
        </table>
      </div>
    );
}


export default ExerciseTable;
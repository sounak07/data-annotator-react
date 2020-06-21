import React from 'react';
import { Link } from 'react-router-dom';

function AnnotationList({ userAnnotations, text }) {
  return (
    <div>
      <h3>
        {text}
        {' '}
        Entires
      </h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {userAnnotations.length > 0 && userAnnotations.map((anno, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{anno.type}</td>
              <td>{anno.details}</td>
              <td>
                <Link to={`img/${anno.imageId}`}>Go to Image</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnnotationList;

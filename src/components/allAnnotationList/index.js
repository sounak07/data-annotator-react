import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import AnnotationList from '../annotationList';

import './index.css';

export function AllAnnotationList({ allAnnotations }) {
  return (
    <div>
      <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
        {allAnnotations.length > 0 && allAnnotations.map((anno, i) => (
          <div className="card" key={i}>
            <div className="panel panel-default">
              <div className="panel-heading" role="tab" id="headingThree">
                <h4 className="panel-title">
                  <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    {anno.userEmail}
                  </a>
                </h4>
              </div>
              <div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                <div className="panel-body">
                  <AnnotationList text="User" userAnnotations={anno.annotations} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllAnnotationList;

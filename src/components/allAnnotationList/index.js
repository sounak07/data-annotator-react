import React from "react";
import AnnotationList from '../annotationList'
import './index.css';

function AllAnnotationList({ allAnnotations }) {
  return (
    <div>
        <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
          {allAnnotations.length > 0 && allAnnotations.map((anno, i) => (
              <div className="card" key={i}>
                <div class="panel panel-default">
                  <div class="panel-heading" role="tab" id="headingThree">
                    <h4 class="panel-title">
                      <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        {anno.userEmail}
                      </a>
                    </h4>
                  </div>
                  <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                    <div class="panel-body">
                      <AnnotationList text="User" userAnnotations={anno.annotations} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}

export default AllAnnotationList;
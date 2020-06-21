import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { AllAnnotationList } from '../allAnnotationList';
import { AnnotationList } from "../annotationList"

configure({ adapter: new Adapter() });

const setup = props => {
  const component = shallow(<AllAnnotationList allAnnotations={props} />);
  return component;
};

describe('AllImagesTest', () => {

  let wrapper;
  beforeEach(() => {
    const props = [{
      
      _id: "5ee3641dd56c477f3f085d37",
      user: "5ee0ec501b4a74edf2689f7f",
      userEmail: "sounakume@gmail.com",
      annotations: [{
        _id: "5ee3b52442a2b0c86b77c9fc",
        type: "Image for annote",
        details: "This is my first annotation",
        imageId: "5ee1ec76599a8146972ce0ed"
      }]
    }];

    wrapper = setup(props);
  });


  it("should show annos passed", () => {
    const comp = wrapper.find(<AnnotationList />)
    expect(comp).toHaveLength(1);
  });
})


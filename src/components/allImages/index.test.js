import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AllImages } from '.';

configure({ adapter: new Adapter() });

const setup = (props) => {
  const component = shallow(<AllImages {...props} />);
  return component;
};

describe('AllImagesTest', () => {
  let wrapper;
  const props = {
    imgs: {
      imgs: [
        {
          _id: 1,
          url: 'http://via.placeholder.com/400x300',
          name: 'Sounak',
        },
        {
          _id: 2,
          url: 'http://via.placeholder.com/400x300',
          name: 'Sounak',
        },
        {
          _id: 3,
          url: 'http://via.placeholder.com/400x300',
          name: 'Sounak',
        },
      ],
    },
  };
  beforeEach(() => {
    wrapper = setup(props);
  });

  it('should show images passed', () => {
    // props.imgs.imgs.map((d) => {
    //   expect(wrapper.find('#'+d._id)).to.have.lengthOf(1);
    // })

    expect(wrapper.find('div.imgGallery')).toHaveLength(1);
  });
});


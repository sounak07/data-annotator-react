import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AllImages } from '.';

configure({ adapter: new Adapter() });

const setup = (props) => {
  const component = shallow(<AllImages {...props} />);
  return component;
};

describe('All Images', () => {
  let wrapper;
  const props = {
    dispatch: jest.fn(),
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

  it('should render container div correctly', () => {
    expect(wrapper.find('.container')).toHaveLength(1);
  });

  it('should render all img gallery div correctly', () => {
    expect(wrapper.find('.allImgGallery')).toHaveLength(1);
  });

  it('should render no-img-indicate if empty [] is passed recieved correctly', () => {
    const props2 = {
      imgs: {
        imgs: [],
      },
    };
    const wrapper2 = shallow(<AllImages {...props2} />);
    expect(wrapper2.find('.no-img-indicate')).toHaveLength(1);
  });

  it('should render imgs div correctly', () => {
    expect(wrapper.find('img')).toHaveLength(3);
  });
});


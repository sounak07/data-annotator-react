import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import { AllAnnotationList } from '.';

configure({ adapter: new Adapter() });

const setup = (props) => {
  const component = shallow(<AllAnnotationList allAnnotations={props} />);
  return component;
};

describe('All Images', () => {
  let wrapper;
  const props = [{

    _id: '5ee3641dd56c477f3f085d37',
    user: '5ee0ec501b4a74edf2689f7f',
    userEmail: 'sounakume@gmail.com',
    annotations: [{
      _id: '5ee3b52442a2b0c86b77c9fc',
      type: 'Image 1 for annote',
      details: 'This is my 2nd annotation',
      imageId: '5ee1ec76599a8146972ce0ed',
    },
    {
      _id: '5ee3b52442a2b0c86b77c9fc',
      type: 'Image for to annote',
      details: 'This is my first annotation',
      imageId: '5ee1ec76599a8146972ce0ed',
    }],
  },
  {

    _id: '5ee3641dd56c477f3f085d37',
    user: '5ee0ec501b4a74edf2689f7f',
    userEmail: 'sounakume@gmail.com',
    annotations: [{
      _id: '5ee3b5242a2b0c8b77c9fc',
      type: 'Image for annote',
      details: 'This is my first annotation',
      imageId: '5ee1ec76587a8146972ce0ed',
    },
    {
      _id: '5ee3b52442a2b0c86b77c9fc',
      type: 'Image for annote',
      details: 'This is my first annotation',
      imageId: '5ee1ec76599a86972ce0ed',
    }],
  },
  ];

  beforeEach(() => {
    wrapper = setup(props);
  });

  it('should render All Annotation lists from different users correctly', () => {
    expect(wrapper.find('.panel-body')).toHaveLength(2);
  });

  it('should render All Annotation lists table correctly', () => {
    const wrapper2 = mount(
      <MemoryRouter>
        <AllAnnotationList allAnnotations={props} />
      </MemoryRouter>,
    );
    expect(wrapper2.find('.anno-list-table')).toHaveLength(2);
  });

  it('should render All Annotation lists table rows correctly', () => {
    const wrapper2 = mount(
      <MemoryRouter>
        <AllAnnotationList allAnnotations={props} />
      </MemoryRouter>,
    );
    expect(wrapper2.find('.anno-list-table-tr')).toHaveLength(4);
  });

  it('should render first row of first table correctly ', () => {
    const wrapper2 = mount(
      <MemoryRouter>
        <AllAnnotationList allAnnotations={props} />
      </MemoryRouter>,
    );
    const table1 = wrapper2.find('.anno-list-table').at(0);

    const firstRowCol = table1.at(0).find('td').map((column) => column.text());
    expect(firstRowCol.length).toEqual(6);
    expect(firstRowCol[0]).toEqual('Image 1 for annote');
    expect(firstRowCol[1]).toEqual('This is my 2nd annotation');
    expect(firstRowCol[2]).toEqual('Go to Image');
  });
});


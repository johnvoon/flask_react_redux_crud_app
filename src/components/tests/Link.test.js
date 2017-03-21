import React from 'react';
import { shallow } from 'enzyme';

import Link from '../Link';

describe('<Link />', () => {
  it('should render a <li> tag', () => {
    const renderedComponent = shallow(<Link/>);
    expect(renderedComponent.type()).toEqual('li');
  });

  it('should render an <a> tag', () => {
    const renderedComponent = shallow(<Link/>);
    expect(renderedComponent.find('a').length).toEqual(1);
  });

  it('should handle click events', () => {
    const onClickSpy = jest.fn();
    const renderedComponent = renderedComponent({ onClick: onClickSpy });
    renderedComponent.find('a').simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  })

  it ('should have a className attribute', () => {
    const renderedComponent = shallow(<Link />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<Link id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<Link attribute={'test'} />);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  })
})
import React from 'react';
import FilterLink from 'components/FilterLink';
import { shallow } from 'enzyme';

describe('FilterLink', () => {
  let renderedComponent;
  const linkText = "Family Law";
  const handleClick = jest.fn();

  beforeEach(() => {
    renderedComponent = shallow(
      <FilterLink 
        linkText={linkText}
        handleClick={handleClick}/>
    );
  })

  it('should render <a> only if count prop not supplied', () => {
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render <a> and <span> if count prop is supplied', () => {
    renderedComponent = shallow(
      <FilterLink 
        linkText={linkText}
        handleClick={handleClick}
        count={2}/>
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should call handleClick when clicked', () => {
    renderedComponent.find('a').simulate('click');
    expect(handleClick).toHaveBeenCalled();
  });
})

import React from 'react';
import DropdownMenu from 'components/DropdownMenu';
import { shallow } from 'enzyme';

describe('DropdownMenu', () => {
  let renderedComponent;
  const linkText = "Family Law";
  const handleClick = jest.fn();

  beforeEach(() => {
    renderedComponent = shallow(
      <DropdownMenu 
        linkText={linkText}
        handleClick={handleClick}/>
    );
  });

  it('should call handleClick when clicked', () => {
    renderedComponent.find('a').simulate('click');
    expect(handleClick).toHaveBeenCalled();
  });
})

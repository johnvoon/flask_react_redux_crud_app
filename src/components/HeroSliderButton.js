import React from 'react';
// Parent: ./PracticeAreaNavbar

const HeroSliderButton = (props) => {
  const { text, handleClick, index } = props;

  return (
    <li>
      <a 
        role="button"
        onClick={() => handleClick(index)}>
        {text}
      </a>
    </li>
  );
};

export default HeroSliderButton;
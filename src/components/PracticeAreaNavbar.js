import React from 'react';
import HeroSliderButton from './HeroSliderButton';
// Parent: '../HomePage/index'

const PracticeAreaNavbar = (props) => {
  const { practiceAreas, handleClick } = props;
  const heroSliderButtons = Object.keys(practiceAreas).map(id => {
    return (
      <HeroSliderButton
        key={id}
        index={Number(id)}
        text={practiceAreas[id].area}
        handleClick={handleClick}/>
    );
  });

  return (
    <nav className="navbar navbar-default navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed"
                  data-toggle="collapse" data-target=".navbar-collapse"
                  aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
          </button>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-practice-area text-uppercase">
            <HeroSliderButton
              index={0}
              text="Home"
              handleClick={handleClick}/>            
            {heroSliderButtons}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default PracticeAreaNavbar;
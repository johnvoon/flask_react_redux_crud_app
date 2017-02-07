import React from 'react';

const PracticeAreaPanel = (props) => {
  const { practiceArea } = props;

  return (
    <div className="panel">
      <div className="wrapper">
        <div className="title">{practiceArea.area}</div>
        <div className="description">
          <p>{practiceArea.description}</p>
        </div>
      </div>
    </div>
  )  
}

export default PracticeAreaPanel;
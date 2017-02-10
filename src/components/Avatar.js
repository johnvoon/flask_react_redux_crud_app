import React from 'react';

const Avatar = (props) => {
  const { avatarPhoto, avatarName } = props;
  
  return (
    <div className="media">
      <div className="media-left">
        <a href="#">
          <img className="media-object" src={avatarPhoto} alt="User avatar"/>
        </a>
      </div>
      <div className="media-body">
        <p className="media-heading">
          {avatarName}
        </p>
      </div>
    </div>
  );
};

export default Avatar;
import React, { PropTypes } from 'react';

const Avatar = (props) => {
  const { avatarPhoto, iconClassName, avatarText } = props;
  
  return (
    <div className="avatar-frame">
      <div className="avatar-img">
        <a>
          {iconClassName ? (
            <span 
              className={iconClassName}/>
          ) : avatarPhoto ? (
            <img 
              className="img-responsive" src={avatarPhoto} alt="User avatar"/>
          ) : null}
        </a>
      </div>
      <div className="avatar-text">
        <p>
          {avatarText}
        </p>
      </div>
    </div>
  );
};

export default Avatar;

Avatar.propTypes = {
  avatarPhoto: PropTypes.string.isRequired,
  iconClassName: PropTypes.string.isRequired,
  avatarText: PropTypes.string.isRequired,
};
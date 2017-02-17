import React from 'react';
import classNames from 'classnames';

const Avatar = (props) => {
  const { avatarPhoto, iconClassName, avatarText } = props;
  
  return (
    <div className="avatar-frame">
      <div className={classNames(
        "avatar-img", {
        comment: iconClassName
      })}>
        <a>
          {iconClassName ? (
            <span 
              className={classNames({
                comment: iconClassName
              })}/>
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
import { useState } from 'react';
import './Avatar.css';

const Avatar = ({ reaction }) => {
  return (
    <div className={`avatar-container-simple ${reaction}`}>
      <div className="avatar-simple">
        {/* Elephant body */}
        <div className="elephant-body-simple">
          {/* Head */}
          <div className="head-simple">
            {/* Ears */}
            <div className="ear-simple ear-left-simple"></div>
            <div className="ear-simple ear-right-simple"></div>
            
            {/* Face */}
            <div className="face-simple">
              {/* Eyes */}
              <div className="eye-simple eye-left-simple">
                <div className="pupil-simple"></div>
              </div>
              <div className="eye-simple eye-right-simple">
                <div className="pupil-simple"></div>
              </div>
              
              {/* Smile */}
              <div className="smile"></div>
              
              {/* Trunk */}
              <div className="trunk-simple"></div>
              
              {/* Tusks */}
              <div className="tusk-simple tusk-left-simple"></div>
              <div className="tusk-simple tusk-right-simple"></div>
            </div>
          </div>
        </div>

        {/* Shopkeeper apron */}
        <div className="shopkeeper-apron">
          <div className="apron-strap"></div>
        </div>
      </div>

      {/* Reaction bubble */}
      {reaction === 'happy' && (
        <div className="reaction-bubble-simple">
          😊
        </div>
      )}
    </div>
  );
};

export default Avatar;

import React from 'react';

const Video = ({ src, title }) => {
  return (
    <div>
      <video width="320" height="240" controls poster="/static/images/google.png">
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h2>{title}</h2>
    </div>
  );
};

export default Video;

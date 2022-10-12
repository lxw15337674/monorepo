import React from 'react';
const PlainTextExample = () => {
  return (
    <div>
      <div
        className="bg-[#1da1f2] h-10"
        onClick={(e) => {
          console.log('blue');
        }}
      >
        blue
      </div>
      <div
        className="bg-[red] absolute left-0 top-0 w-12 pointer-events-none"
        onClick={(e) => {
          console.log('red');
        }}
      >
        red
      </div>
    </div>
  );
};

export default PlainTextExample;

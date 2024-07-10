import '../App.css';
import React, { useState, useEffect } from 'react';
import TypewriterPage from './TypewriterPage';

export default function LeftPanel() {
  const content = [
    { type: 'paragraph', text: 'This is the first paragraph.' },
    { type: 'button', label: 'Click Me', onClick: () => alert('Button clicked!') },
    { type: 'paragraph', text: 'This is the second paragraph.' },
    // Add more content as needed
  ];

  return (
    <div className="left-panel" style={{color: 'black'}}>
      <TypewriterPage content={content} />
    </div>
  );

  // const [typewriterText, setTypewriterText] = useState('');
  // const text = 'What would you like to practice?';

  // useEffect(() => {
  //   let i = 0;
  //   const intervalId = setInterval(() => {
  //     if (i < text.length) {
  //       setTypewriterText((prevText) => prevText + text.charAt(i));
  //       i++;
  //     } else {
  //       clearInterval(intervalId);
  //     }
  //   }, 80); // Adjust speed as needed

  //   return () => clearInterval(intervalId); // Clean up on unmount
  // }, [text]);

  // return (
  //   <div className="left-panel" style={{color: 'black'}}>
  //     <div>
  //       {typewriterText}
  //     </div>
  //   </div>
  // );
}
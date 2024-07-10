import React, { useState, useEffect } from 'react';

export default function TypewriterPage ({ content }) {
  const [displayContent, setDisplayContent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < content.length) {
        setDisplayContent((prevContent) => [...prevContent, content[currentIndex]]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, 2000); // Adjust typing speed here (milliseconds per character)

    return () => clearInterval(interval);
  }, []);
  console.log(content);
  console.log(currentIndex);

  return (
    <div>
      TEST 2
      {displayContent.map((item, index) => (
        <div key={index}>
          {item.type === 'paragraph' && (
            <p>{item.text}</p>
          )}
          {item.type === 'button' && (
            <button onClick={item.onClick}>{item.label}</button>
          )}
        </div>
      ))}
      TEST
    </div>
  );
};


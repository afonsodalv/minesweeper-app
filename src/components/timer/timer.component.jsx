import React, { useState, useEffect } from 'react';

function Timer({ isTimerActive, reset}) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {

    if (reset) {
        setSeconds(0);
    }

    let interval = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, seconds, reset]);

  return (
    <p>{seconds}</p>
  );
}

export default Timer;
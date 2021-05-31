import React, { Fragment, useEffect, useState } from "react";
import { Progress } from "semantic-ui-react";

const ProgressBar = () => {
  const [value, setValue] = useState(0);
  const max = 30000;

  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setValue((prevState) => prevState + 100);
    }, 100);
    setIntervalId(id);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (value === max) {
      clearInterval(intervalId);
    }
  }, [value]);

  return (
    <Progress color="violet" value={value} total={max}>
      Please wait Heroku is sleeping <span role="img">😴</span>
    </Progress>
  );
};

export default ProgressBar;

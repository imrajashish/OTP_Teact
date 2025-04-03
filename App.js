import { useState, useRef, useEffect } from "react";
import "./styles.css";

const OTP_DIGITS_COUNT = 5;

export default function App() {
  const [inputArr, SetInputArr] = useState(
    new Array(OTP_DIGITS_COUNT).fill("")
  );
  const refArr = useRef([]);

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    console.log(value);
    const newValue = value.trim();
    const newArr = [...inputArr];
    newArr[index] = newValue.slice(-1);
    SetInputArr(newArr);
    newValue && refArr.current[index + 1]?.focus();
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !inputArr[index] && index > 0) {
      refArr.current[index - 1]?.focus();
    }
  };

  return (
    <div className="App">
      <h1>Validation OTP</h1>
      {inputArr.map((input, index) => {
        return (
          <input
            className="input_otp"
            key={index}
            type="text"
            ref={(input) => (refArr.current[index] = input)}
            //value={inputArr[index]}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        );
      })}
    </div>
  );
}

import React , {useState} from 'react';
import './calculator.css';
import { Button } from "semantic-ui-react";


const Calculator = ({ onInputChange }) => {
    const handleClick = (value) => {
        onInputChange((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    onInputChange('');
  };

const [isOpen, setIsOpen] = useState(false);

  const toggleComponent = () => {
    setIsOpen(!isOpen);
  };



  return (
    <div className="calculator">

      <div>
      <div className="button-row">
        <Button onClick={() => handleClick('5')}>5$</Button>
        <Button onClick={() => handleClick('7')}>7</Button>
        <Button onClick={() => handleClick('8')}>8</Button>
        <Button onClick={() => handleClick('9')}>9</Button>
        
      </div>
      <div className="button-row">
        <Button onClick={() => handleClick('10')}>10$</Button>
        <Button onClick={() => handleClick('4')}>4</Button>
        <Button onClick={() => handleClick('5')}>5</Button>
        <Button onClick={() => handleClick('6')}>6</Button>

      </div>
      <div className="button-row">
        <Button onClick={() => handleClick('20')}>20$</Button>
        <Button onClick={() => handleClick('1')}>1</Button>
        <Button onClick={() => handleClick('2')}>2</Button>
        <Button onClick={() => handleClick('3')}>3</Button>

      </div>
      <div className="button-row">
      <Button onClick={() => handleClick('100')}>100$</Button>
        <Button onClick={() => handleClick('0')}>0</Button>
        <Button onClick={() => handleClick('.')}>.</Button>  
        <Button className="clear-button" inverted color="red" onClick={handleClear}>Clear</Button>

      </div>
      </div>
    </div>

  );
};

export default Calculator;



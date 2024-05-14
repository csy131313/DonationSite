import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

const CreditCardInput = ({ toChangeDetails }) => {
  const [cardNumber, setCardNumber] = useState('');

  const handleChange = (e) => {
    const input = e.target.value;
    const formattedInput = input.replace(/\s/g, '').slice(0, 19);
    let maskedInput = '';
    let emptyDigitCount = 16 - formattedInput.length;

    for (let i = 0; i < formattedInput.length; i++) {
      if (i % 4 === 0 && i !== 0) {
        maskedInput += ' ';
      }
      maskedInput += formattedInput[i];
    }

    if (emptyDigitCount > 0) {
      maskedInput += ' '.repeat(emptyDigitCount);
    }

    setCardNumber(maskedInput);
  };

  return (
    <div>
      <TextField id="standard-basic" label="card number*" variant="standard"
        placeholder="_ _ _ _  _ _ _ _  _ _ _ _  _ _ _ _"
        value={cardNumber}
        onChange={handleChange}
        onBlur={(e) => toChangeDetails(e)}
        maxLength={23}
        name="numberCard"
        style={{width:"100%"}}
      />
    </div>
  );
};

export default CreditCardInput;


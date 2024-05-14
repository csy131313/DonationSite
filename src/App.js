
import './App.css';
import Form from './form';
import { useEffect, useState } from 'react';
import Donors from './Donors';
import { Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import axios from "axios";
import { calcDonationInSekels } from './Helper';
import { Coin, DolarContaxt, Color } from './context';
import Home from './Home';

function App() {
  const [ArrDonors, setArrDonors] = useState([
    { name: "miri", cnt: 2500, cntD: 310, dateDonation: new Date(), review: 'הצלחה בלימודים' },
    { name: "mimi", cnt: 1000, cntD: 309, dateDonation: new Date(), review: '' },
    { name: "dani", cnt: 180, cntD: 308, dateDonation: new Date(), review: '' },
    { name: "chani", cnt: 700, cntD: 307, dateDonation: new Date(), review: '' },
    { name: "heliau", cnt: 800, cntD: 306, dateDonation: new Date(), review: '' },
    { name: "avi", cnt: 5500, cntD: 305, dateDonation: new Date(), review: 'סיעתא דשמיא' },
    { name: "beni", cnt: 420, cntD: 304, dateDonation: new Date(), review: '' },
    { name: "gadi", cnt: 800, cntD: 303, dateDonation: new Date(), review: '' },
    { name: "gili", cnt: 1800, cntD: 302, dateDonation: new Date(), review: 'זש"ק' },
    { name: "racheli", cnt: 1000, cntD: 301, dateDonation: new Date(), review: '' },
    { name: "shoshi", cnt: 360, cntD: 300, dateDonation: new Date(), review: '' }]);

  let [cntD, setCntD] = useState(8);
  let [amountToutal, setAmountToutal] = useState(15060);
  let [dollarRate, setDollarRate] = useState(3.7);
  let [coin, setCoin] = useState("shekel");
  let [color, setColor] = useState("light")
  let [open, setOpen] = useState(false);

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const changeColor = (c) => {
    setColor(c)
  }
  const changeCoin = (coin) => {
    setCoin(coin)
  }

  const addDonor = (donor) => {
    //save the cnt doation in shekels
    donor["cnt"] = calcDonationInSekels(coin, donor["cnt"], dollarRate);
    const copy = [...ArrDonors, { ...donor, cntD: cntD + 300, dateDonation: new Date() }];
    setCntD(cntD + 1);
    setArrDonors(copy);
    setAmountToutal(amountToutal + (+donor.cnt));
  };
  //open the axios before the project submission

  useEffect(() => {
    axios.get(" https://v6.exchangerate-api.com/v6/dc90a145d73f5155688e1dde/latest/USD"
    )
      .then(res => {
        setDollarRate(res.data.conversion_rates.ILS);
      })
      .catch(
        err =>
          console.log(err)
      )
  }, [])

  return (
    <DolarContaxt.Provider value={dollarRate}>
      <Coin.Provider value={coin}>
        <Color.Provider value={color}>
          <div className="App">
            <Nav toChangeCoin={changeCoin} toChangeColor={changeColor} cntD={cntD} amountToutal={amountToutal} />
            <Routes>
              <Route path="*" element={<Home />} />
              <Route path="addDonation" element={<Form toAddDonor={addDonor} toSetOpen={setOpen} />} />
              <Route path="all" element={<Donors arr={ArrDonors} toSetOpen={setOpen} open={open} />} />
            </Routes>
          </div>
        </Color.Provider>
      </Coin.Provider>
    </DolarContaxt.Provider>
  );
}

export default App;
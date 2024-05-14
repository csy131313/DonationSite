import { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Form.css'
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { validate, validateCreditCard } from "./Helper";
import { Coin, Color } from "./context";
import CreditCardInput from "./CreditCardInput";

const Form = ({ toAddDonor, toSetOpen }) => {
    let color = useContext(Color)
    let coin = useContext(Coin);
    const navigate = useNavigate();
    let [showLinearProgress, setShowLinearProgress] = useState(false)
    let [newDonor, setNewDonor] = useState({
        name: '',
        cnt: '',
        phone: '',
        email: '',
        review: '',
        NumberCard: '',
        date: '',
        cvv: '',
        id: '',
        dateDonation: null
    })
    let [errors, setErrors] = useState({});

    const changeDetail = (e) => {
        let inputName = e.target.name;
        let inputValue = e.target.value;
        let copy = { ...newDonor };
        copy[inputName] = inputValue
        setNewDonor(copy)
    }

    let [next, setNext] = useState(false)
    const isNext = () => {
        let result = validate(newDonor, coin);
        if (Object.keys(result).length == 0) {
            setNext(true);
            setErrors({})
        }
        else
            setErrors(result);
    }
    const toDonate = () => {
        let result = validateCreditCard(newDonor);
        if (Object.keys(result).length == 0) {
            setShowLinearProgress(true);
            setTimeout(() => {
                navigate("/all");
                toAddDonor(newDonor);
                setErrors({});
                toSetOpen(true);
            }, 3000)
        }
        else {
            setErrors(result)
        }
    }

    return (
        <div className={color}>
            <form>
                {!next && <>

                    <TextField id="standard-basic" label="name*" variant="standard" name={"name"} onBlur={changeDetail} />
                    {errors.name && <Alert severity="error">{errors.name}</Alert>}
                    <TextField id="standard-basic" label="phone" variant="standard" name={"phone"} onBlur={changeDetail} />
                    {/* {errors.phone == "You must enter 10 digits" && <Alert severity="error">{errors.phone}</Alert>}
                    {errors.phone == "phone must be onli digits" && <Alert severity="error">{errors.phone}</Alert>}
                    {errors.phone == "It is recommended to enter a phone number" && <Alert severity="warning">{errors.phone}</Alert>} */}
                    <TextField id="standard-basic" label="email" variant="standard" name={"email"} onBlur={changeDetail} />
                    {/* {errors.email == "Enter a valid email address" && <Alert severity="error">{errors.email}</Alert>}
                    {errors.email == "It is recommended to enter a mail adress" && <Alert severity="warning">{errors.email}</Alert>} */}
                    <TextField id="outlined-number" type="number" label="donation amount*" variant="standard" name={"cnt"} onBlur={changeDetail} />
                    {errors.cnt && <Alert severity="error">{errors.cnt}</Alert>}
                    <TextField id="standard-basic" label="review" variant="standard" name={"review"} onBlur={changeDetail} />
                    <Button variant="contained" size="small" value="next" onClick={isNext}>next</Button>

                </>}
                {next && <>
                    <>
                        <CreditCardInput toChangeDetails={changeDetail} />
                        {errors.numberCard && <Alert severity="error">{errors.numberCard}</Alert>}
                        <TextField id="standard-basic" label="date* (month/year)" variant="standard" name={"date"} onBlur={changeDetail} />
                        {errors.date && <Alert severity="error">{errors.date}</Alert>}
                        <TextField id="standard-basic" label="cvv*" variant="standard" name={"cvv"} onBlur={changeDetail} />
                        {errors.cvv && <Alert severity="error">{errors.cvv}</Alert>}
                        <TextField id="standard-basic" label="id*" variant="standard" name={"id"} onBlur={changeDetail} />
                        {errors.id && <Alert severity="error">{errors.id}</Alert>}

                    </>
                    <Button variant="contained" size="small" onClick={toDonate}>donate</Button>
                </>}
                {showLinearProgress && <Box sx={{ width: '100%' }} style={{ "margin-top": "3vh" }}>
                    <LinearProgress />
                </Box>}

            </form>
        </div>
    );
}

export default Form;
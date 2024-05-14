import { Link } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState } from "react";
import { Coin, Color, DolarContaxt } from "./context";
import { returnCntAcordingCoin } from "./Helper";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import LinearWithValueLabel from "./CircularWithValueLabel";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Nav = ({ toChangeCoin, toChangeColor, cntD, amountToutal }) => {
    let color = useContext(Color);
    let coin = useContext(Coin);
    let dollarRate = useContext(DolarContaxt)
    let totalAmountDonated = returnCntAcordingCoin(coin, amountToutal, dollarRate)
    let goal = returnCntAcordingCoin(coin, 1000000, dollarRate)
    let percentage = 100 * amountToutal / 1000000;
    let [open, setOpen] = useState(false)
    let coinToShow = coin == "dollar" ? "$" : "₪";

    // three function to the alert on change the coin
    const handleClick = () => {
        setOpen(true);
        setTimeout(() => setOpen(false), 3000)
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setOpen(false);
    };
    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );
    return (
        <nav className={color}>
            <h1 style={{ "fontSize": "5vw", "marginTop": "0px" }} className={color}>
                <span style={{ color: "rgb(65, 115, 208)" }}>{totalAmountDonated} </span>
                donated by
                <span style={{ color: "rgb(65, 115, 208)" }}> {cntD} </span>
                donors
            </h1>

            <LinearWithValueLabel percentage={percentage} />

            <h2 className={color}>campaign's goal: {goal}</h2>

            <ButtonGroup variant="text" aria-label="text button group" style={{ "marginBottom": "3vh" }}>
                <Button><Link className={(data) => data.isActive ? "active" : "not-active"} to="addDonation">to donate</Link></Button>
                <Button><Link className={(data) => data.isActive ? "active" : "not-active"} to="all">all donation</Link></Button>
            </ButtonGroup>
            <Box sx={{
                minWidth: 200,
                top: 0,
                left: 0,
                bottom: "40vh",
                right: "90vw",
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {/* select input for the coin */}
                <FormControl >
                    <InputLabel id="demo-simple-select-label">Coin</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={coin}
                        label="Coin"
                        onChange={(e) => {
                            toChangeCoin(e.target.value);
                            handleClick();
                        }}
                    >
                        <MenuItem value="dollar">dollar</MenuItem>
                        <MenuItem value="shekel">shekel</MenuItem>
                    </Select>
                </FormControl>
                {/* select input for the color */}
                <FormControl >
                    <InputLabel id="demo-simple-select-label">Color</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={color}
                        label="Color"
                        onChange={(e) => { toChangeColor(e.target.value) }}
                    >
                        <MenuItem value="light">light</MenuItem>
                        <MenuItem value="dark">dark</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {/* a massage aboute the coin state */}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={"change the coin to: " + coinToShow}
                action={action}
            />
        </nav>
    );
}

export default Nav;
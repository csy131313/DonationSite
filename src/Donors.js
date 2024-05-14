import './donors.css'
import Donor from "./Donor";
import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Button, TextField } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import { Color } from './context';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const Donors = ({ arr, toSetOpen, open }) => {
  const navigate = useNavigate();
  let [sortBy, setSortBy] = useState("new");
  let [search, setSearch] = useState("");
  let [lengthToShow, setLengthToShow] = useState(6);
  let [isEnd, setIsEnd] = useState(false)
  let color = useContext(Color)
  const changeSearch = (e) => {
    setSearch(e.target.value)
  }
  // Function to handle the select box change
  const handleSelectChange = (event) => {
    setSortBy(event.target.value);
  };

  // Filter and sort the array
  let filteredArr;
  if (sortBy == "new") {
    filteredArr = arr.filter(item => item.name.includes(search) || item.review.includes(search))
      .sort((a, b) => {
        if (a["dateDonation"] < b["dateDonation"])
          return 1;
        return -1;
      });
  }
  else if (sortBy == "cnt") {
    filteredArr = arr.filter(item => item.name.includes(search) || item.review.includes(search))
      .sort((a, b) => {
        if (a[sortBy] < b[sortBy])
          return 1;
        return -1;
      });
  }
  else {
    filteredArr = arr.filter(item => item.name.includes(search) || item.review.includes(search))
      .sort((a, b) => {
        if (a[sortBy] > b[sortBy])
          return 1;
        return -1;
      });
  }

  if (isEnd && lengthToShow < arr.length) {
    setLengthToShow(arr.length)
  }
  return (
    <div className={color}>
      <div id="donors">

        {/* this is the two inputs from the search and sort */}
        <ButtonGroup size="large" aria-label="large button group">

          <TextField id="outlined-basic" label="search..." variant="outlined" onChange={changeSearch} />

          <Box sx={{ minWidth: 175 }}>
            <FormControl >
              <InputLabel id="demo-simple-select-label">sort by</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortBy}
                label="Coin"
                onChange={handleSelectChange}
              >
                <MenuItem value="name">donor name</MenuItem>
                <MenuItem value="cnt">donation amount</MenuItem>
                <MenuItem value="dateDonation">old</MenuItem>
                <MenuItem value="new">new</MenuItem>
              </Select>
            </FormControl>
          </Box>

        </ButtonGroup>
        <div id="containerDonors">
          <div>
            <img src='image (7).png' className='sideImage'></img>
          </div>
          <div id="ulDiv" style={{ overflow: 'auto' }}>
            <ul id="ulDonors">
              {filteredArr.slice(0, lengthToShow).map((item) => (
                <li key={item.key}><Donor donor={item} /></li>
              ))}
            </ul>
          </div>
          <div>
            <img src='image (1).png' className='sideImage'></img>
          </div>
        </div>

        {/* this is the add input */}
        <div>
          {!isEnd &&
            < Fab color="primary" aria-label="add"
              onClick={() => {
                if (lengthToShow + 6 >= arr.length)
                  setIsEnd(true)
                setLengthToShow(lengthToShow + 6)
              }}>
              <AddIcon />
            </Fab>}
        </div>

        {/* this is the button that navigate to the form */}
        <Button variant="contained" size="large" onClick={() => navigate('/addDonation')} style={{ margin: "4vh" }}>donate</Button>

        {/* this is the thank-you massage for the donor */}
        <Dialog disableEscapeKeyDown open={open} onClose={() => toSetOpen(false)}>
          <DialogTitle>
            thank you <span style={{ color: "#41b132" }}>{arr[arr.length - 1].name}</span> for your donation!
            We really appreciate the gesture
            And we are sure that God will repay you as your good reward
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => toSetOpen(false)}><CloseIcon /></Button>
          </DialogActions>
        </Dialog>
      </div>
    </div >
  );
}

export default Donors;



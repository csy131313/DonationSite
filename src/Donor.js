import { useContext, useEffect, useState } from "react";
import { Coin, Color, DolarContaxt } from './context';
import { calcDiffDate, returnCntAcordingCoin } from "./Helper";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Donor = ({ donor }) => {
    // let color = useContext(Color)
    let dolar = useContext(DolarContaxt);
    let coinInsite = useContext(Coin);
    let cntDonation = returnCntAcordingCoin(coinInsite, donor.cnt, dolar);

    // let [diff, setDiff] = useState(calcDiffDate(donor.dateDonation));
    donor.diff = calcDiffDate(donor.dateDonation);
    let calcDiff = setInterval(() => {
        // setDiff(calcDiffDate(donor.dateDonation));
        donor.diff = calcDiffDate(donor.dateDonation);
    }, 60000);

    // let [diff, setDiff] = useState(calcDiffDate(donor.dateDonation));
    // donor.diff = diff
    // let calcDiff = setInterval(() => {
    //     setDiff(calcDiffDate(donor.dateDonation));
    // }, 60000);
    // donor.diff = calcDiff;




    return (
        <div>
            <Card sx={{ minWidth: 200 }}>
                <CardContent>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary" style={{ "text-align": "left" }}>
                        {donor.cntD}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {cntDonation} donated by {donor.name}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {donor.diff}
                    </Typography>
                    <Typography variant="body2">
                        {donor.review}
                    </Typography>
                </CardContent>
            </Card>

        </div>
    );
}

export default Donor;

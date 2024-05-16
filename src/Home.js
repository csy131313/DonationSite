import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AlarmIcon from '@mui/icons-material/Alarm';
import './Home.css'
import { useContext } from 'react';
import { Color } from './context';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

const Home = () => {
    let color = useContext(Color)
    return (
        <div className={color}>
            <h1 style={{ "marginTop": "0px" }}>WE MAKE CAMPAIGNS GO VIRAL! </h1>
            <p style={{ width: "50%", margin: "auto" }}>
                Here they give more without tricks without segments!
                In the coming week, when we return to the Shabbat table on an extended basis, there will be families whose table will not be full. What for us is so natural like a variety of dishes, fish, meat and fine wine - for them it is a dream. Every year it is difficult for them and this year even more so because of the cost. The prices just got worse.
                We must take care of them!!!!
                And like every year leading up to Rosh Hashanah, we at Tzadka's cash register work around the clock to distribute food baskets to hundreds of needy families. Our operation is our effort so that no family sits at an empty table.
                And this year especially, due to the situation which unfortunately added many families to the circle of distress and we want to help them all.
                Help them with a big hand! And in a happy soul!
                And in any case, remember - not less than NIS 360!!!
            </p>
            <div id="imgDiv">
                <img src='../image (5).png' className='imgHome'></img>
            </div>
            <div className="home_container" >
                <div className="contact">
                    <Tooltip title="activity time" placement="top">
                        <AlarmIcon style={{ width: "30%", height: "30%" }} />
                    </Tooltip>
                    <p className='p_contact'>Our operating hours:
                        Sunday - Thursday: 10:00-22:00
                        Day 6: 10:00-12:30
                    </p>
                </div>
                <div className="contact">
                    <Tooltip title="location" placement="top">
                        <LocationOnIcon style={{ width: "30%", height: "30%" }} />
                    </Tooltip>
                    <p className='p_contact'>To establish a telephone contact for a donation by
                        Bank transfer or phone credit call:
                        052777784 \ 0583224659
                    </p>
                </div>
                <div className="contact">
                    <Tooltip title="phone" placement="top">
                        <LocalPhoneIcon style={{ width: "30%", height: "30%" }} />
                    </Tooltip>
                    <p className='p_contact'>Our location for cash donations
                        Jerusalem, Jaffa 38, Jerusalem | Tel Aviv, Menachem Begin 132, Tel Aviv
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Home;
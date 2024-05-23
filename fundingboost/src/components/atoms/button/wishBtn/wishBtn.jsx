import React from 'react';
import wish from "../../../../assets/emptyheart.svg";
import wishFillHeart from "../../../../assets/fillheart.svg";
import './wishBtn.scss'
import axios from "axios";
const WishBtn = () => {
    const [isWish, setIsWish] = React.useState(false);

    const clickWishBtn = async () => {
        setIsWish(!isWish);

        try{
            const respose = await axios.post(`${process.env.REACT_APP_FUNDINGBOOST}/items/like/{item_id}`,{
                responseType: 'json',
                headers: ({
                    "Content-Type" : "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000/",
                    "Access-Control-Allow-Credentials" : true,
                    "ngrok-skip-browser-warning": true
                }),
                withCredentials: true,
            });
            console.log("post:",respose.data);
        } catch (error) {
            console.error("wishBtn Post Error :", error);
        }
    }
    return (
        <div className="wishBtn">
            <button className="heartIconWrapper" onClick={clickWishBtn}>
                <img className="heartIcon" alt="heartIcon" src={!isWish ? wish: wishFillHeart} />
            </button>
        </div>
    );
};

export default WishBtn;
import React, {useEffect,useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import PointUse from '../../atoms/point/pointUse';
import './friendFundingPay-page.scss'
import img from '../../../assets/logo.svg';
import axios from "axios";



const FriendFundingPayPage = () => {
    const location = useLocation();
    const fundingAmount = location.state;

    const { fundingId } = useParams();
    console.log("FundingId: "+fundingId);

    const [friendFundingPayData, setFriendFundingPayData] = useState(null);


    const leftPrice = () => {
        if (friendFundingPayData) {
            return friendFundingPayData.totalPrice - friendFundingPayData.presentPrice;
        }
        return 0;

    };
    console.log("최대 펀딩 가능 금액: " + leftPrice())
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://65fd-112-218-95-58.ngrok-free.app/api/v1/pay/friends/2?memberId=1`, {
                    responseType: 'json',
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                        "ngrok-skip-browser-warning": true,
                    },
                });
                console.log("response ->", response.data);
                setFriendFundingPayData(response.data.data);
            } catch (error) {
                console.error("Error data:", error);
            }
        };
        fetchData();
    }, [fundingId]);


    return (

        <div className="friendFundingPayPage">
            {friendFundingPayData && friendFundingPayData.friendProfile && (
                <>
            <div className="friend-funding-profile">


                    <img className="friend-funding-profile-image" alt="Ellipse" src={friendFundingPayData.friendProfile}/>
                <div className="friend-funding-profile-name">{friendFundingPayData.friendName}</div>
                <div className="friend-funding-profile-text">님에게 펀딩하기</div>
            </div>
            <div className="friend-funding-total-price">
                <div className="friend-funding-total-price-row">
                    <div className="friend-funding-total-price-first-text">친구의 펀딩 총 금액</div>
                    <div className="friend-funding-total-price-second-text">{friendFundingPayData.totalPrice}</div>
                </div>
                <div className="friend-funding-total-price-row">
                    <div className="friend-funding-total-price-first-text">현재 펀딩완료 금액</div>
                    <div className="friend-funding-total-price-second-text">{friendFundingPayData.presentPrice}</div>
                </div>
                <div className="friend-funding-total-price-row">
                    <div className="friend-funding-total-price-first-text">최대 펀딩 가능 금액</div>
                    <div className="friend-funding-total-price-second-text">{leftPrice()}</div>
                </div>
            </div>
            <PointUse friendFundingPayData={friendFundingPayData}/>
                </>
                )}

        </div>

    );

};

export default FriendFundingPayPage;

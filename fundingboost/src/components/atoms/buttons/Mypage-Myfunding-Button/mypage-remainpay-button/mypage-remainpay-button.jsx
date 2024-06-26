import React from "react";
import './mypage-remainpay-button.scss';
import {useNavigate} from "react-router-dom";

function MypageRemainpayBtn({myPageFundingItemDtoList}) {
    const navigate = useNavigate();


    const handleRemainpayButtonClick = () => {
        navigate('/funding/pay', { state: {myPageFundingItemDtoList}});
        console.log(myPageFundingItemDtoList)
    };
    return (
        <button className="mypage-remainpay-btn" onClick={handleRemainpayButtonClick} >잔여금액 결제하기</button>
    );
}

export default MypageRemainpayBtn;

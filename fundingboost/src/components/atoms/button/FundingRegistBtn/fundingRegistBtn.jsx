//펀딩 바로가기 버튼
import React from 'react';
import Button from 'react-bootstrap/Button';
import  '../yellowBtn.scss';

function FundingRegistButton({ onClick }){
    const handleClick = () => {
        onClick();
    };
    return (
        <>
            <div className="FundingRegist-btn">
                <Button href="/mypage" className="yellowBtn" onClick={handleClick}>펀딩 등록하기</Button>{' '}
            </div>
        </>

    );
}
export default FundingRegistButton;
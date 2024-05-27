import React, { useState, useEffect } from 'react';
import './order-pay.scss';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import OrderProductDetail from "../../../atoms/OrderProductDetail/orderproductdetail";
import OrderpayPoint from "../../../atoms/OrderPayPayment/orderpaypayment";
import OrderPayDelivery from "../../../atoms/OrderPayDelivery/orderpaydelivery";
import NonMemberModal from "../../../atoms/nonMemberModal/nonMemberModal";

const OrderPane = () => {
    const [apiData, setApiData] = useState(null);
    const [fundingItemData, setFundingItemData] = useState(null);
    const [deliveryDtoList, setdeliveryDtoList] = useState([]);
    const location = useLocation();
    const [point, setPoint] = useState(null);
    const [modalShowState, setModalShowState] = useState(false);

    const {selectedItems, itemPurchase } = location.state || {};
    const [purchaseItem, setPurchaseItem] = useState(itemPurchase ? [itemPurchase] : selectedItems || []);

    console.log("selectedItems", selectedItems);
    console.log(deliveryDtoList);
    console.log(purchaseItem);

    useEffect(() => {
        const fetchOrderPayData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    setModalShowState(true);
                    return;
                }

                const response = await axios.get(`${process.env.REACT_APP_FUNDINGBOOST}/pay/view/order`, {
                    responseType: 'json',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${accessToken}`,
                        "Access-Control-Allow-Origin": "http://localhost:3000/",
                        'Access-Control-Allow-Credentials': true
                    }
                });
                console.log('GET 결과:', response.data);
                setFundingItemData(response.data);
                setApiData(response.data.data);
                setdeliveryDtoList(response.data.data.deliveryDtoList);
                setPoint(response.data.data.point);
            } catch (error) {
                console.error('GET 에러:', error);
            }
        };

        fetchOrderPayData();
    }, []);

    const onUpdateUsingPoint = (value) => {
        console.log("사용 포인트가 업데이트되었습니다:", value);
    };

    return (
        <div className="order-pay-page-container">
            {modalShowState && <NonMemberModal message="로그인 후 펀딩부스트를 시작해보세요." />}
            <div className="orderpay-left-container">
                <OrderProductDetail selectedItems={purchaseItem} />
                <OrderPayDelivery deliveryDtoList={deliveryDtoList}/>
            </div>
            <div className="orderpay-right-container">
                <div className="orderpayment-container">
                    <OrderpayPoint point={point} selectedItems={purchaseItem } onUpdateUsingPoint={onUpdateUsingPoint}/>
                </div>
            </div>
        </div>
    );
}

export default OrderPane;
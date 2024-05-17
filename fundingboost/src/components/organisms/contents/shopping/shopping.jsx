import React, { useState, useEffect } from 'react';
import './shopping.scss';
import axios from "axios";
import ShoppingSingleItem from "../../../atoms/shopping-single-item/shopping-single-item";
import ShoppingCategory from "../../../atoms/Shopping-Item-Category/shopping-item-category";

const ShoppingPane = () => {
    const [itemData, setItemData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://8bef-112-218-95-58.ngrok-free.app/api/v1/items', {
                    responseType: 'json',
                    headers: ({
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                        "ngrok-skip-browser-warning": true,
                    }),
                });
                setItemData(response.data.data);
                console.log("response ->", response.data.data);
            } catch (error) {
                console.error("Error data:", error);
            }
        };
        fetchData();
    }, []);

    return(
        <div className="shopping-container">
            <div className="ranking-item-area">
                <ShoppingCategory/>
                <div className="shopping-item-list-single">
                    {itemData && itemData.map((product, index) => (
                        <div className="shopping-single-item" key={index}>
                            <ShoppingSingleItem product={product} key={index}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShoppingPane;
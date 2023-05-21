import React, { useState } from 'react';
import Popup from "reactjs-popup";
import { Button } from "react-bootstrap";
import '../style/Header.css';

function MenuItem({ image, name, price, quantity, handleAddItem }) {
    const [menuListClone, setMenuListClone] = useState([]);
    const [purchased, setPurchased] = useState(false);
    const formattedPrice = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);
    const [showDetail, setShowDetail] = useState(false);
    const [showBuyText, setShowBuyText] = useState(false);
    const handleCloseModal = () => {
        setShowDetail(false);
    };

    const handleOpenDetail = () => {
        setShowDetail(true);
    };

    const handleBuyClick = () => {
        handleAddItem(image, name, price);
        setPurchased(true);
        setShowBuyText(true);
        handleUpdateQuantity();
    };

    const handleUpdateQuantity = () => {
        setMenuListClone((prevMenuList) => {
            const updatedMenuList = prevMenuList.map((menuItem) =>
                menuItem.name === name ? { ...menuItem, quantity: 1 } : menuItem
            );
            return updatedMenuList;
        });
    };

    return (
        <div className="menuItem col-5 ">
            <div className="menuItem">
                <div
                    style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
                    onClick={handleOpenDetail}
                ></div>
                <h6>{name}: </h6> <p> {formattedPrice}</p>
                <br></br>
                <Button
                    className="btn btn-light border border-secondary"
                    id={name}
                    onClick={handleBuyClick}
                >
                    {quantity === 0 && <>Mua</>}
                    {(quantity === 1 || purchased) && <>Đã mua!</>}
                </Button>
            </div>

            <Popup
                modal
                closeOnDocumentClick
                className="modal"
                contentStyle={{ maxWidth: "600px", width: "90%" }}
                open={showDetail}
            >
                <div className="model-pop-up">
                    <div className="menuItemPopUp">
                        <div
                            className="pop-up-Image"
                            style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
                            onClick={handleOpenDetail}
                        ></div>
                        <h6>{name}: </h6>{" "}
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            <br></br> Lorem Ipsum has been the industry's standard dummy text ever since
                            the 1500s
                        </p>
                        <div className="mua-dong">
                            <Button onClick={handleBuyClick}>
                                {quantity === 0 && <>Mua</>}
                                {(quantity === 1 || purchased) && <>Đã mua!</>}
                            </Button>
                            <Button onClick={handleCloseModal}>Đóng</Button>
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default MenuItem;

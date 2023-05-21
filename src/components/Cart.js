import '../style/Cart.css'
import { React, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/Header.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from "react-bootstrap";
import Popup from "reactjs-popup";
import axios from 'axios';


function Cart({ cartItems, handleAddItem, handleRemoveProduct }) {

    const totalPrice = cartItems
        ? cartItems.reduce((price, item) => price + (item.quantity * item.price), 0)
            .toFixed(2) : 0;
    const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice);
    const [showModal, setShowModal] = useState(false);
    const [buyerName, setBuyerName] = useState("");
    const [phone, setPhone] = useState("");

    const handleBuyClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleBuySubmit = (e) => {
        e.preventDefault();
        const listCakeDTO = cartItems.map((cartItem) => {
            const CakeDTO = {
                nameCake: cartItem.name,
                price: cartItem.price,
                quantity: cartItem.quantity,
            };
            return CakeDTO;
        });

        const customerDTO = {
            name: buyerName,
            phoneNumber: phone,
            dateBuy: Date
        };

        const data = {
            cakeDTOList: listCakeDTO,
            customerDTO: customerDTO
        };

        axios.post('http://localhost:8080/api/buy', data).then
            (response => {
                console.log(response.data);
                // handle the response from the server as needed
            })
            .catch(error => {
                console.error(error);
                // handle errors as needed
            });
        setShowModal(false);
    }

    return (
        <div className='row' >
            <div className='col-6 cart'>
                <div className='cart-items'>
                    {
                        cartItems.length === 0 && (
                            <div className='cart-items-empty'>Empty
                            </div>
                        )
                    }
                    <div>
                        {cartItems.map((item) => (
                            <div key={item.name} className='menuItem'>
                                <div className='cart-Item' style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover' }}></div>
                                <h6>{item.name}:</h6> <p className=' cart-price'>
                                    {item.quantity} * {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                </p>
                                <div className='cart-items-function'>
                                    <button className='add-remove btn btn-success'
                                        onClick={() => handleAddItem(item.image, item.name, item.price)}>+</button>
                                    <button className='add-remove btn btn-danger '
                                        onClick={() => handleRemoveProduct(item.image, item.name, item.price)}>-</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='col-3 total-price' >
                <div className='cart-items-total-price-name'>
                    Total price
                    <div className='cart-Items-total-price'>{formattedPrice}
                    </div>
                </div>

                {showModal && <div className="overlay" />}
                <Popup
                    modal
                    closeOnDocumentClick
                    className="modal"
                    contentStyle={{ maxWidth: "600px", width: "90%" }}
                    open={showModal}
                    onClose={handleCloseModal}
                >
                    <div className="model">
                        <h4>Mua Hàng</h4>
                        <form onSubmit={handleBuySubmit}>
                            <div>
                                <label>Tên người mua:</label>
                                <input
                                    type="text"
                                    value={buyerName}
                                    onChange={(e) => setBuyerName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>SĐT:*</label>
                                <input
                                    type="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" onClick={handleBuySubmit}>Mua</Button>
                        </form>
                    </div>
                </Popup>
                <button onClick={handleBuyClick} className=" btn btn-primary">
                    Mua
                </button>
            </div>
        </div>
    )
}

export default Cart
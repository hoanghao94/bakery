import { React, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/Header.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import Popup from "reactjs-popup";

function Header({ cartItems }) {
    const [numberOfItem, setNumberOfItem] = useState([]);
    const [logInOut, setLogInOut] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setNumberOfItem(cartItems);
    }, [cartItems]);

    const handleLoginClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleLogoutClick = () => {
        setLogInOut(false);
        setUsername("");
        setPassword("");
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setLogInOut(true);
        setShowModal(false);
    };

    return (
        <>
            <nav className="navbar navbar-light bg-light narbar-icons">
                <div className='buttonBackLog'>
                    <button className='btn back' onClick={() => navigate(-1)}>
                        <i className="bi display-7 bi-lg bi-arrow-left"></i>
                    </button>

                    {logInOut ? (
                        <div onClick={handleLogoutClick} className="number loginout">
                            <i className="bi bi-door-open"></i>
                        </div>
                    ) : (
                        <p onClick={handleLoginClick} className="number loginout">
                            <i className="bi bi-door-closed"></i>
                        </p>
                    )}
                </div>
                <h5 className='number'>Xịn Shop</h5>
                <div>
                    <form className="form-inline">
                        <button className='btn shopping-cart'>
                            <Link to="/cart">
                                <i className="fa fa-shopping-cart "></i>
                            </Link>
                            <Link to="/cart" className="number mu" >
                                {numberOfItem && numberOfItem.length ? numberOfItem.length : "0"}
                            </Link>
                        </button>
                    </form>

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
                            <h4>Đăng nhập</h4>
                            <form onSubmit={handleLoginSubmit}>
                                <div>
                                    <label>Tên đăng nhập:</label>
                                    <input
                                    className='dangNhap'
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Mật khẩu:</label>
                                    <input
                                    className='matKhau'
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit">Đăng nhập</Button>
                            </form>
                        </div>
                    </Popup>
                </div>
            </nav>
            <nav className="navbar navbar-expand-lg navbar-light bg-light narbar-icons">
                <div className=" navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav row navbarHeader">
                        <li className="nav-item active col-3">
                            <Link to="/home" className='headerText'>
                                <i className="nav-link">Home <span className="sr-only">(current)</span></i>
                            </Link>
                        </li>
                        <li className="nav-item  col-3">
                            <Link to="/menu" className='headerText'>
                                <i className="nav-link">Features</i>
                            </Link>
                        </li>
                        <li className="nav-item  col-3">
                            <Link to="/cart" className='headerText'>
                                <i className="nav-link" href="#">Pricing</i>
                            </Link>
                        </li>
                        {logInOut &&
                            <li className="nav-item  col-3">
                                <Link to="/table" className='headerText'>
                                    <i className="nav-link" href="#">Sumary</i>
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
            </nav >
        </>
    )
}

export default Header
import { React, createContext, useState, useEffect } from 'react'
import { MenuList } from '../data/MenuList'
import MenuItem from './MenuItem'
import '../style/Menu.css'
import 'bootstrap/dist/css/bootstrap.css';

export const QuantityContext = createContext();

function Menu({ handleAddItem, cartItems }) {
    const [menuListClone, setMenuListClone] = useState([]);

    useEffect(() => {
        const updatedCartItems = MenuList.map(item => ({ ...item, quantity: 0 }))
        cartItems.forEach((item) => {
            updatedCartItems.forEach((cartItem) => {
                if (cartItem.name === item.name) {
                    cartItem.quantity = 1;
                }
            })
        });
        setMenuListClone(updatedCartItems)
    }, [cartItems]);

    return (
        <QuantityContext.Provider value={cartItems}>
            <div className=''>
                <div className='row'>
                    {menuListClone.map((menuItem, key) => {
                        console.log(menuItem)
                        return <MenuItem className='container'
                            key={key}
                            image={menuItem.image}
                            name={menuItem.name}
                            price={menuItem.price}
                            quantity={menuItem.quantity}
                            handleAddItem={handleAddItem}
                        />
                    })}
                </div>
            </div>
        </QuantityContext.Provider>)
}

export default Menu
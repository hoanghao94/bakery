import React, { useState, useEffect } from 'react';
import '../style/Table.css';
function Table() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const response = await fetch('http://localhost:8080/api/buying');
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Customer Name</th>
                    <th>Phone Number</th>
                    <th>Date Buy</th>
                    <th>Cake Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                {data.map((customer) => (
                    customer.cakeDTOList.map((cake) => (
                        <tr key={cake.id}>
                            {cake.nameCake === customer.cakeDTOList[0].nameCake &&
                                <td rowSpan={customer.cakeDTOList.length}>{customer.customerDTO.name}</td>}
                            {cake.nameCake === customer.cakeDTOList[0].nameCake &&
                                <td rowSpan={customer.cakeDTOList.length}>{customer.customerDTO.phoneNumber}</td>}
                            {cake.nameCake === customer.cakeDTOList[0].nameCake &&
                                <td rowSpan={customer.cakeDTOList.length}>{customer.customerDTO.dateBuy}</td>}
                            <td>{cake.nameCake}</td>
                            <td>{cake.quantity}</td>
                            <td>{cake.price}</td>
                            <td>{cake.quantity * cake.price}</td>
                        </tr>
                    ))
                ))}
            </tbody>
        </table>
    );
}

export default Table;

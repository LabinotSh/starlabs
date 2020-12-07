import React, { Component, useEffect, useState } from 'react'
import './products.css';
import {Table, Button} from 'react-bootstrap';
import axios from 'axios';
import {API_URL} from '../../constants/constants';

const Products = () => {

    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchProducts = () => {
        axios.get(API_URL+'/product')
        .then(response => {
            console.log('prods ' + JSON.stringify(response.data))
            setProducts(response.data);
        }).catch(err => {
            console.log(err);
        })

    }

    useEffect(() => {

    },[]);


    return(
        <>
        <Table striped hover bordered variant="dark">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Published Date</th>
                </tr>
            </thead>
            <tbody>
                {products && products.map(item => (
                    <tr key={item._id}>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                        <td>{item.stock}</td>
                        <td>{item.createAt}</td>
                    </tr>      
                ))}
            </tbody>
        </Table>
        </>
    );
}

export default Products;
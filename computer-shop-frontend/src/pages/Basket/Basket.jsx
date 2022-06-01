import React, {useEffect, useState} from 'react';
import {Button, Container, Typography} from "@mui/material";
import $api from "../../http";
import {toastr} from "react-redux-toastr";
import ComputersList from "../../components/Computers/ComputersList/ComputersList";
import ProductsList from "../../components/Products/ProductsList/ProductsList";

const Basket = () => {

    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        $api.get("/user/basket")
            .then(value => {
                setProducts(value.data);
                setLoading(false);
            })
            .catch(reason => {
                toastr.error("Computer shop", "Виникли технічні проблеми");
            });
    }, [])

    return (
        <Container maxWidth="xl" sx={{marginTop: "64px", paddingTop: "10px"}} style={{minHeight: "100vh"}}>
            <Typography variant="h2" component="div">
                Кошик
            </Typography>
            <div>
                <ProductsList products={products} isLoading={isLoading} setProducts={setProducts} isBasket={true}/>
            </div>
            {
                products.length !== 0 &&
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <Button variant="contained" color="success">Оформити замовлення</Button>
                </div>
            }
        </Container>
    );
};

export default Basket;
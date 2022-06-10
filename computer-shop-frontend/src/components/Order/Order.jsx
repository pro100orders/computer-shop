import React from 'react';
import {Typography} from "@mui/material";

const Order = ({order}) => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            border: "1px solid green",
            borderRadius: "5px",
            margin: 2,
            padding: 10
        }}>
            <div>
                <Typography variant="h5" component="div">
                    ID - {order.id}
                </Typography>
                <Typography variant="h5" component="div">
                    Статус - {order.status}
                </Typography>
            </div>
            <div>
                {
                    order.products &&
                    <div>
                        <Typography variant="h5" component="div">
                            Кількість товарів - {order.products.length}
                        </Typography>
                        <Typography variant="h5" component="div">
                            Товари:
                            <Typography variant="h6" component="div" style={{display: "flex", flexWrap: "wrap", margin: 0}}>
                                {
                                    order.products.map(product => (
                                        <pre>{product.name} </pre>
                                    ))
                                }
                            </Typography>
                        </Typography>
                    </div>
                }
            </div>
            <div>
                <Typography variant="h5" component="div">
                    Загальна ціна - {order.totalPrice} грн.
                </Typography>
            </div>
        </div>
    );
};

export default Order;
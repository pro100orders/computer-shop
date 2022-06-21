import React, {useEffect, useState} from 'react';
import $api from "../../../http";
import {toastr} from "react-redux-toastr";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const Reporting = () => {

    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [report, setReport] = useState(1);

    useEffect(() => {
        setLoading(true);
        $api.get("/admin/reporting/" + report)
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(reason => {
                toastr.error("Computer shop", "Виникли технічні проблеми");
            });
    }, [report])

    console.log(products);
    return (
        <div>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                <FormControl sx={{m: 1, minWidth: 240}}>
                    <InputLabel>Звітність</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={report}
                        label="Sorting"
                        variant={"filled"}
                        onChange={e => {
                            setReport(e.target.value);
                        }}
                    >
                        <MenuItem value={1}>Саме більше замовлень</MenuItem>
                        <MenuItem value={2}>Саме менше замовлень</MenuItem>
                        <MenuItem value={3}>Найдорожчі</MenuItem>
                        <MenuItem value={4}>Найдешевші</MenuItem>
                        <MenuItem value={5}>Мала кількість</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                {
                    products.map((product) => (
                        <div style={{margin: 2, border: "1px solid green",
                            display: "flex", justifyContent: "space-between",
                            borderRadius: 5, padding: 10}}>
                            <div>
                                ID: {product.id}
                            </div>
                            <div>
                                {product.name}
                            </div>
                            <div>
                                {product.price}грн.
                            </div>
                            <div>
                                {product.amount}шт.
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Reporting;
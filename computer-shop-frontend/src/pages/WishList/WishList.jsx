import React, {useEffect, useState} from 'react';
import {toastr} from "react-redux-toastr";
import $api from "../../http";
import {Container, Typography} from "@mui/material";
import ComputersList from "../../components/Computers/ComputersList/ComputersList";

const WishList = () => {

    const [books, setBooks] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        $api.get("/user/wish-list")
            .then(response => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch(reason => {
                toastr.error("Computer shop", "Виникли технічні проблеми");
            });
    }, [])

    return (
        <Container maxWidth="xl" sx={{marginTop: "10px", paddingTop: "10px"}} style={{minHeight: "100vh"}}>
            <Typography variant="h2" component="div">
                Список бажань
            </Typography>
            <div>
                <ComputersList books={books} isLoading={isLoading} setBooks={setBooks}/>
            </div>
        </Container>
    );
};

export default WishList;
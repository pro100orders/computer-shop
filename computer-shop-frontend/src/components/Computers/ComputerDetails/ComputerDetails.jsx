import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import $api from "../../../http";
import {Button, Checkbox, Container, Typography} from "@mui/material";
import {toastr} from "react-redux-toastr";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {useSelector} from "react-redux";
import EditComputerForm from "../EditComputerForm/EditComputerForm";
import AddComputerForm from "../AddComputerForm/AddComputerForm";
import MyModal from "../../UI/Modal/MyModal";

const ComputerDetails = () => {

    const [computer, setComputer] = useState({});
    const [isLoading, setLoading] = useState(true);

    const params = useParams();

    const roles = useSelector(state => state.auth.user.roles);

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        $api.get("/conputers/" + params.id)
            .then((response) => {
                setComputer(response.data);
                setLoading(false);
            })
            .catch(reason => {
                toastr.error("Store", "Виникли технічні проблеми");
            });
        ;
    }, []);

    const navigateToLogin = () => {
        navigate("/login");
        toastr.info("Store", "Щоб переглядати список бажаного потрібно авторизуватись");
    }

    const addToBasket = (id) => {
        $api.post("/user/basket", id)
            .then(response => {
                toastr.success("Bookstore", "Книжка успішно додана до кошика");
            })
            .catch(reason => {
                toastr.error("Bookstore", "Виникли технічні проблеми");
            });
    }

    const deleteBook = (id) => {
        $api.delete("/books/" + id)
            .then(response => {
                if(response.data === true) {
                    toastr.success("Bookstore", "Книжка успішно видалена");
                    navigate("/books");
                }
            })
            .catch(reason => {
                toastr.error("Bookstore", "Виникли технічні проблеми");
            });
    }

    return (
        <Container maxWidth="xl" sx={{marginTop: "64px", paddingTop: "10px"}} style={{minHeight: "100vh"}}>
            {
                isLoading ?
                    <div>
                        Загрузка даних...
                    </div>
                    :
                    <div>
                        {
                            open &&
                            <MyModal open={open} setOpen={setOpen}
                                     children={<EditComputerForm book={computer} setOpen={setOpen}/>}/>
                        }
                        <Typography variant="h2" component="div">
                            {computer.name}
                        </Typography>
                        <div style={{display: "flex"}}>
                            <div>
                                <img src={"http://localhost:8080/files/" + computer.image} alt={computer.name}/>
                            </div>
                            <div>
                                <Typography variant="h5" component="div">
                                    Ціна : {computer.price} грн.
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Процессор : {computer.processor}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Відеокарта : {computer.vidaoCard}
                                </Typography>
                                <div style={{display: "flex", justifyContent: "flex-end"}}>
                                    <Button variant="contained" color="success" onClick={() => addToBasket(computer.id)}>
                                        Додати в кошик
                                    </Button>
                                </div>
                                {
                                    roles && roles.includes("ROLE_ADMIN") &&
                                    <div style={{display: "flex", justifyContent: "space-between", marginTop: 5}}>
                                        {/*<Button variant="contained" color="warning" onClick={() => setOpen(true)}>
                                            Редагувати
                                        </Button>*/}
                                        <Button variant="contained" color="error" onClick={() => deleteBook(computer.id)}>
                                            Видалити
                                        </Button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
            }
        </Container>
    );
};

export default ComputerDetails;
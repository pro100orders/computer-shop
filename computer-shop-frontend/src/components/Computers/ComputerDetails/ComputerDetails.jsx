import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import $api from "../../../http";
import {Button, Container, Typography} from "@mui/material";
import {toastr} from "react-redux-toastr";
import {useSelector} from "react-redux";
import EditComputerForm from "../EditComputerForm/EditComputerForm";
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
        $api.get("/computers/" + params.id)
            .then((response) => {
                setComputer(response.data);
                setLoading(false);
            })
            .catch(reason => {
                toastr.error("Computer shop", "Виникли технічні проблеми");
            });
        ;
    }, []);

    const navigateToLogin = () => {
        navigate("/login");
        toastr.info("Computer shop", "Щоб переглядати список бажаного потрібно авторизуватись");
    }

    const addToBasket = (id) => {
        $api.post("/user/basket", id)
            .then(response => {
                toastr.success("Computer shop", "Комп'ютер успішно додано до кошика");
            })
            .catch(reason => {
                toastr.error("Computer shop", "Виникли технічні проблеми");
            });
    }

    const deleteBook = (id) => {
        $api.delete("/computers/" + id)
            .then(response => {
                if (response.data === true) {
                    toastr.success("Computer shop", "Комп'ютер успішно видалено");
                    navigate("/computers");
                }
            })
            .catch(reason => {
                toastr.error("Computer shop", "Виникли технічні проблеми");
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
                                     children={<EditComputerForm computer={computer} setOpen={setOpen}/>}/>
                        }
                        <Typography variant="h2" component="div">
                            {computer.name}
                        </Typography>
                        <div style={{display: "flex"}}>
                            <div>
                                <img src={"http://localhost:8080/files/" + computer.image} alt={computer.name}/>
                            </div>
                            <div style={{border: "1px solid blue"}}>
                                <Typography variant="h6" component="div">
                                    Ціна : {computer.price} грн.
                                </Typography>
                                <hr/>
                                <Typography variant="h5" component="div">
                                    Процесор
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Процессор : {computer.processor}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Продуктивність процесору : {computer.processorPerformance}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Кількість ядер : {computer.processorAmountCores}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Тактова частота : {computer.processorFrequency}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Кількість потоків : {computer.processorAmountThreads}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Об'єм кеша : {computer.processorCacheSize}
                                </Typography>
                                <hr/>
                                <Typography variant="h5" component="div">
                                    Відеокарта
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Тип відеокарти : {computer.videoCardType}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Відеокарта : {computer.videoCard}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Обсяг відеопам'яті : {computer.videoCardAmountMemory}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Тип відеопам'яті : {computer.videoCardTypeMemory}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Продуктивність відеокарти : {computer.videoCardPerformance}
                                </Typography>
                                <hr/>
                                <Typography variant="h5" component="div">
                                    Материнська плата
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Материнська плата : {computer.motherboard}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Максимальна кількість слотів пам'яті : {computer.motherboardMemorySlots}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Максимальний обсяг пам'яті : {computer.motherboardMaxAmountMemory}
                                </Typography>
                                <hr/>
                                <Typography variant="h5" component="div">
                                    Оперативна пам'ять
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Обсяг оперативної пам'яті : {computer.RAMVolume}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Частота оперативної пам'яті : {computer.RAMFrequency}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Тип оперативної пам'яті : {computer.RAMType}
                                </Typography>
                                <hr/>
                                <Typography variant="h5" component="div">
                                    Привід
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Тип приводу : {computer.driveType}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Об'єм HDD : {computer.driveVolumeHDD}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Об'єм SSD : {computer.driveVolumeSSD}
                                </Typography>
                                <hr/>
                                <div style={{display: "flex", justifyContent: "flex-end", margin: 2}}>
                                    <Button variant="contained" color="success" onClick={() => addToBasket(computer.id)}>
                                        Додати в кошик
                                    </Button>
                                </div>
                                {
                                    roles && roles.includes("ROLE_ADMIN") &&
                                    <div style={{display: "flex", justifyContent: "space-between", margin: 2}}>
                                        <Button variant="contained" color="warning" onClick={() => setOpen(true)}>
                                            Редагувати
                                        </Button>
                                        <Button variant="contained" color="error"
                                                onClick={() => deleteBook(computer.id)}>
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
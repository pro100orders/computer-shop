import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import $api from "../../../http";
import {Button, Container, Typography} from "@mui/material";
import {toastr} from "react-redux-toastr";
import {useSelector} from "react-redux";
import EditLaptopForm from "../EditLaptopForm/EditLaptopForm";
import MyModal from "../../UI/Modal/MyModal";

const LaptopDetails = () => {

    const [laptop, setLaptop] = useState({});
    const [isLoading, setLoading] = useState(true);

    const params = useParams();

    const roles = useSelector(state => state.auth.user.roles);

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        $api.get("/laptops/" + params.id)
            .then((response) => {
                setLaptop(response.data);
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
                toastr.success("Computer shop", "Ноутбук успішно додано до кошика");
            })
            .catch(reason => {
                toastr.error("Computer shop", "Виникли технічні проблеми");
            });
    }

    const deleteBook = (id) => {
        $api.delete("/laptops/" + id)
            .then(response => {
                if (response.data === true) {
                    toastr.success("Computer shop", "Ноутбук успішно видалено");
                    navigate("/laptops");
                }
            })
            .catch(reason => {
                toastr.error("Computer shop", reason.response.data.error);
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
                                     children={<EditLaptopForm laptop={laptop} setOpen={setOpen}/>}/>
                        }
                        <Typography variant="h2" component="div">
                            {laptop.name}
                        </Typography>
                        <div style={{display: "flex"}}>
                            <div>
                                <img src={"http://localhost:8080/files/" + laptop.image} alt={laptop.name}/>
                            </div>
                            <div style={{border: "1px solid green", padding: 20}}>
                                <Typography variant="h6" component="div">
                                    Ціна : {laptop.price} грн.
                                </Typography>
                                <hr style={{borderColor: "green"}}/>
                                <Typography variant="h5" component="div">
                                    Процесор
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Процессор : {laptop.processor}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Продуктивність : {laptop.processorPerformance}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Кількість ядер : {laptop.processorAmountCores}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Кількість потоків : {laptop.processorAmountThreads}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Об'єм кеша : {laptop.processorCacheSize}
                                </Typography>
                                <hr style={{borderColor: "green"}}/>
                                <Typography variant="h5" component="div">
                                    Відеокарта
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Тип відеокарти : {laptop.videoCardType}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Відеокарта : {laptop.videoCard}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Обсяг : {laptop.videoCardAmountMemory}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Тип відеопам'яті : {laptop.videoCardTypeMemory}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Продуктивність : {laptop.videoCardPerformance}
                                </Typography>
                                <hr style={{borderColor: "green"}}/>
                                <Typography variant="h5" component="div">
                                    Дисплей
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Діагональ : {laptop.displayDiagonal}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Дозвіл : {laptop.displayMatrixType}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Частота оновлення : {laptop.displayFrequency}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Покриття : {laptop.displayCoverage}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Додатково : {laptop.displayInformation}
                                </Typography>
                                <hr style={{borderColor: "green"}}/>
                                <Typography variant="h5" component="div">
                                    Оперативна пам'ять
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Обсяг : {laptop.ramVolume}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Частота : {laptop.ramFrequency}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Кількість слотів : {laptop.ramSlots}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Максимальний підтримуваний обсяг : {laptop.ramMax}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Додатково : {laptop.ramInformation}
                                </Typography>
                                <hr style={{borderColor: "green"}}/>
                                <Typography variant="h5" component="div">
                                    Привід
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Тип приводу : {laptop.driveType}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Об'єм HDD : {laptop.driveVolumeHDD}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Об'єм SSD : {laptop.driveVolumeSSD}
                                </Typography>
                                <hr style={{borderColor: "green"}}/>
                                <div style={{display: "flex", justifyContent: "flex-end", margin: 2}}>
                                    <Button variant="contained" color="success" onClick={() => addToBasket(laptop.id)}>
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
                                                onClick={() => deleteBook(laptop.id)}>
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

export default LaptopDetails;
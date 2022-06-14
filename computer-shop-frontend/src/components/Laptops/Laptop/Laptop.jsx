import {useSelector} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import {toastr} from "react-redux-toastr";
import $api from "../../../http";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

const Laptop = ({laptop, isBasket}) => {

    const roles = useSelector(state => state.auth.user.roles);

    const navigate = useNavigate();

    const navigateToLogin = (i) => {
        navigate("/login");
        toastr.info("Computer shop", "Щоб добавити в кошик потрібно авторизуватись");
    }

    const deleteWithBasket = (id) => {
        $api.post("/user/basket", id)
            .then(response => {
                toastr.success("Computer shop", "Ноутбук успішно видалений з кошика");
            })
            .catch(reason => {
                toastr.error("Computer shop", "Виникли технічні проблеми");
            });
    }

    const addToBasket = (id) => {
        $api.post("/user/basket", id)
            .then(response => {
                toastr.success("Computer shop", "Ноутбук успішно доданий до кошика");
            })
            .catch(reason => {
                toastr.error("Computer shop", "Виникли технічні проблеми");
            });
    }

    console.log(laptop)
    return (
        <Card sx={{
            width: "600px",
            margin: 1,
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex"
        }}>
            <CardMedia
                component="img"
                image={"http://localhost:8080/files/" + laptop.image}
                alt="book"
                sx={{width: "300px", height: "370px"}}
            />
            <div>
                <CardContent sx={{height: 120}}>
                    <Typography gutterBottom variant="body1" component="div">
                        <NavLink to={`/laptops/${laptop.id}`}>{laptop.name}</NavLink>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Дисплей - {laptop.displayDiagonal} дюймів
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Процесор - {laptop.processor}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Відеокарта - {laptop.videoCard}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Оперативна память - {laptop.ramVolume}гб.
                    </Typography>
                    <Typography variant="subtitle1" color="orange">
                        {laptop.price}.грн
                    </Typography>
                </CardContent>
                <CardActions style={{display: "flex", justifyContent: "flex-end"}}>
                    {
                        isBasket ?
                            <Button variant="contained" color="success" onClick={(e) => deleteWithBasket(laptop.id)}>
                                Видалити
                            </Button>
                            :
                            <Button variant="contained" color="success" onClick={(e) => {
                                (roles && roles.includes("ROLE_GUEST")) ?
                                    navigateToLogin(2)
                                    :
                                    addToBasket(laptop.id)
                            }}>
                                Купити
                            </Button>
                    }
                </CardActions>
            </div>
        </Card>
    );
};

export default Laptop;
import {useSelector} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import {toastr} from "react-redux-toastr";
import $api from "../../../http";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

const Computer = ({computer, isBasket}) => {

    const roles = useSelector(state => state.auth.user.roles);

    const navigate = useNavigate();

    const navigateToLogin = (i) => {
        navigate("/login");
        toastr.info("Computer shop", "Щоб добавити в кошик потрібно авторизуватись");
    }

    const deleteWithBasket = (id) => {
        $api.post("/user/basket", id)
            .then(response => {
                toastr.success("Computer shop", "Комп'ютер успішно видалена з кошика");
            })
            .catch(reason => {
                toastr.error("Computer shop", "Виникли технічні проблеми");
            });
    }

    const addToBasket = (id) => {
        $api.post("/user/basket", id)
            .then(response => {
                toastr.success("Computer shop", "Комп'ютер успішно додана до кошика");
            })
            .catch(reason => {
                toastr.error("Computer shop", "Виникли технічні проблеми");
            });
    }

    return (
        <Card sx={{
            width: "600px",
            margin: 1,
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            justifyContent: "space-between"
        }}>
            <CardMedia
                component="img"
                image={"http://localhost:8080/files/" + computer.image}
                alt="book"
                sx={{width: "300px", height: "370px"}}
            />
            <div>
                <CardContent sx={{height: 120}}>
                    <Typography gutterBottom variant="body1" component="div">
                        <NavLink to={`/computers/${computer.id}`}>{computer.name}</NavLink>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Процесор - {computer.processor}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Відеокарта - {computer.videoCard}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Опис - {computer.description}
                    </Typography>
                    <Typography variant="subtitle1" color="orange">
                        {computer.price}.грн
                    </Typography>
                </CardContent>
                <CardActions style={{display: "flex", justifyContent: "flex-end"}}>
                    {
                        isBasket ?
                            <Button variant="contained" color="success" onClick={(e) => deleteWithBasket(computer.id)}>
                                Видалити
                            </Button>
                            :
                            <Button variant="contained" color="success" onClick={(e) => {
                                (roles && roles.includes("ROLE_GUEST")) ?
                                    navigateToLogin(2)
                                    :
                                    addToBasket(computer.id)
                            }}>
                                Купити
                            </Button>
                    }
                </CardActions>
            </div>
        </Card>
    );
};

export default Computer;
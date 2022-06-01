import {useSelector} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import {toastr} from "react-redux-toastr";
import $api from "../../../http";
import {Button, Card, CardActions, CardContent, CardMedia, Checkbox, Link, Typography} from "@mui/material";

const Product = ({product, setProducts, isBasket}) => {

    const roles = useSelector(state => state.auth.user.roles);

    const navigate = useNavigate();

    const navigateToLogin = (i) => {
        navigate("/login");
        toastr.info("Store", "Щоб добавити в кошик потрібно авторизуватись");
    }

    const deleteWithBasket = (id) => {
        $api.post("/user/basket", id)
            .then(response => {
                setProducts(prevState => prevState.filter(product => product.id !== id));
                toastr.success("Store", "Книжка успішно видалена з кошика");
            })
            .catch(reason => {
                toastr.error("Store", "Виникли технічні проблеми");
            });
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

    return (
        <Card sx={{width: "600px", margin: 1, marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "space-between"}}>
            <CardMedia
                component="img"
                image={"http://localhost:8080/files/" + product.image}
                alt="book"
                sx={{width: "200px", height: "370px"}}
            />
            <CardContent sx={{height: 120}}>
                <Typography gutterBottom variant="body1" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Опис - {product.description}
                </Typography>
                <Typography variant="subtitle1" color="orange">
                    {product.price}.грн
                </Typography>
            </CardContent>
            <CardActions style={{display: "flex", justifyContent: "flex-end"}}>
                {
                    isBasket ?
                        <Button variant="contained" color="success" onClick={(e) => deleteWithBasket(product.id)}>
                            Видалити
                        </Button>
                        :
                        <Button variant="contained" color="success" onClick={(e) => {
                            (roles && roles.includes("ROLE_GUEST")) ?
                                navigateToLogin(2)
                                :
                                addToBasket(product.id)
                        }}>
                            Купити
                        </Button>
                }
            </CardActions>
        </Card>
    );
};

export default Product;
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
        toastr.info("Laptop shop", "Щоб добавити в кошик потрібно авторизуватись");
    }

    const deleteWithBasket = (id) => {
        $api.post("/user/basket", id)
            .then(response => {
                setProducts(prevState => prevState.filter(product => product.id !== id));
                toastr.success("Laptop shop", "Книжка успішно видалена з кошика");
            })
            .catch(reason => {
                toastr.error("Laptop shop", "Виникли технічні проблеми");
            });
    }

    const addToBasket = (id) => {
        $api.post("/user/basket", id)
            .then(response => {
                toastr.success("Laptop shop", "Книжка успішно додана до кошика");
            })
            .catch(reason => {
                toastr.error("Laptop shop", "Виникли технічні проблеми");
            });
    }

    return (
        <Card sx={{height: "510px", margin: 1, marginLeft: "auto", marginRight: "auto"}}>
            <CardMedia
                component="img"
                image={"http://localhost:8080/files/" + product.image}
                alt="book"
                sx={{width: "300px", height: "370px"}}
            />
            <CardContent>
                <Typography gutterBottom variant="body1" component="div">
                    {product.name}
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
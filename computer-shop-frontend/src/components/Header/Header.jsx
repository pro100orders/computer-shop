import React from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Header = () => {

    const roles = useSelector(state => state.auth.user.roles);

    const [navbarMenu, setNavbarMenu] = React.useState(null);
    const [userMenu, setUserMenu] = React.useState(null);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logout = () => {
        if (localStorage.getItem("token"))
            localStorage.removeItem("token");
        dispatch({type: "SET_AUTH", payload: {token: '', user: {roles: ['ROLE_GUEST']}}});
    }

    return (
        <AppBar position="static" style={{background: "white"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters style={{display: "flex", justifyContent: "space-between", color: 'black',}}>
                    <Typography
                        variant="h6"
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                        }}
                    >
                        Computer-shop
                    </Typography>
                    <div style={{width: "50%"}}>
                        <div style={{display: "flex"}}>
                            <h4 style={{margin: "0 0 0 0"}}>
                                (068)-025-01-12
                            </h4>
                            <h4 style={{margin: "0 0 0 10px"}}>
                                <a href="https://www.instagram.com/1xthetab/" style={{textDecoration: "none", marginLeft: 10}}>
                                    Instagram
                                </a>
                            </h4>
                            <h4 style={{margin: "0 0 0 10px"}}>
                                <a href="https://www.facebook.com/profile.php?id=100016400701923" style={{textDecoration: "none", marginLeft: 10}}>
                                    Facebook
                                </a>
                            </h4>
                            <h4 style={{margin: "0 0 0 10px"}}>
                                <a href="https://t.me/bez_imeni18" style={{textDecoration: "none", marginLeft: 10}}>
                                    Telegram
                                </a>
                            </h4>
                        </div>
                        <hr style={{borderColor: "green"}}/>
                        <div style={{display: "flex"}}>
                            <p style={{margin: "0 0 0 0"}}>
                                Доставка
                            </p>
                            <p style={{margin: "0 0 0 10px"}}>
                                Оплата
                            </p>
                            <p style={{margin: "0 0 0 10px"}}>
                                Гарантія
                            </p>
                            <p style={{margin: "0 0 0 10px"}}>
                                Контакти
                            </p>
                        </div>
                    </div>
                    {
                        roles && roles.includes("ROLE_GUEST") ?
                            <Button
                                onClick={e => navigate("/login")}
                                sx={{
                                    my: 2,
                                    color: 'black',
                                    display: 'block',
                                    border: "1px solid black",
                                    borderRadius: "5px"
                                }}
                            >
                                Авторизація
                            </Button>
                            :
                            <Box sx={{flexGrow: 0}}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={e => setUserMenu(e.currentTarget)} sx={{p: 0}}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{mt: '45px'}}
                                    id="menu-appbar"
                                    anchorEl={userMenu}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(userMenu)}
                                    onClose={e => setUserMenu(null)}
                                >
                                    <MenuItem onClick={e => {
                                        setUserMenu(null);
                                        navigate("/profile");
                                    }}>
                                        <Typography textAlign="center">
                                            Профіль
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={e => {
                                        setUserMenu(null);
                                        navigate("/basket");
                                    }}>
                                        <Typography textAlign="center">
                                            Кошик
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={e => {
                                        setUserMenu(null);
                                        navigate("/orders");
                                    }}>
                                        <Typography textAlign="center">
                                            Замовлення
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={e => {
                                        setUserMenu(null);
                                        logout()
                                    }}>
                                        <Typography textAlign="center" style={{color: "red"}}>
                                            Вийти
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                    }
                </Toolbar>
            </Container>
            <Container maxWidth="xl" style={{background: "#4f5250"}}>
                <Toolbar disableGutters>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={e => setNavbarMenu(e.currentTarget)}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={navbarMenu}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(navbarMenu)}
                            onClose={e => setNavbarMenu(null)}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            <MenuItem onClick={e => {
                                setNavbarMenu(null);
                                navigate("/computers");
                            }}>
                                <Typography textAlign="center">Копм'ютери</Typography>
                            </MenuItem>
                            <MenuItem onClick={e => {
                                setNavbarMenu(null);
                                navigate("/laptops");
                            }}>
                                <Typography textAlign="center">Ноутбуки</Typography>
                            </MenuItem>
                            <MenuItem onClick={e => {
                                setNavbarMenu(null);
                                navigate("/admin");
                            }}>
                                <Typography textAlign="center">Адмін</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
                        <Button
                            onClick={e => navigate("/computers")}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            Комп'ютери
                        </Button>
                    </Box>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <Button
                            onClick={e => navigate("/laptops")}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            Ноутбуки
                        </Button>
                    </Box>
                    {
                        roles && roles.includes("ROLE_ADMIN") &&
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            <Button
                                onClick={e => navigate("/admin")}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                Адмін
                            </Button>
                        </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
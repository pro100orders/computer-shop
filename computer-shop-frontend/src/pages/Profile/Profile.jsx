import React, {useEffect, useState} from 'react';
import $api from "../../http";
import {toastr} from "react-redux-toastr";
import {Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Profile = ({setModalProfile, setModalProfileEdit}) => {

    const [user, setUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        $api.get('/user/profile')
            .then(response => {
                setUser(response.data);
            })
            .catch(reason => {
                toastr.error("Computer shop", "Виникли технічні проблеми");
            });
    }, []);

    return (
        <div style={{width: 400, height: 800,  margin: "auto"}}>
            {

            }
            <Typography variant="h3" component="div">
                Мій профіль
            </Typography>
            {
                user.surname &&
                <Typography variant="h5" component="div">
                    Прізвище : {user.surname}
                </Typography>
            }
            {
                user.name &&
                <Typography variant="h5" component="div">
                    Ім'я : {user.name}
                </Typography>
            }
            <Typography variant="h5" component="div">
                Пошта : {user.email}
            </Typography>
            {
                user.phone &&
                <Typography variant="h5" component="div">
                    Номер телефону : {user.phone}
                </Typography>
            }
            {
                user.address &&
                <Typography variant="h5" component="div">
                    Адресса : {user.address}
                </Typography>
            }
        </div>
    );
};

export default Profile;
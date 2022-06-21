import React, {useState} from 'react';
import {Button, Container} from "@mui/material";
import Orders from "../../components/Admin/Orders/Orders";
import Reporting from "../../components/Admin/Reporting/Reporting";

const Admin = () => {

    const [tab, setTab] = useState(0);

    return (
        <div style={{minHeight: "100vh", display: "flex"}}>
            <div style={{width: "15%", borderRight: "1px solid #4f5250", }}>
                <div style={{fontSize: 20, textAlign: "center", padding: 10, color: "#4f5250", fontWeight: "bold"}}>
                    Admin
                </div>
                <div style={{fontSize: 20, marginTop: 10, marginLeft: 20}}>
                    <Button variant="text" onClick={() => setTab(1)}>
                        Замовлення
                    </Button>
                </div>
                <div style={{fontSize: 20, marginTop: 10, marginLeft: 20}}>
                    <Button variant="text" onClick={() => setTab(2)}>
                        Звітність
                    </Button>
                </div>
            </div>
            <div style={{width: "80%", padding: 3}}>
                {
                    tab === 1 &&
                    <Orders/>
                }
                {
                    tab === 2 &&
                    <Reporting/>
                }
            </div>
        </div>
    );
};

export default Admin;
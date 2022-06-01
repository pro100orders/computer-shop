import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import $api from "../../http";
import {toastr} from "react-redux-toastr";
import {Button, Container, FormControl, InputLabel, MenuItem, Pagination, Select} from "@mui/material";
import MyModal from "../../components/UI/Modal/MyModal";
import AddComputerForm from "../../components/Computers/AddComputerForm/AddComputerForm";
import ComputersList from "../../components/Computers/ComputersList/ComputersList";

const Computers = () => {

    const roles = useSelector(state => state.auth.user.roles);

    const [computers, setComputers] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [allPage, setAllPage] = useState(1);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);

    useEffect(() => {
        setLoading(true);
        $api.get("/computers")
            .then(response => {
                setComputers(response.data);
                setLoading(false);
            })
            .catch(reason => {
                toastr.error("Computer shop", "Виникли технічні проблеми");
            });
    }, [])

    useEffect(() => {
        $api.get("/computers/count")
            .then(response => {
                setAllPage(response.data.count);
            })
            .catch(reason => {
                toastr.error("Product shop", "Виникли технічні проблеми");
            });
    }, [])

   return (
        <Container maxWidth="xl" sx={{marginTop: "64px", paddingTop: "10px"}} style={{minHeight: "100vh"}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div>
                    {
                        roles && roles.includes("ROLE_ADMIN") &&
                        <div>
                            <Button onClick={e => setOpen(true)} sx={{border: "1px solid blue", borderRadius: "2px"}}>
                                Додати новий комп'ютер
                            </Button>
                            <MyModal open={open} setOpen={setOpen}
                                     children={<AddComputerForm setBooks={setComputers} setOpen={setOpen}/>}/>
                        </div>
                    }
                </div>
                <FormControl sx={{m: 1, minWidth: 120}}>
                    <InputLabel>Кількість</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={size}
                        label="Size"
                        variant={"filled"}
                        onChange={e => {
                            setSize(e.target.value);
                        }}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={40}>40</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                <div>
                    <ComputersList computers={computers.slice(((page - 1) * size), (page * size))} isLoading={isLoading}/>
                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Pagination count={Math.ceil(allPage / size)} page={page}
                                onChange={(e, value) => setPage(value)}
                                showFirstButton showLastButton shape="rounded"/>
                </div>
            </div>
        </Container>
    );
};

export default Computers;
import {Card, CardActions, CardContent, Skeleton, Typography} from "@mui/material";
import Laptop from "../Laptop/Laptop";

const LaptopsList = ({laptops, isLoading, setProducts, isBasket}) => {

    const mockList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div>
            {
                isLoading ?
                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        {mockList.map(id =>
                            <Card sx={{width: "600px", margin: 1, marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "space-between"}}>
                            <Skeleton variant="rectangular" width={200} height={370}/>
                            <CardContent sx={{height: 120}}>
                            <Skeleton variant="text"/>
                            <Skeleton variant="text"/>
                            <Skeleton variant="text"/>
                            <Skeleton variant="text"/>
                            </CardContent>
                            <CardActions style={{display: "flex", justifyContent: "flex-end"}}>
                            <Skeleton variant="rectangular" width={90} height={36}/>
                            </CardActions>
                            </Card>
                        )}
                    </div>
                    :
                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        {
                            laptops.length === 0 &&
                            <Typography variant="h5" component="div">
                                Ноутбуків немає
                            </Typography>
                        }
                        {
                            laptops.map(laptop =>
                                <Laptop laptop={laptop} key={laptop.id} isBasket={isBasket}/>
                            )
                        }
                    </div>
            }
        </div>
    );
};

export default LaptopsList;
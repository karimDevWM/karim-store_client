import { ListItem, ListItemAvatar, Avatar, ListItemText, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../app/util/util";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, setBasket } from "../Basket/basketSlice";

interface Props{
    product: Product;
}

export default function ProductCard({ product }: Props){
    const {status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    // console.log(product);
    return(
        <>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: 'secondary.main'}}>
                            {product.name?.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    title={product.name}
                    titleTypographyProps={{
                        sx: {fontWeight: 'bold', color: 'secondary.main'}
                    }}
                />
                <CardMedia
                    sx={{ height: 140, backgroundSize: "contain"}}
                    image={process.env.PUBLIC_URL + '/images/' + product.photo}
                    title={product.name}
                />
                <CardContent>
                    <Typography gutterBottom color='secondary' variant="h5">
                        {currencyFormat(product.price)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <LoadingButton 
                        loading={status.includes('pendingAddItem' + product.id)} 
                        onClick={() => dispatch(addBasketItemAsync({productId: product.id}))} 
                        size="small">Add to cart
                    </LoadingButton>
                    <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
                </CardActions>
            </Card>
        </>
    )
}
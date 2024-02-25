import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../Basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
    const {id} = useParams<{id: string}>();
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const product = useAppSelector(state => productSelectors.selectById(state, parseInt(id!)));
    const {status: productStatus} = useAppSelector(state => state.catalog);
    const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find(i => i.productId === product?.id);
    

  useEffect(() => {
    if(item) setQuantity(item.quantity);
    if(!product) dispatch(fetchProductAsync(parseInt(id!)))
  }, [id, item, dispatch, product])

  function handleInputChage(event: ChangeEvent<HTMLInputElement>) {
    if(parseInt(event.currentTarget.value) >= 0) {
      setQuantity(parseInt(event.currentTarget.value));
    }
  }

  function handleUpdateCart() {
    if(!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(addBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}))
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(removeBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}))
    }
  }

  if(productStatus.includes('pending')) return <LoadingComponent message="Loading product..."/>

    if(!product) return <NotFound />

    return(
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <img src={process.env.PUBLIC_URL + '/images/' + product.pictureUrl} alt={product.name} style={{width: "100%"}}/>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3">{product.name}</Typography>
            <Divider sx={{mb: 2}} />
            <Typography variant="h4" color="secondary">€{(product.price)}</Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>{product.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Description</TableCell>
                      <TableCell>{product.description}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell>{product.type}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Brand</TableCell>
                      <TableCell>{product.brand}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Quantity</TableCell>
                      <TableCell>{product.quantityInStock}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField 
                    onChange={handleInputChage}
                    variant="outlined"
                    type="number"
                    label="quantity in cart"
                    fullWidth
                    value={quantity}
                  />
                </Grid>
                <Grid item xs={6}>
                  <LoadingButton
                    disabled={item?.quantity === quantity || !item && quantity === 0}
                    loading={status.includes('pending')}
                    onClick={handleUpdateCart}
                    sx={{height: '55px'}}
                    color="primary"
                    size="large"
                    variant="contained"
                    fullWidth
                  >
                    {item ? "Update Quantity" : "Add to Cart"}
                  </LoadingButton>
                </Grid>
              </Grid>
          </Grid>
        </Grid>
    )
}
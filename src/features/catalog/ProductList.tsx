import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";
import Grid2 from "@mui/material/Unstable_Grid2";

interface Props{
    products: Product[]
}

export default function ProductList({products}: Props) {
    const {productsLoaded} = useAppSelector(state => state.catalog);
    return(
        <>
            <Grid container spacing={4}>
                {products.map(product => (
                    <Grid item xs={4} key={product.id}>
                        {!productsLoaded ? (
                            <ProductCardSkeleton />
                        ):(
                            <ProductCard key={product.id} product={product}/>
                        )}
                    </Grid>
                ))}
            </Grid>
        </>
    )
}
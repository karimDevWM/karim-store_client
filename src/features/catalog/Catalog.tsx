import ProductList from "./ProductList";
import React, { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";


export default function Catalog(){
    // props : properties of App.tsx parent component
    const products = useAppSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const {productsLoaded, status} = useAppSelector(state => state.catalog);

  useEffect(() => {
    if(!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

    if(status.includes('pending')) return <LoadingComponent message="Loading products ..."/>

    return (
        <>
            <ProductList products={products} />
        </>
    )
}
import axios from "axios";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import React, { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { error } from "console";


export default function Catalog(){
    // props : properties of App.tsx parent component

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
    .then(products => setProducts(products))
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
  }, []);

    if(loading) return <LoadingComponent message="Loading products ..."/>

    return (
        <>
            <ProductList products={products} />
        </>
    )
}
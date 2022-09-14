import { useParams, useState, useEffect } from "react-router-dom";
import { useContext } from "react";

import ProductCard from "../../components/product-card/product-car.component";
import { CategoriesContext } from "../../contexts/categories.context";
import "./category.styles.scss"

const Category = () => {
   const {category} = useParams();
   const {categoriesMap} = useContext(CategoriesContext);
   const [products, setProducts] = useState(categoriesMap[category]);

   useEffect(() => {
    setProducts(categoriesMap[category]);
   }, [category, categoriesMap])

   return ( 
    <div className="category-container">
        {products && 
            products.map((product) => (
                <ProductCard key={product.id} product={product} />
                ))}
    </div>
   )


};

export default Category;
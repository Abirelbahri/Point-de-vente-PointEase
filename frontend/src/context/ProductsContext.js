// ProductContext.js
import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Sandiwch', image: "https://i.postimg.cc/TYCFq2Ck/sandwich.png", category: "Food", price: 10.49, numberInStock: 15},
    { id: 2, name: 'Sushi', image: "https://i.postimg.cc/C5wrk9DT/sushi.png", category: "Food", price: 10.49, numberInStock: 0 },
    { id: 3, name: 'Cheese Burger', image: "https://i.postimg.cc/Y08n38f4/burger.png", category: "Food", price: 5.99, numberInStock: 15 },
    { id: 4, name:  'Salad', image: "https://i.postimg.cc/hjL3JKX1/salad.png", category: "Plat", price: 10.49, numberInStock: 15},
    { id: 5, name: 'Pizza', image: "https://i.postimg.cc/ht2YNNtP/download-4.jpg", category: "Food", price: 10.49, numberInStock: 15 },
    { id: 6, name: 'Tacos', image: "https://i.postimg.cc/qB945hZZ/download-3.jpg", category: "Food", price: 4.99, numberInStock: 15},
    { id: 7, name: 'Coconutmilk', image: "https://i.postimg.cc/JnV24szh/coconutmilk.png", category: "Dessert", price: 10.49, numberInStock: 10 },
    { id: 8, name: 'Coca-cola', image: "https://i.postimg.cc/XqWmxpRP/coke.png", category: "Drink", price: 10.49, numberInStock: 15 },
    { id: 9, name: 'Fanta', image: "https://i.postimg.cc/CLF9qnHB/fanta.png", category: "Drink", price: 10.49, numberInStock: 15 },
    { id: 10, name: 'Hotdog', image: "https://i.postimg.cc/9QkkK83Z/hotdog.png", category: "Food", price: 10.49, numberInStock: 15 },
    { id: 11, name: 'Icecream Sandwich', image: "https://i.postimg.cc/5tFrVB1G/Icecream-Sandwich.png", category: "Dessert", price: 10.49, numberInStock: 15 },
    { id: 12, name: 'Mojito', image: "https://i.postimg.cc/PJMc7dh5/Mojito.png", category: "Drink", price: 10.49, numberInStock: 0 },
    { id: 13, name: 'Sausage', image: "https://i.postimg.cc/rmVL55sK/download.jpg", category: "Food", price: 4.99, numberInStock: 14  },
    { id: 14, name: 'Luisiana', image: "https://i.postimg.cc/kXtL6TsT/download-1.jpg", category: "Plat", price: 7.99, numberInStock: 0 },
   

  ]);

  const updateProduct = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
  };

  const value = {
    products,
    updateProduct,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

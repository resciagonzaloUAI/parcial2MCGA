import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './products.module.css';




const Products = (props) => {
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/`);
        const json = await response.json();
        setProducts(json);
      } catch (error) {
        alert('Could not GET Products.', error);
      }}
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
        method: 'DELETE'
      });
      if (response.status === 200) {
        alert('Producto eliminado con éxito.');
        setProducts([...products.filter((product) => product._id !== id)]);
      } else {
        alert('Product could not be removed.');
      }
    } catch (error) {
      alert('Product could not be removed.', error);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.list}>
        <div className={styles.tableTitle}>
          <h2>Productos</h2>
          <button
            className={styles.add}
            onClick={() => {
              props.history.push('/products/form');
            }}
          >
            
            <p>Agregar Producto</p>
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th className={styles.textLeft}>Nombre</th>
              <th className={styles.textLeft}>Descripcion</th>
              <th className={styles.textLeft}>Precio</th>
              <th className={styles.textLeft}>Stock</th>
              <th className={styles.button}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.id}>
                  <td className={styles.textLeft}>{product.name}</td>
                  <td className={styles.textLeft}>{product.description}</td>
                  <td className={styles.textLeft}>$ {product.price}</td>
                  <td className={styles.textLeft}>{product.stock}</td>
                  <td className={styles.buttons}>
                    <Link to={`/products/${product.id}`}>
                      <button className={styles.update}>
                        <p>Actualizar</p>
                      </button>
                    </Link>
                    <button
                      className={styles.delete}
                      onClick={() => {
                        deleteProduct(product.id); 
                      }}
                    >
                      <p> Eliminar </p>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
};

export default Products;
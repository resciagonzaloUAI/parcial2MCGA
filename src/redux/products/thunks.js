import {
    getProductsPending,
    getProductsSuccess,
    getProductsError,
    getByIdProductsPending,
    getByIdProductsSuccess,
    getByIdProductsError,
    deleteProductsPending,
    deleteProductsSuccess,
    deleteProductsError,
    postProductsPending,
    postProductsSuccess,
    postProductsError,
    editProductsPending,
    editProductsSuccess,
    editProductsError
  } from './actions';
  
  export const getProducts = () => {
    return async (dispatch) => {
      dispatch(getProductsPending());
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
        const json = await response.json();
        if(response.status !== 200 ){
          dispatch(getProductsError(json.toString()))
        }else {
          dispatch(getProductsSuccess(json.data));
        }
      } catch (error) {
        dispatch(getProductsError(error.toString()));
      }
    };
  };
  
  export const getByIdProducts = (id) => {
    return async (dispatch) => {
      dispatch(getByIdProductsPending());
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`);
        console.log(response)
        const json = await response.json();
        if(response.status !== 200 ){
          dispatch(getByIdProductsError(json.msg.toString()))
        }else {
          dispatch(getByIdProductsSuccess(json));
        }
      } catch (error) {
        dispatch(getByIdProductsError(error.toString()));
      }
    };
  };
  
  export const deleteProducts = (id) => {
    return async (dispatch) => {
      dispatch(deleteProductsPending());
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
          method: 'DELETE'
        });
        const json = await response.json();
        if(response.status !== 202 ){
          dispatch(deleteProductsError(json.toString()))
        }else {
          dispatch(deleteProductsSuccess(json));
        }
      } catch (error) {
        dispatch(deleteProductsError(error.toString()));
      }
    };
  };
  
  export const postProducts = (id,name,description,price,stock) => {
    return async (dispatch) => {
      dispatch(postProductsPending());
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products`,{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: id, 
              name: name,
              description: description,
              price: price,
              stock: stock
            })
          });
          const json = await response.json();
          if (response.status === 201) {
            dispatch(postProductsSuccess(json));
            console.log('Product added');
          } else {
            console.log('Product could not be Added.');
          }
        } catch (error) {
          dispatch(postProductsError(error.toString()));
          console.log('Product could not be Added.');
        }
    };
  };
  
  export const editProducts = (id,name,description,price,stock) => {
    return async (dispatch) => {
      dispatch(editProductsPending());
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`,{
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              description: description,
              price: price,
              stock: stock
            })
          });
          const json = await response.json();
          if (response.status === 202) {
            dispatch(editProductsSuccess(json));
            console.log('Producto actualizado');
          } else {
            console.log('No se pudo actualizar el producto.');
          }
        } catch (error) {
          dispatch(editProductsError(error.toString()));
          console.log('No se pudo actualizar el producto.');
        }
    };
  };
import * as types from '../constants/ActionTypes';
import callAPI from '../utils/APICaller';


export const actFetchProducts = (products) => {
	return {
		type: types.FETCH_PRODUCT,
		products
	}
}


export const actFetchProductsFromAPI = () => {
	return (dispatch) => {
		return callAPI('products', 'GET', null).then(res => {
			dispatch(actFetchProducts(res.data))
		})

	}
}


export const actDeleteProductFromAPI = (id) =>{
	return (dispatch) => {
		return callAPI(`products/${id}`, 'DELETE', null).then(res => {
			dispatch(actDeleteProduct(id))
		})

	}
}

export const actDeleteProduct = (id) =>{
	return {
		type : types.DELETE_PRODUCT,
		id
	}
}



export const actAddProductFromAPI = (product) =>{
	return dispatch => callAPI('products','POST',product).then(res =>{
		dispatch(actAddProduct(res.data))
	})
}

export const actAddProduct = (product) =>{
	return {
		type: types.ADD_PRODUCT,
		product
	}
}

export const actGetProductFromAPI = (id) =>{
	return dispatch => {
		return callAPI(`products/${id}`,'GET',null).then(res => {
			dispatch(actGetProduct(res.data))
		})
	}
}


export const actGetProduct = (product) =>{

	return  {
		type : types.EDIT_PRODUCT,
		product
	}
}

export const actUpdateProductFromAPI = (product) =>{
	return dispatch => {
		return callAPI(`products/${product.id}`,'PUT',product).then(res =>{
			dispatch(actUpdateProduct(res.data))
		})
	}
}
export const actUpdateProduct = (product) =>{
	return {
		type: types.UPDATE_PRODUCT,
		product
	}
}
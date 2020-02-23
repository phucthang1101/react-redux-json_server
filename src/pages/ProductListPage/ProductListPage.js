import React, { Component } from 'react'
import ProductList from './../../components/ProductList/ProductList';
import ProductItem from './../../components/ProductItem/ProductItem';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/index';


class ProductListPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: []
		}
	}
	componentDidMount() {
		this.props.fetchAllProducts()

	}
	render() {
		//var products = [];
		return (
			<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<Link to='/product/add' type='button' className="btn btn-info mb-10">
					Thêm sản phẩm
               </Link>

				<ProductList>
					{this.showProducts(this.props.products)}
				</ProductList>
			</div>
		)
	}
	showProducts = (products) => {

		var result = null;
		if (products.length > 0) {
			result = products.map((product, index) => {
				return (
					<ProductItem
						key={index}
						product={product}
						index={index}
						onDelete={this.onDelete}
					/>
				)
			})
		}
		return result;
	}

	onDelete = (id) => {
		this.props.onDeleteProduct(id);
	}


}


const mapStateToProps = (state, ownProps) => {
	return {
		products: state.products
	}
}
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchAllProducts: () => {
			dispatch(actions.actFetchProductsFromAPI())
		},
		onDeleteProduct: (id) => {
			dispatch(actions.actDeleteProductFromAPI(id));
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);

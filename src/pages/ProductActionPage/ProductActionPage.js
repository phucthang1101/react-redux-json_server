import React, { Component } from 'react'

import { Link } from 'react-router-dom';
import * as actions from '../../actions/index';
import {connect} from 'react-redux';

class ProductActionPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			txtName: '',
			txtPrice: '',
			chkbStatus: ''
		}
	}
	componentDidMount() {
		var { match } = this.props;
		if (match) {
			var id = match.params.id;
			this.props.onEditProduct(id);	
		}
	}

	componentWillReceiveProps(nextprops)
	{
		if(nextprops && nextprops.itemEditing)
		{
			
			var {itemEditing} = nextprops;
			this.setState({
				id: itemEditing.id,
				txtName: itemEditing.name,
				txtPrice: itemEditing.price,
				chkbStatus: itemEditing.status
			})
		}
	}

	onChange = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.type === 'checkbox' ? target.checked : target.value;
		this.setState({
			[name]: value
		})
	}
	onSave = (event) => {

		event.preventDefault();
		var { txtName, txtPrice, chkbStatus,id } = this.state;
		var { history } = this.props;
		var product = {
			id: id,
			name: txtName,
			price: txtPrice,
			status: chkbStatus
		}
		if(id){
			//update
			
			this.props.onUpdateProduct(product)
			
		}
		else{
			//add
			
			this.props.onAddProduct(product);
			
		}
		history.goBack();
		
	}

	render() {
		var { txtName, txtPrice, chkbStatus } = this.state;
		
		return (
			<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
				<form onSubmit={this.onSave}>
					<div className="form-group">
						<label>Tên sản phẩm: </label>
						<input
							type="text"
							className="form-control"
							name="txtName"
							value={txtName}
							onChange={this.onChange} />
					</div>

					<div className="form-group">
						<label>Giá: </label>
						<input
							type="number"
							className="form-control"
							name="txtPrice"
							value={txtPrice}
							onChange={this.onChange} />
					</div>

					<div className="form-group">
						<label>Trạng thái: </label>

					</div>

					<div className="checkbox">
						<label>
							<input
								type="checkbox"
								name="chkbStatus"
								value={chkbStatus}
								
								onChange={this.onChange} 
								checked={chkbStatus } 
								/>
							Còn hàng
         			   </label>
					</div>
					
					<button type="submit" className="btn btn-primary mr-10">Lưu lại </button>
					<Link to='/product-list' className="btn btn-danger ">
						Quay lại
					</Link>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		itemEditing: state.itemEditing
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onAddProduct: (product) => {
			dispatch(actions.actAddProductFromAPI(product))
		},
		onEditProduct: (id) =>{
			dispatch(actions.actGetProductFromAPI(id))
		},
		onUpdateProduct: (product) =>{
			dispatch(actions.actUpdateProductFromAPI(product))
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);

import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class ProductItem extends Component {
	onDelete = (id) => {
		if (window.confirm('Bạn có chắc chắn muốn xóa ?')) {
			this.props.onDelete(id);
		}
	}
	render() {
		var { product, index } = this.props;
		var status = product.status ? 'Còn hàng' : 'Hết hàng';
		var statusClass = product.status ? 'warning' : 'default';
		return (
			<tr>
				<td>{index + 1}</td>
				<td>{product.id}</td>
				<td>{product.name}</td>
				<td>{product.price}</td>
				<td>
					<span className={`label label-${statusClass}`}>
						{status}
					</span></td>
				<td>
					
					<Link
					to={`/product/edit/${product.id}`}
					className="btn btn-success mr-10"
					>
						Sửa
					</Link>
					<button
						type="button"
						className="btn btn-danger"
						onClick={() => this.onDelete(product.id)}
					>
						Xóa</button>

				</td>
			</tr>

		)
	}
}


export default ProductItem;

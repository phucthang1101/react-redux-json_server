import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

const menus = [
	{
		name: 'Trang chủ',
		to: '/',
		exact: true
	},
	{
		name: 'Sản phẩm',
		to: '/product-list',
		exact: false
	},
]
const MenuLink = ({ label, to, activeWhenOnlyExact }) => {
		return(
			<Route
			path={to}
			exact={activeWhenOnlyExact}
			children={({match}) =>{
				var active = match ? 'active' : '';
				return (
					<li className={active}>
						<Link to={to}>
							{label}
						</Link>
					</li>
				)
			}}

			/>
		)

}
class Menu extends Component {
	render() {
		return (


			<div className="navbar navbar-default">
				<a className="navbar-brand">Call API</a>
				<ul className="nav navbar-nav">
					{this.showMenus(menus)}
					<li className='active'>
						<Link to='abc'>
							abc
						</Link>
					</li>
				</ul>
			</div>

		)
	}
	showMenus = (menus) =>{
		var result = null;
		if(menus.length > 0)
		{
			result = menus.map((menu,index)=>{
				return ( 
					<MenuLink
					key={index}
					label={menu.name}
					to={menu.to}
					activeWhenOnlyExact={menu.exact}
					/>
				)
			})
		}
		return result;
	}
}


export default Menu;

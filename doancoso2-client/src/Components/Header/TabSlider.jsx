import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const TabSlider = () => {

	const rooms = useSelector((state) => state.allListRooms.Rooms);

	const renderList = rooms.map((rooms) => {
		const {
			id, tenLoai, urlAnhDaiDien, interfaceRoomNavigation, danhMucSanPham
		} = rooms;

		return (
			<li className="item parent group" key={id}>
				<Link to={`/Products/${id}`} className="hasicon" title={tenLoai}>
					<img src={urlAnhDaiDien} alt="img" />{tenLoai}
				</Link>
				<div className="dropdown-menu menu-2" style={{ width: '326%' }}>
					<div className="menu-items">
						<div className="item">
							<div className="menu-content">
								<div className="tags">
									<div className="title float-left">
										<b>{interfaceRoomNavigation.tenRoom}</b>
									</div>
									<ul className="list-inline">
										{danhMucSanPham.map((data) => {
											return (
												<li key={data.id} className="list-inline-item" >
													<Link to={`/DetailProduct/${data.id}`}>{data.tenSP}</Link>
												</li>
											);
										})}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</li>
		);

	});

	return (
		<div className="container">
			<div className="menu-banner-container">
				<div id="show-menu" className="menu-banner d-xs-none dropdown-menu collapse">
					<div className="tiva-verticalmenu block">
						<div className="verticalmenu" role="navigation">
							<ul className="menu level1">
								{rooms.length > 0 ? renderList : <h4 className="text-center">...Loading data</h4>}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TabSlider;
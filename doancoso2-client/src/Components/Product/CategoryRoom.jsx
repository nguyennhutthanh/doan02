import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CategoryRoom = () => {
    const roomTypes = useSelector((state) => state.allRoomTypes.roomsType);

    const renderListRoomTypes = roomTypes.map((roomTypes) => {
        const { id, tenRoom, danhMucRoom } = roomTypes;
        return (
            <div className="cateTitle hasSubCategory open level1" key={id}>
                <span className="arrow collapsed collapse-icons" data-toggle="collapse" data-target={"#" + id} aria-expanded="false" role="status">
                    <i className="zmdi zmdi-minus" />
                    <i className="zmdi zmdi-plus" />
                </span>
                <h6 className="cateItem" >{tenRoom}</h6>
                <div className="subCategory collapse" id={id}
                    aria-expanded="true" role="status">
                    {danhMucRoom.map((item) => {
                        return (
                            <div className="cateTitle">
                                <Link to={`/Products/${item.id}`} className="cateItem">{item.tenLoai}</Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    })

    return (
        <div className="sidebar-block">
            <div className="title-block">Danh Mục</div>
            <div className="block-content">
                {Object.keys(roomTypes).length > 0 ? renderListRoomTypes : <h4 className="text-center">...Loading data</h4>}
            </div>
        </div>
    );
};

export default CategoryRoom;
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProductChatLieu = () => {
    const roomTypes = useSelector((state) => state.allProductMaterial.material);

    const renderListProductByMaterial = roomTypes.map((roomTypes) => {
        const { id, tenChatLieu, chatLieuNavigation } = roomTypes;
        return (
            <div className="cateTitle hasSubCategory open level1" key={id}>
                <span className="arrow collapsed collapse-icons" data-toggle="collapse" data-target={"#" + id} aria-expanded="false" role="status">
                    <i className="zmdi zmdi-minus" />
                    <i className="zmdi zmdi-plus" />
                </span>
                <h6 className="cateItem" >{tenChatLieu}</h6>
                <div className="subCategory collapse" id={id}
                    aria-expanded="true" role="status">
                    {chatLieuNavigation.map((item) => {
                        return (
                            <div className="cateTitle" key={item.id}>
                                <Link to={`/DetailProduct/${item.id}`} className="cateItem">{item.tenSP}</Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    })

    return (
        <div className="sidebar-block">
            <div className="title-block">Chất liệu</div>
            <div className="block-content">
                {Object.keys(roomTypes).length > 0 ? renderListProductByMaterial : <h4 className="text-center">...Loading data</h4>}
            </div>
        </div>
    );
};

export default ProductChatLieu;
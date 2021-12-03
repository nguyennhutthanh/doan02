import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ThuongHieuProduct = () => {
    const thuonghieu = useSelector((state) => state.allProductThuonghieu.thuonghieu);

    const renderListThuongHieu = thuonghieu.map((thuonghieu) => {
        const { id, tenThuongHieu, thuongHieuProducts } = thuonghieu;
        return (
            <>
                <h6 key={id}>{tenThuongHieu}</h6>
                {
                    thuongHieuProducts.map((item) => {
                        return (
                            <li key={item.id}>
                                <Link to={`/DetailProduct/${item.id}`} title="Show products matching tag Hot Trend">{item.tenSP}</Link>
                            </li>
                        )
                    })
                }
            </>
        )
    })

    return (
        <div className="sidebar-block product-tags">
            <div className="title-block">
                Thương hiệu
            </div>
            <div className="block-content">
                <ul className="listSidebarBlog list-unstyled">
                    {Object.keys(thuonghieu).length > 0 ? renderListThuongHieu : <h4 className="text-center">...Loading data</h4>}
                </ul>
            </div>
        </div>
    );
};

export default ThuongHieuProduct;
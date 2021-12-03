import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const options = {
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: true,
    smartSpeed: 1000,
};

const ListDanhmuc = () => {
    const category = useSelector((state) => state.allcategoty.caterogy);

    const renderList = category.map((category) => {
        const { id, tenLoai, urlAnhDaiDien, danhMucSanPham } = category;
        return (
            <div className="content-category" key={id}>
                <div className="content-img" style={{ width: '233.8px', height: '233.80px', margin: '0 auto', marginBottom: '24px' }}>
                    <Link to={`/Products/${id}`}>
                        <img className="img-fluid"
                            style={{ width: '233.8px', height: '233.80px', objectFit: 'fill' }}
                            src={urlAnhDaiDien} alt="Side Table" title="Side Table" />
                    </Link>
                </div>
                <div className="info-category">
                    <h3>
                        <Link to={`/Products/${id}`}>{tenLoai}</Link>
                    </h3>
                    <p>Có {danhMucSanPham.length} sản phẩm </p>
                </div>
            </div>
        );
    })

    return (
        <div className="featured-category">
            <div className="container">
                <div className="tab-content text-center">
                    <div className="title-product">
                        <h2>DANH MỤC SẢN PHẨM</h2>
                        <p>BẠN THÍCH THỂ LOẠI NÀO !</p>
                    </div>
                    <OwlCarousel {...options} className='owl-theme featured' loop margin={10} nav>
                        {renderList}
                    </OwlCarousel>
                </div>
            </div>
        </div>
    );
};

export default ListDanhmuc;
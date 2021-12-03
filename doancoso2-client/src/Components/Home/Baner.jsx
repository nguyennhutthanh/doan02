import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Baner = () => {
    return (

        <div className="tab-content">
            <OwlCarousel className='owl-carousel owl-theme' loop margin={10} nav>
                <div className="item">
                    <a href="#">
                        <img src="img/home/home4-slide1.jpg" alt="img" />
                    </a>
                </div>
                <div className="item">
                    <a href="#">
                        <img src="img/home/home4-slide2.jpg" alt="img" />
                    </a>
                </div>
                <div className="item">
                    <a href="#">
                        <img src="img/home/home4-slide3.jpg" alt="img" />
                    </a>
                </div>
                <div className="item">
                    <a href="#">
                        <img src="img/home/home4-slide4.jpg" alt="img" />
                    </a>
                </div>
                <div className="item">
                    <a href="#">
                        <img src="img/home/home4-slide5.jpg" alt="img" />
                    </a>
                </div>
                <div className="item">
                    <a href="#">
                        <img src="img/home/home4-slide6.jpg" alt="img" />
                    </a>
                </div>
                <div className="item">
                    <a href="#">
                        <img src="img/home/home4-slide3.jpg" alt="img" />
                    </a>
                </div>
            </OwlCarousel>
        </div>
    );
};

export default Baner;
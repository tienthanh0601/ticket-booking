import React from 'react'
import '../scss/home.scss'
import SearchTickets from '../components/SearchTickets'
import Marquee from 'react-fast-marquee'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'

const Home = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <>
      <div className="home-wrapper-1">
        <div className="banner">
          <img
            className="banner-img"
            src="https://229a2c9fe669f7b.cmccloud.com.vn/images/banner-main-vi.jpg"
            alt="banner"
          />
        </div>
      </div>
      <div className="home-wrapper-2">
        <div className="voucher">
          <h1 className="title-voucher">KHUYẾN MÃI NỖI BẬT</h1>
          <Slider className="slick-boxs" {...settings}>
            <Link>
              <img
                className="img-slider"
                src="https://storage.googleapis.com/futa-busline-web-cms-prod/2_343_x_184_px_x4_f3961edd19/2_343_x_184_px_x4_f3961edd19.png"
                alt=""
              />
            </Link>
            <Link>
              <img
                className="img-slider"
                src="https://storage.googleapis.com/futa-busline-web-cms-prod/2_343_x_184_px_x4_f3961edd19/2_343_x_184_px_x4_f3961edd19.png"
                alt=""
              />
            </Link>
            <Link>
              <img
                className="img-slider"
                src="https://storage.googleapis.com/futa-busline-web-cms-prod/2_343_x_184_px_x4_f3961edd19/2_343_x_184_px_x4_f3961edd19.png"
                alt=""
              />
            </Link>
            <Link>
              <img
                className="img-slider"
                src="https://storage.googleapis.com/futa-busline-web-cms-prod/2_343_x_184_px_x4_f3961edd19/2_343_x_184_px_x4_f3961edd19.png"
                alt=""
              />
            </Link>
            <Link>
              <img
                className="img-slider"
                src="https://storage.googleapis.com/futa-busline-web-cms-prod/2_343_x_184_px_x4_f3961edd19/2_343_x_184_px_x4_f3961edd19.png"
                alt=""
              />
            </Link>
          </Slider>
        </div>
      </div>
      <div className="home-wrapper-4"></div>
      <div className="home-wrapper-3">
        <div className="box-marquee">
          <h1>TIN TỨC LIÊN QUAN</h1>
          <Marquee className="d-flex">
            <div className="box-img ">
              <img src="images/logo-vtv.png" alt="brand" />
            </div>
            <div className="box-img ">
              <img src="images/logo-vne.png" alt="brand" />
            </div>
            <div className="box-img ">
              <img src="images/logo-tuoitre.png" alt="brand" />
            </div>
            <div className="box-img ">
              <img src="images/logo-dantri.png" alt="brand" />
            </div>
            <div className="box-img ">
              <img src="images/logo-cesti.png" alt="brand" />
            </div>
            <div className="box-img ">
              <img src="images/logo-fbnc.png" alt="brand" />
            </div>
          </Marquee>
        </div>
      </div>
    </>
  )
}

export default Home

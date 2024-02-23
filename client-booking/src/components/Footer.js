import React from 'react'
import { BsGithub, BsInstagram, BsLinkedin, BsYoutube } from 'react-icons/bs'
import '../scss/footer.scss'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="row">
          <div className="col">
            <h1>Contact Us</h1>
            <address className="text-name">
              DaNang : 77 Quang Trung <br /> Da Nang <br />
            </address>
            <address>
              <a href="tel:+84 355898259" className="text-name">
                0355898259
              </a>
              <br />
              <a href="mailto:buitienthanh791@gmail.com" className="text-name">
                buitienthanh791@gmail.com
              </a>
            </address>
            <div className="box-icons">
              <a href="/" className="icon">
                <BsLinkedin />
              </a>
              <a href="/" className="icon">
                <BsInstagram />
              </a>
              <a href="/" className="icon">
                <BsGithub />
              </a>
              <a href="/" className="icon">
                <BsYoutube />
              </a>
            </div>
          </div>

          <div className="col">
            <h1 className="text-white mb-4">Infomation</h1>
            <div className="info-footer">
              <Link className="text-if">About us</Link>
              <Link className="text-if">Schedule</Link>
              <Link className="text-if">Recruitment</Link>
              <Link className="text-if">Temms & Conditions</Link>
              <Link className="text-if">Office network</Link>
            </div>
          </div>

          <div className="col">
            <h1 className="text-white mb-4">Account</h1>
            <div className="info-footer">
              <Link className="text-if">Privacy Policy</Link>
              <Link className="text-if">Refund Policy</Link>
              <Link className="text-if">Shipping Policy</Link>
              <Link className="text-if">Temms & Conditions</Link>
              <Link className="text-if">Blogs</Link>
            </div>
          </div>

          <div className="col">
            <h1 className="text-white mb-4">Recruitment</h1>
            <div className="info-footer">
              <Link className="text-if">
                Look up ticket booking information
              </Link>
              <Link className="text-if">Terms of use</Link>
              <Link className="text-if">Frequently asked questions</Link>
              <Link className="text-if">Temms & Conditions</Link>
              <Link className="text-if">
                Instructions for booking tickets on the Web
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <footer className="footer-2">
        <div className="col">
          <p className="copy-right">
            &copy; {new Date().getFullYear()}; Powered by Developer's Container
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer

import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.png'
import groot from '../../assets/groot.jpg'
import narnia from '../../assets/narnia.jpg'
import jumanji from '../../assets/jumanji.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
const Home = () => {
  return (
    <div className='home'>
      <Navbar/>
      <div className="hero">
        <img src={groot} alt="" className='banner-img'/>

        <div className="hero-caption">
            <img src={hero_title} alt="" className='caption-img' />
            <p> A ragtag team of intergalactic misfits unites to save the universe from a powerful cosmic threat, all set to an unforgettable mixtape soundtrack.</p>

            <div className="hero-btns">
                <button className='btn'><img src={play_icon}alt="" />Play</button>
                <button className='btn dark-btn'><img src={info_icon}alt="" />More Info</button>
            </div>
            <TitleCards/>
        </div>
      </div>
    </div>
  )
}

export default Home

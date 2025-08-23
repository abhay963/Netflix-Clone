import React, { useState } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import groot from '../../assets/groot.jpg';
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className='home'>
      <Navbar/>

      <div className="hero">
        <img src={groot} alt="" className='banner-img'/>

        <div className="hero-caption">
          <img src={hero_title} alt="" className='caption-img' />
          <p> 
            A ragtag team of intergalactic misfits unites to save the universe from a powerful cosmic threat, all set to an unforgettable mixtape soundtrack.
          </p>

          <div className="hero-btns">
            <button className='btn' onClick={() => setShowVideo(true)}>
              <img src={play_icon} alt="" /> Play
            </button>
            <button className='btn dark-btn'>
              <img src={info_icon} alt="" /> More Info
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="video-overlay" onClick={() => setShowVideo(false)}>
          <div className="video-container" onClick={e => e.stopPropagation()}>
            {/* Close Button */}
            <button className="close-btn" onClick={() => setShowVideo(false)}>✖</button>

            <iframe
              src="https://www.youtube.com/embed/wUn05hdkhjM?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%' }}
            ></iframe>
          </div>
        </div>
      )}

      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"}/>
        <TitleCards title={"Only on Netflix"} category={"popular"}/>
        <TitleCards title={"Upcoming"} category={"upcoming"}/>
        <TitleCards title={"Top Picks for You"} category={"now_playing"}/>
      </div>

      <Footer/>
    </div>
  );
}

export default Home;

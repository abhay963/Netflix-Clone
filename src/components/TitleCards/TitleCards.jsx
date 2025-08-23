// src/components/TitleCards/TitleCards.jsx
import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  // ✅ Correct way to access env in Vite
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    try {
      if (cardsRef.current) {
        cardsRef.current.scrollLeft += event.deltaY;
      }
    } catch (err) {
      console.error('Scroll error:', err);
    }
  };

  useEffect(() => {
    // Fetch movies/shows from TMDB
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : 'popular'
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((data) => setApiData(data.results || []))
      .catch((err) => console.error('Fetch error:', err));

    const currentRef = cardsRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.length > 0 ? (
          apiData.map((card, index) => {
            if (!card.backdrop_path) return null;
            return (
              <Link to={`/player/${card.id}`} className="card" key={index}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                  alt={card.original_title || card.name || 'Untitled'}
                />
                <p>{card.original_title || card.name || 'Untitled'}</p>
              </Link>
            );
          })
        ) : (
          <p className="no-data">No movies available</p>
        )}
      </div>
    </div>
  );
};

export default TitleCards;

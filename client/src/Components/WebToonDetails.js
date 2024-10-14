import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import axios from "axios";

function WebtoonDetail() {
  const { id } = useParams(); // Extract the webtoon ID from the URL
  const [webtoon, setWebtoon] = useState(null);
  const [error, setError] = useState(null);
 

  useEffect(() => {
    // Fetch webtoon details from the backend using the ID
    const fetchWebtoonDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/webtoons/${id}`);
        setWebtoon(response.data); // Set webtoon data
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Failed to fetch webtoon details');
      }
    };

    fetchWebtoonDetails();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!webtoon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__links">
                <a href="/"><i className="fa fa-home"></i> Home</a>
                <a href="/categories">Categories</a>
                <span>{webtoon.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="anime-details spad">
        <div className="container">
          <div className="anime__details__content">
            <div className="row">
              <div className="col-lg-3">
                <div className="anime__details__pic set-bg">
                  <img src={webtoon.img} alt={webtoon.name} className="webtoon-image" />
                  <div className="comment"><i className="fa fa-comments"></i> {webtoon.commentsCount}</div>
                  <div className="view"><i className="fa fa-eye"></i> {webtoon.views}</div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="anime__details__text">
                  <div className="anime__details__title">
                    <h3>{webtoon.name}</h3>
                    <span>{webtoon.studio}</span>
                  </div>
                  <div className="anime__details__rating">
                    <div className="rating">
                      <a href="/"><i className="fa fa-star"></i></a>
                      <a href="/"><i className="fa fa-star"></i></a>
                      <a href="/"><i className="fa fa-star"></i></a>
                      <a href="/"><i className="fa fa-star"></i></a>
                      <a href="/"><i className="fa fa-star-half-o"></i></a>
                    </div>
                    <span>{webtoon.views} Views</span>
                  </div>
                  <p>{webtoon.description}</p>

                  <div className="anime__details__widget">
                    <div className="row">
                      <div className="col-lg-6">
                        <ul>
                          <li><span>Type:</span> TV Series</li>
                          <li><span>Studio:</span> {webtoon.studio}</li>
                          <li><span>Status:</span> Airing</li>
                          <li><span>Genre:</span> {webtoon.categorie}</li>
                        </ul>
                      </div>
                      <div className="col-lg-6">
                        <ul>
                          <li><span>Rating:</span> {webtoon.Rating}</li>
                          <li><span>Views:</span> {webtoon.views}</li>
                          <li><span>Episodes:</span> {webtoon.episodes.length}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="anime__details__btn">
                    <a href="/" className="follow-btn"><i className="fa fa-heart-o"></i> Follow</a>
                    <a href="/" className="watch-btn"><span>Watch Now</span> <i className="fa fa-angle-right"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-8">
                <div className="anime__details__review">
                  <div className="section-title">
                    <h5>Reviews</h5>
                  </div>
                  {webtoon.reviews.map((review, index) => (
                    <div key={index} className="anime__review__item">
                      <div className="anime__review__item__pic">
                        <img src={review.img} alt={review.user} />
                      </div>
                      <div className="anime__review__item__text">
                        <h6>{review.user} - <span>{new Date(review.date).toLocaleString()}</span></h6>
                        <p>{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="anime__details__form">
                  <div className="section-title">
                    <h5>Your Comment</h5>
                  </div>
                  <form action="#">
                    <textarea placeholder="Your Comment"></textarea>
                    <button type="submit"><i className="fa fa-location-arrow"></i> Submit</button>
                  </form>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="anime__details__sidebar">
                  <div className="section-title">
                    <h5>Episodes</h5>
                  </div>
                  {webtoon.episodes.map((episode, index) => (
                    <div key={index} className="product__sidebar__view__item">
                      <img src={episode.img} alt={`Episode ${episode.episodeNumber}`} />
                      <div className="ep">Ep {episode.episodeNumber}</div>
                      <div className="view"><i className="fa fa-eye"></i> {episode.views}</div>
                      <h5><a href="/">Episode {episode.episodeNumber} - {episode.duration}</a></h5>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WebtoonDetail;

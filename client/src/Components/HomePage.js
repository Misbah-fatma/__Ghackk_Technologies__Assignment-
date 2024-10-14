import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../App.css';

function HomePage() {

    const [webtoons, setWebtoons] = useState([]);
    const [popular, setPopular] = useState([]);
    const [likedItems, setLikedItems] = useState({});
    const [floatingHeart, setFloatingHeart] = useState(null);


    useEffect(() => {
        const fetchWebtoons = async () => {
          try {
            const response = await axios.get('https://backend-r9ii.onrender.com/api/webtoons');
            setWebtoons(response.data);
          } catch (error) {
            console.error('Error fetching webtoons:', error);
          }
        };
    
        fetchWebtoons();
      }, []);
    
      useEffect(() => {
        const fetchPopular = async () => {
          try {
            const response = await axios.get('https://backend-r9ii.onrender.com/api/popular');
            setPopular(response.data);
          } catch (error) {
            console.error('Error fetching popular webtoons:', error);
          }
        };
    
        fetchPopular();
      }, []);
    
      const handleLike = async (webtoon) => {
        const token = localStorage.getItem('user');
        const storedUser = localStorage.getItem('user');
        const userId = JSON.parse(storedUser);
        console.log(userId._id);
        if (!token || !userId) {
          console.error('No token or userId found');
          return;
        }
    
        try {
          await axios.post('https://backend-r9ii.onrender.com/api/favourites/like', {
            userId,
            webtoonId: webtoon._id,
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
    
          // Toggle like state
          setLikedItems((prev) => ({
            ...prev,
            [webtoon._id]: !prev[webtoon._id],
          }));
    
          // Trigger floating heart animation
          setFloatingHeart(webtoon._id);
          setTimeout(() => setFloatingHeart(null), 1000); // Reset after animation
        } catch (error) {
          console.error('Error adding to favourites:', error);
        }
      };

    return (
        <div>
            <section className="hero">
                <div className="container">
                    <OwlCarousel
                        className="owl-theme"
                        loop
                        margin={10}
                        nav
                        items={1}
                        autoplay
                        autoplayTimeout={5000}
                        autoplayHoverPause
                    >
                        <div className="hero__items" style={{ backgroundImage: 'url(/assets/img/hero/hero-1.jpg)' }}>
                            <div className="hero__text-container">
                                <div className="label">Adventure</div>
                                <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                                <p>After 30 days of travel across the world...</p>
                                <a href="/">
                                    <span>Watch Now</span>
                                    <i className="fa fa-angle-right" style={{
                                        fontSize: '20px',
                                        display: 'inline-block',
                                        backgroundColor: '#e53637',
                                        padding: '11px 5px 16px 8px',
                                        color: '#ffffff',
                                        borderRadius: '0 4px 4px 0'
                                    }}></i>

                                </a>
                            </div>
                        </div>

                        <div className="hero__items" style={{ backgroundImage: 'url(/assets/img/hero/hero-2.jpg)' }}>
                            <div className="hero__text-container">
                                <div className="label">Adventure</div>
                                <h2>Another Adventure</h2>
                                <p>Explore the mysteries in a new world...</p>
                                <a href="/"><span>Watch Now</span> <i className="fa fa-angle-right" style={{
                                    fontSize: '20px',
                                    display: 'inline-block',
                                    backgroundColor: '#e53637',
                                    padding: '11px 5px 16px 8px',
                                    color: '#ffffff',
                                    borderRadius: '0 4px 4px 0'
                                }}></i>
                                </a>
                            </div>
                        </div>

                        <div className="hero__items" style={{ backgroundImage: 'url(/assets/img/hero/hero-3.jpg)' }}>
                            <div className="hero__text-container">
                                <div className="label">Action</div>
                                <h2>Action Thriller</h2>
                                <p>Join the hero on an action-packed journey...</p>
                                <a href="/"><span>Watch Now</span> <i className="fa fa-angle-right" style={{
                                    fontSize: '20px',
                                    display: 'inline-block',
                                    backgroundColor: '#e53637',
                                    padding: '11px 5px 16px 8px',
                                    color: '#ffffff',
                                    borderRadius: '0 4px 4px 0'
                                }}></i>
                                </a>
                            </div>
                        </div>
                    </OwlCarousel>
                </div>
            </section>
            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="trending__product">
                                <div className="row">
                                    {webtoons.map((webtoon) => (
                                        <div className="col-lg-4 col-md-6 col-sm-6" key={webtoon._id}>
                                            <div className="product__item">
                                                <div className="product__item__pic" style={{ backgroundImage: `url(${webtoon.img})` }}>
                                                    <div className="ep">{webtoon.episode} Episodes</div>
                                                    <div className="comment"><i className="fa fa-comments"></i> {webtoon.comment || 0}</div>
                                                    <div className="view"><i className="fa fa-eye"></i> {webtoon.views || 0}</div>

                                                    {/* Like button */}
                                                    <button
                                                        className={`like-button ${likedItems[webtoon._id] ? 'active' : ''}`}
                                                        onClick={() => handleLike(webtoon)}
                                                    >
                                                        <i className="fa fa-heart" style={{ fontSize: '30px', marginRight: '5px' }}></i>
                                                    </button>

                                                    {/* Floating heart animation */}
                                                    {floatingHeart === webtoon._id && (
                                                        <div className="heart-float">
                                                            <i className="fa fa-heart" style={{ fontSize: '30px', marginRight: '5px' }}></i>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="product__item__text">
                                                <h5>
                            <Link to={`/webtoon/${webtoon._id}`}>{webtoon.name}</Link>
                          </h5>
                                                    <p className="text-white">{webtoon.description}</p>
                                                </div>
                                                <div class="button-container">
<button class="button-73" onClick={() => handleLike(webtoon)}>Add to Favourite</button>
                                            </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="popular__product">
                                    <div className="row">
                                        <div className="col-lg-8 col-md-8 col-sm-8">
                                            <div className="section-title">
                                                <h4>Popular Shows</h4>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4">
                                            <div className="btn__all">
                                                <a href="/" className="primary-btn">View All <span className="arrow_right"></span></a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        {popular.map((popular) => (
                                            <div className="col-lg-4 col-md-6 col-sm-6" key={popular._id}>
                                                <div className="product__item">
                                                    <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${popular.img})` }}>
                                                        <div className="ep">{popular.episodes[0].text} / {popular.episodes[0].text}</div>
                                                        <div className="comment"><i className="fa fa-comments"></i> {popular.comment}</div>
                                                        <div className="view"><i className="fa fa-eye"></i> {popular.views}</div>
                                                    </div>
                                                    <div className="product__item__text">
                                                        <ul>
                                                            <li>Active</li>
                                                            <li>Movie</li>
                                                        </ul>
                                                        <h5><a href="/">{popular.name}</a></h5>

                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 col-sm-8">
                            <div class="product__sidebar">
                                <div class="product__sidebar__view">
                                    <div class="section-title">
                                        <h5>Top Views</h5>
                                    </div>
                                    <ul class="filter__controls">
                                        <li class="active" data-filter="*">Day</li>
                                        <li data-filter=".week">Week</li>
                                        <li data-filter=".month">Month</li>
                                        <li data-filter=".years">Years</li>
                                    </ul>
                                    <div class="filter__gallery">
                                        <div class="product__sidebar__view__item mix day years">
                                            <img src="/assets/img/sidebar/tv-1.jpg" alt="Boruto: Naruto Next Generations" class="set-bg" />
                                            <div class="ep">18 / ?</div>
                                            <div class="view"><i class="fa fa-eye"></i> 9141</div>
                                            <h5><a href="/">Boruto: Naruto Next Generations</a></h5>
                                        </div>
                                        <div class="product__sidebar__view__item mix month week">
                                            <img src="/assets/img/sidebar/tv-2.jpg" alt="The Seven Deadly Sins: Wrath of the Gods" class="set-bg" />
                                            <div class="ep">18 / ?</div>
                                            <div class="view"><i class="fa fa-eye"></i> 9141</div>
                                            <h5><a href="/">The Seven Deadly Sins: Wrath of the Gods</a></h5>
                                        </div>
                                        <div class="product__sidebar__view__item mix week years">
                                            <img src="/assets/img/sidebar/tv-3.jpg" alt="Sword Art Online: Alicization - War of Underworld" class="set-bg" />
                                            <div class="ep">18 / ?</div>
                                            <div class="view"><i class="fa fa-eye"></i> 9141</div>
                                            <h5><a href="/">Sword Art Online: Alicization - War of Underworld</a></h5>
                                        </div>
                                        <div class="product__sidebar__view__item mix years month">
                                            <img src="/assets/img/sidebar/tv-4.jpg" alt="Fate/stay night: Heaven's Feel I. Presage Flower" class="set-bg" />
                                            <div class="ep">18 / ?</div>
                                            <div class="view"><i class="fa fa-eye"></i> 9141</div>
                                            <h5><a href="/">Fate/stay night: Heaven's Feel I. Presage Flower</a></h5>
                                        </div>
                                        <div class="product__sidebar__view__item mix day">
                                            <img src="/assets/img/sidebar/tv-5.jpg" alt="Fate/Stay Night: Unlimited Blade Works" class="set-bg" />
                                            <div class="ep">18 / ?</div>
                                            <div class="view"><i class="fa fa-eye"></i> 9141</div>
                                            <h5><a href="/">Fate/Stay Night: Unlimited Blade Works</a></h5>
                                        </div>
                                    </div>
                                </div>

                                <div class="product__sidebar__comment">
                                    <div class="section-title">
                                        <h5>New Comment</h5>
                                    </div>
                                    <div class="product__sidebar__comment__item">
                                        <div class="product__sidebar__comment__item__pic">
                                            <img src="/assets/img/sidebar/comment-1.jpg" alt="The Seven Deadly Sins: Wrath of the Gods" />
                                        </div>
                                        <div class="product__sidebar__comment__item__text">
                                            <ul>
                                                <li>Active</li>
                                                <li>Movie</li>
                                            </ul>
                                            <h5><a href="/">The Seven Deadly Sins: Wrath of the Gods</a></h5>
                                            <span><i class="fa fa-eye"></i> 19,141 Views</span>
                                        </div>
                                    </div>
                                    <div class="product__sidebar__comment__item">
                                        <div class="product__sidebar__comment__item__pic">
                                            <img src="/assets/img/sidebar/comment-2.jpg" alt="Shirogane Tamashii hen Kouhan sen" />
                                        </div>
                                        <div class="product__sidebar__comment__item__text">
                                            <ul>
                                                <li>Active</li>
                                                <li>Movie</li>
                                            </ul>
                                            <h5><a href="/">Shirogane Tamashii hen Kouhan sen</a></h5>
                                            <span><i class="fa fa-eye"></i> 19,141 Views</span>
                                        </div>
                                    </div>
                                    <div class="product__sidebar__comment__item">
                                        <div class="product__sidebar__comment__item__pic">
                                            <img src="/assets/img/sidebar/comment-3.jpg" alt="Kizumonogatari III: Reiket su-hen" />
                                        </div>
                                        <div class="product__sidebar__comment__item__text">
                                            <ul>
                                                <li>Active</li>
                                                <li>Movie</li>
                                            </ul>
                                            <h5><a href="/">Kizumonogatari III: Reiket su-hen</a></h5>
                                            <span><i class="fa fa-eye"></i> 19,141 Views</span>
                                        </div>
                                    </div>
                                    <div class="product__sidebar__comment__item">
                                        <div class="product__sidebar__comment__item__pic">
                                            <img src="/assets/img/sidebar/comment-4.jpg" alt="Monogatari Series: Second Season" />
                                        </div>
                                        <div class="product__sidebar__comment__item__text">
                                            <ul>
                                                <li>Active</li>
                                                <li>Movie</li>
                                            </ul>
                                            <h5><a href="/">Monogatari Series: Second Season</a></h5>
                                            <span><i class="fa fa-eye"></i> 19,141 Views</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="product__sidebar__comment">
    <div class="anime__details__sidebar">
        <div class="section-title">
            <h5>you might like...</h5>
        </div>
        <div class="product__sidebar__view__item">
            <img src="/assets/img/sidebar/tv-1.jpg" alt="Boruto: Naruto next generations" />
            <div class="ep">18 / ?</div>
            <div class="view"><i class="fa fa-eye"></i> 9141</div>
            <h5><a href="/">Boruto: Naruto next generations</a></h5>
        </div>
        <div class="product__sidebar__view__item">
            <img src="/assets/img/sidebar/tv-2.jpg" alt="The Seven Deadly Sins: Wrath of the Gods" />
            <div class="ep">18 / ?</div>
            <div class="view"><i class="fa fa-eye"></i> 9141</div>
            <h5><a href="/">The Seven Deadly Sins: Wrath of the Gods</a></h5>
        </div>
        <div class="product__sidebar__view__item">
            <img src="/assets/img/sidebar/tv-3.jpg" alt="Sword Art Online: Alicization - War of Underworld" />
            <div class="ep">18 / ?</div>
            <div class="view"><i class="fa fa-eye"></i> 9141</div>
            <h5><a href="/">Sword Art Online: Alicization - War of Underworld</a></h5>
        </div>
        <div class="product__sidebar__view__item">
            <img src="/assets/img/sidebar/tv-4.jpg" alt="Fate/stay night: Heaven's Feel I. Presage Flower" />
            <div class="ep">18 / ?</div>
            <div class="view"><i class="fa fa-eye"></i> 9141</div>
            <h5><a href="/">Fate/stay night: Heaven's Feel I. Presage Flower</a></h5>
        </div>
    </div>
</div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
}

export default HomePage;

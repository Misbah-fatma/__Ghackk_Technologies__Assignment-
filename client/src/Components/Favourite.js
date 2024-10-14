import React, { useEffect, useState } from 'react';
import axios from "axios";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [userId, setuserId] = useState(null);
 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined' && storedUser !== 'null') {
      try {
        const user = JSON.parse(storedUser);
        console.log(user)
        if (user && user.username) {
          setuserId(user._id);
          console.log(user);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Fetch the user's favorite webtoons from the backend using Axios
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/favourites/details`);
        const data = response.data;

        console.log("Fetched favorites:", data);  // Log the response data to check its structure

        if (Array.isArray(data)) {
          // Filter favorites based on userId
          const userFavorites = data.filter(fav => fav.userId === userId);

          setFavorites(userFavorites);  // Set the filtered favorites
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [userId]);

  console.log(favorites.length);

  return (
    <div>
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="trending__product">
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-8">
                    <div className="section-title">
                      <h4>Your Favourites</h4>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="btn__all">
                      <a href="/" className="primary-btn"> All <span className="arrow_right"></span></a>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {favorites.length > 0 ? (
                    favorites.map((fav) => (
                      fav.webtoonId ? (  
                        <div className="col-lg-4 col-md-6 col-sm-6" key={fav.webtoonId._id}>
                          <div className="product__item">
                            <div className="product__item__pic" style={{ backgroundImage: `url(${fav.webtoonId.img})` }}>
                              <div className="ep">{fav.webtoonId.episode} Episodes</div>
                              <div className="comment"><i className="fa fa-comments"></i> {fav.webtoonId.comment || 0}</div>
                              <div className="view"><i className="fa fa-eye"></i> {fav.webtoonId.views || 0}</div>
                            </div>
                            <div className="product__item__text">
                              <ul>
                                <li>{fav.webtoonId.categorie}</li> {/* Fixed typo from 'category' */}
                                <li>{fav.webtoonId.studio}</li>
                              </ul>
                              <h5><a href="/">{fav.webtoonId.name}</a></h5>
                              <p className='text-white'>{fav.webtoonId.description}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p key={fav._id}>Webtoon data unavailable.</p>  // Handle case where webtoonId is missing
                      )
                    ))
                  ) : (
                    <p>No favorites yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Favorites;

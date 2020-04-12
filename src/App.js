import React, { useState, useEffect } from "react";
import chuck from "./chuck_norris_PNG32.png";
import chuckloading from "./chuck.gif";
import chuckmobile from "./chuck_mobile.png";
function App() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("random");
  const [joke, setJoke] = useState("");
  const [loadingjoke, setLoadingjoke] = useState(false);

  useEffect(() => {
    fetch("https://api.chucknorris.io/jokes/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(e => console.log(e));
  }, []);

  const GenerateJoke = () => {
    setLoadingjoke(true);
    let url;
    if (category == "random") {
      url = "https://api.chucknorris.io/jokes/random";
    } else {
      url = `https://api.chucknorris.io/jokes/random?category=${category}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setJoke(data.value);
        setLoadingjoke(false);
      })
      .catch(e => console.log(e));
  };

  const selectCategory = e => {
    setCategory(e.target.value);
  };

  //  //URL from current page
  //  const url = window.location.href;
  //  //URL patterns for Social media sites share functionalities
  //  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  //  const twitterUrl = `https://twitter.com/intent/tweet?url=${url}`;
  //  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;

  return (
    <div className="flex">
      <div className="left">
        <h1>Chuck Norris Jokes</h1>
        <div className="controls">
          <select name="categories" id="categories" onChange={selectCategory}>
            <option value="random" selected>
              random
            </option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button onClick={GenerateJoke}>Generate</button>
        </div>
        <div className="joke">
          {loadingjoke ? (
            <div>
              <img src={chuckloading} alt="loading" />
            </div>
          ) : (
            <>
              {joke == "" ? (
                <div class="generate">
                  Please Generate joke..
                  <img
                    src="https://assets.chucknorris.host/img/avatar/chuck-norris.png"
                    alt="chuck"
                  />
                </div>
              ) : (
                <>
                  <h2>{joke}</h2>
                  <div className="icons">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURI(
                        joke
                      )}&url=${encodeURI(window.location.href)}`}
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a
                      target="_blank"
                      href={`https://api.whatsapp.com/send?text=${encodeURI(
                        joke
                      )}`}
                      data-action="share/whatsapp/share"
                    >
                      <i className="fab fa-whatsapp"></i>
                    </a>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="right">
        <img src={chuckmobile} alt="chuck" class="mobile_img" />
      </div>
    </div>
  );
}

export default App;

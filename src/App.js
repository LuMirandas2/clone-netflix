import React, { useState, useEffect } from "react";
import "./App.css";
import Tmdb from "./Tmdb";
import MovieRow from "./componentes/MovieRow";
import FeaturedMovie from "./componentes/FeaturedMovie";
import Header from "./componentes/Header";

export default () => {
  const [movieList, setMovielist] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovielist(list);

      //Featured
      let originals = list.filter((i) => i.slug === "originals");
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");
      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featuredData && <FeaturedMovie item={featuredData} />}

      <div className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </div>
      <footer>
        Desenvolvido por Luanna Alves Miranda.
        <br />
        Desenvolvedor Fullstack JS <br />
        Direito de imagens para Netfix <br />
        Dados Themoviedb.org
      </footer>

      {movieList.length <= 0 && (
        <div className="loading">
          <img
            src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"
            alt="Carregando"
          />
        </div>
      )}
    </div>
  );
};

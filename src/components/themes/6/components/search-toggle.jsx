import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function SearchToggle(props) {
  useEffect(() => {
    document.querySelector("body").addEventListener("click", onBodyClick);
    document
      .querySelector(".search-toggle")
      .addEventListener("click", onSearchClick);
    document
      .querySelector(".header-search")
      .addEventListener("click", function(e) {
        e.stopPropagation();
      });
    window.addEventListener("resize", onWindowResize);

    return () => {
      document.querySelector("body").removeEventListener("click", onBodyClick);
      window.removeEventListener("resize", onWindowResize);
    };
  });

  const onSearchClick = (e) => {
    e.preventDefault();
    document.querySelector(".header-search").classList.toggle("show");
    document.querySelector(".header-search-wrapper").classList.toggle("show");

    if (window.innerWidth < 576) {
      document.querySelector(".header-search-wrapper").style.left =
        15 - document.querySelector(".header-search").offsetLeft + "px";
      document.querySelector(".header-search-wrapper").style.right =
        15 +
        document.querySelector(".header-search").offsetLeft +
        document.querySelector(".header-search").clientWidth -
        window.innerWidth +
        "px";
    }
  };

  const onWindowResize = () => {
    let searchWrapper = document.querySelector(".header-search-wrapper");
    let headerSearch = document.querySelector(".header-search");

    if (window.innerWidth < 576) {
      searchWrapper.style.left = 15 - headerSearch.offsetLeft + "px";
      searchWrapper.style.right =
        15 +
        headerSearch.offsetLeft +
        headerSearch.clientWidth -
        window.innerWidth +
        "px";
    }
  };

  const onBodyClick = () => {
    if (document.querySelector(".header-search-wrapper")) {
      if (
        document
          .querySelector(".header-search-wrapper")
          .classList.contains("show")
      ) {
        document
          .querySelector(".header-search-wrapper")
          .classList.remove("show");
        document.querySelector("body").classList.remove("is-search-active");
      }

      if (document.querySelector(".header-search").classList.contains("show")) {
        document.querySelector(".header-search").classList.remove("show");
      }
    }
  };

  const {
    addClass = "",
    title = "",
    placeholder = "Search...",
    icon = "icon-search",
  } = props;

  return (
    <div className={`header-search ${addClass}`}>
      <Link
        to="#"
        className="search-toggle"
        role="button"
        onClick={onSearchClick}
      >
        <i className={icon}></i>
        {title}
      </Link>
      <form action="#" method="get">
        <div className="header-search-wrapper">
          <input
            type="search"
            className="form-control"
            name="q"
            id="q"
            placeholder={placeholder}
            required
          />
          <button className={`btn ${icon}`} type="submit"></button>
        </div>
      </form>
    </div>
  );
}

export default SearchToggle;

/** @format */

import React, { useState } from "react";
import img from "./images/PawPaw meme.jpg";
import img1 from "./images/Efile.jpg";
import "./Land.css";

const Land = () => {
  const [searchValue, setSearchValue] = useState("");
  const [Fetch, setFetch] = useState(false);
  const [notFetch, setNotFetch] = useState(false);
  const [data, setData] = useState("");
  const [data2, setData2] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [changeDef, setChangeDef] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const fetchData = async (url) => {
    setIsPending(true);
    setFetch(false);
    setNotFetch(false);

    console.log("Fetching Data");
    const res = await fetch(url);

    if (res.ok) {
      const data1 = await res.json();
      setTimeout(() => {
        // console.log(data1);
        // console.log(data1[0].phonetics);
        console.log("Data Fetched");
        setData(data1);
        setIsPending(false);
        setFetch(true);
        console.log(data1);
      }, 1000);
    } else {
      const data2 = await res.json();
      console.log("Error");
      console.log(data2);
      console.log(data2.title);
      console.log(data2.message);
      setNotFetch(true);
      setData2(data2);
      setIsPending(false);
      setIsPending(false);
    }
  };

  function NextDefinition() {
    setChangeDef(changeDef + 1);

    if (changeDef === 3) {
      document.querySelector(".btn").disabled = true;
      document.querySelector(".btn").style.opacity = 0;
      document.querySelector(".not").textContent =
        "Are you sure that's the right word?";
    }
  }

  function Search(e) {
    e.preventDefault();

    fetchData(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`);
  }
  return (
    <div className="dictionary">
      <h1>What word do you want to look up? </h1>

      <form onSubmit={Search}>
        <div className="form-div">
          <input
            onChange={(e) => {
              console.log(e.target.value);
              setSearchValue(e.target.value);
              setFetch(false);
              setNotFetch(false);
              setIsPending(false);
              if (e.target.value === "") {
                setIsTyping(false);
              } else {
                setIsTyping(true);
              }
            }}
            type="text"
            value={searchValue}
            name=""
            id=""
            placeholder="Type in a word"
          />
          <button>Search</button>
        </div>
      </form>
      {isTyping && (
        <div className="istyping">
          <p className="word">
            <span>Word: </span>
            {searchValue}
          </p>
        </div>
      )}

      <div className="info">
        {isPending && (
          <div className="info1">
            <img className="img" src={img1} alt="" />{" "}
            <h3>Efile, Eje ko load</h3>
          </div>
        )}
        {Fetch && (
          <div className="info2">
            <p className="deff">
              <span>Meaning: </span>
              {data[0].meanings[0].definitions[changeDef].definition}
            </p>
          </div>
        )}
        {notFetch && (
          <div className="info3">
            <img className="img" src={img} alt="" />
            <h3>{data2.title}</h3>
            <p>{data2.message} Check your spelling and search again.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Land;

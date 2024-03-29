"use client";
import { useEffect, useRef, useState } from "react";
// import styles from "./page.module.css";
import _ from "lodash";
import { useRouter } from "next/navigation";
import Game from "./Components/game";

export default function Home() {
  const router = useRouter();
  const info = useRef();
  const [change, setchange] = useState(false);

  return (
    <main>
      <div className="header">
        <img width={40} src="/favicon.ico" />
        <p>Hint Game</p>
        {change ? (
          <div
            onClick={() => {
              setchange(false);
              // setinfo(false);
              router.push("/game");
            }}
          >
            <img src="/pics/cancel.png" />
          </div>
        ) : (
          <div
            onClick={() => {
              // setinfo(!info);
              if (info.current.classList.contains("displaynone")) {
                info.current.classList.add("info");
                info.current.classList.remove("displaynone");
              } else {
                info.current.classList.add("displaynone");
                info.current.classList.remove("info");
              }
              console.log(info.current);

              const sound = new Audio();
              sound.src = "/sounds/info.wav";
              sound.play();
            }}
          >
            <i className="fi fi-rr-comment-info"></i>
          </div>
        )}
      </div>

      <Game setchange={setchange} />

      <div ref={info} className="displaynone">
        <p>Key Colors</p>
        <div className="colors">
          <div className="letter-right">Letter is right and place</div>
          <div className="letter-place">Letter is right but not in place</div>
          <div className="letter-wrong">
            Letter is wrong and not exist in word
          </div>
        </div>
      </div>
    </main>
  );
}

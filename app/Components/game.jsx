"use client";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import eng from "../../eng.json";
import store from "store2";

export default function Home({ setchange }) {
  const scoreSaved = store("score");
  let scored = scoreSaved ? scoreSaved : 0;

  const router = useRouter();
  const letters = useRef();
  const checkBtn = useRef();
  const hintBtn = useRef();
  const info = useRef();
  const score = useRef();
  const reset = useRef();
  const dataLetters = useRef();

  const englishWords = _.uniq(eng, "name");

  const dataWord =
    englishWords[Math.floor(Math.random() * englishWords.length)];

  let randomWord = dataWord.name.toUpperCase();

  console.log(dataWord, randomWord);

  let numberTry = 5;
  let numberLetters = randomWord.length;
  let currentTry = 1;

  let numberHint = 0;
  let arrayLetters;
  let arrayWord;

  function generateNum() {
    if (scored === 0) {
      reset.current.disabled = true;
    }

    const rr = numberLetters / 2;
    numberHint = rr.toFixed();
    hintBtn.current.children[0].innerHTML = numberHint;
    dataLetters.current.children[0].innerHTML = dataWord.category;
    dataLetters.current.children[1].innerHTML = dataWord.name.length;
    dataLetters.current.children[2].innerHTML = dataWord.mode;
    score.current.innerHTML = `SCORE : <span>${scored}</span>`;
  }
  function generateInputs() {
    const sound = new Audio();
    sound.src = "/sounds/start.wav";
    sound.play();

    generateNum();
    checkBtn.current.disabled = true;
    for (let i = 1; i <= numberTry; i++) {
      const tryDiv = document.createElement("div");
      tryDiv.classList.add(`try-${i}`);
      tryDiv.innerHTML = `<span>T-${i < 10 ? `0${i}` : i}</span>`;

      if (i !== 1) {
        tryDiv.classList.add("input-disabled");
      }

      for (let l = 1; l <= numberLetters; l++) {
        const input = document.createElement("input");
        input.type = "text";
        input.id = `try-${i}-letter-${l}`;
        input.autocomplete = "off";
        input.maxLength = 1;
        tryDiv.append(input);
      }

      letters.current.appendChild(tryDiv);
    }
    // console.log(letters.current);
    letters.current.children[0].children[1].focus();

    const inputWithDisabled = document.querySelectorAll(
      ".input-disabled input"
    );
    inputWithDisabled.forEach((elem) => (elem.disabled = true));

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input, index) => {
      input.oninput = () => {
        const sound = new Audio();
        sound.src = "/sounds/write.wav";
        sound.play();

        checkBtn.current.disabled = false;
        const next = inputs[index + 1];
        const prev = inputs[index - 1];
        if (next && input.value !== "" && input.value !== " ") {
          next.focus();
        } else if (prev && input.value === "") {
          prev.focus();
        }
      };
      input.onkeydown = (e) => {
        const current = Array.from(inputs).indexOf(e.target);
        if (e.key === "ArrowRight") {
          const next = current + 1;
          if (next < inputs.length) {
            inputs[next].focus();
          }
        } else if (e.key === "ArrowLeft") {
          const prev = current - 1;
          if (prev >= 0) {
            inputs[prev].focus();
          }
        }
      };
    });
  }
  function check() {
    const tip = document.querySelector(".tip");
    // let success = true;
    let scoreStatus;
    arrayLetters = [];
    arrayWord = [];
    let percent = (50 / 100) * randomWord.length;
    // checkBtn.current.disabled = true;
    for (let i = 1; i <= numberLetters; i++) {
      const input = document.querySelector(`#try-${currentTry}-letter-${i}`);
      const letter = input.value.toUpperCase();
      const currentLetter = randomWord[i - 1];
      arrayLetters.push(letter);
      arrayWord.push(currentLetter);
      // console.log(letter, currentLetter);
      if (letter === currentLetter) {
        input.classList.add("right");
        input.disabled = true;
      } else if (randomWord.includes(letter) && letter !== "") {
        input.classList.add("not-place");
        input.disabled = true;
      } else if (!randomWord.includes(letter) && letter !== "") {
        input.classList.add("wrong");
        input.disabled = true;
      }
      if (letter !== "" || numberHint === 0) {
        hintBtn.current.disabled = true;
      }

      // console.log(letter, currentLetter);
    }

    const result = _.isEqual(arrayLetters, arrayWord);
    const still = _.difference(arrayWord, arrayLetters);

    if (result === true && still.length <= 0) {
      setTimeout(() => {
        if (dataWord.mode === "Hard") {
          if (currentTry === 1) {
            scored += 100;
            scoreStatus = `+ 100`;
          } else if (currentTry === 2) {
            scored += 80;
            scoreStatus = `+ 80`;
          } else if (currentTry === 3) {
            scored += 65;
            scoreStatus = `+ 65`;
          } else if (currentTry === 4) {
            scored += 50;
            scoreStatus = `+ 50`;
          } else if (currentTry === 5) {
            scored += 40;
            scoreStatus = `+ 40`;
          }
          store("score", scored);
        } else if (dataWord.mode === "Average") {
          if (currentTry === 1) {
            scored += 75;
            scoreStatus = `+ 75`;
          } else if (currentTry === 2) {
            scored += 60;
            scoreStatus = `+ 60`;
          } else if (currentTry === 3) {
            scored += 45;
            scoreStatus = `+ 45`;
          } else if (currentTry === 4) {
            scored += 35;
            scoreStatus = `+ 35`;
          } else if (currentTry === 5) {
            scored += 25;
            scoreStatus = `+ 25`;
          }
          store("score", scored);
        } else if (dataWord.mode === "Easy") {
          if (currentTry === 1) {
            scored += 50;
            scoreStatus = `+ 50`;
          } else if (currentTry === 2) {
            scored += 40;
            scoreStatus = `+ 40`;
          } else if (currentTry === 3) {
            scored += 30;
            scoreStatus = `+ 30`;
          } else if (currentTry === 4) {
            scored += 20;
            scoreStatus = `+ 20`;
          } else if (currentTry === 5) {
            scored += 10;
            scoreStatus = `+ 10`;
          }
          store("score", scored);
        }

        checkBtn.current.disabled = true;
        hintBtn.current.disabled = true;
        setchange(true);

        tip.innerHTML = `
          <p>${randomWord.toUpperCase()}</p>
          <p>${dataWord.translation}</p>
          <img src="/pics/congrats.png" alt="win" />
          <div class='scoreNowWin'><span>${scoreStatus}</span></div>
          <div class='scoreNow'>SCORE : <span>${scored}</span></div>
          `;
        tip.classList.add("win");
        tip.classList.remove("almost");
        tip.classList.remove("lose");

        const sound = new Audio();
        sound.src = "/sounds/win.wav";
        sound.play();
      }, 800);
    } else if (still.length > percent) {
      tip.innerHTML = `Wrong!, Try Again ..`;
      tip.classList.add("lose");
      tip.classList.remove("almost");
    } else if (still.length <= percent) {
      tip.innerHTML = `<p>Good! You're Almost ..</p>`;
      tip.classList.add("almost");
      tip.classList.remove("lose");
    }

    if (result === false && !arrayLetters.includes("")) {
      if (numberHint > 0) {
        hintBtn.current.disabled = false;
      }

      const tryNow = document.querySelector(`.try-${currentTry}`);
      tryNow.classList.add("input-disabled");
      const current = document.querySelectorAll(`.try-${currentTry} input`);
      current.forEach((element) => {
        element.disabled = true;
        console.log("current", element);
      });

      currentTry++;

      const next = document.querySelectorAll(`.try-${currentTry} input`);
      next.forEach((element) => {
        element.disabled = false;
      });

      const tryNext = document.querySelector(`.try-${currentTry}`);
      if (tryNext) {
        tryNext.classList.remove("input-disabled");
        tryNext.children[1].focus();

        const sound = new Audio();
        sound.src = "/sounds/next.wav";
        sound.play();
      } else {
        setTimeout(() => {
          if (dataWord.mode === "Hard") {
            scored -= 25;
            scoreStatus = `- 25`;
            store("score", scored);
          } else if (dataWord.mode === "Average") {
            scored -= 50;
            scoreStatus = `- 50`;
            store("score", scored);
          } else if (dataWord.mode === "Easy") {
            scored -= 100;
            scoreStatus = `- 100`;
            store("score", scored);
          }
          if (scored < 0) {
            scored = 0;
            store("score", scored);
          }

          checkBtn.current.disabled = true;
          hintBtn.current.disabled = true;
          setchange(true);

          tip.innerHTML = `
        <p>${randomWord.toUpperCase()}</p>
        <p>${dataWord.translation}</p>
        <img src="/pics/good-luck.png" alt="lose" />
        <div class='scoreNowLose'><span>${scoreStatus}</span></div>
        <div class='scoreNow'>SCORE : <span>${scored}</span></div>
        
        `;
          tip.classList.add("losing");
          tip.classList.remove("lose");

          const sound = new Audio();
          sound.src = "/sounds/lose.wav";
          sound.play();
        }, 800);
      }
    }

    const sound = new Audio();
    sound.src = "/sounds/check.wav";
    sound.play();

    console.log(percent, still, result);
    console.log(arrayLetters, arrayWord, result, still);
  }

  function getHint() {
    if (numberHint > 0) {
      numberHint--;
      hintBtn.current.children[0].innerHTML = numberHint;
      checkBtn.current.disabled = false;
      const sound = new Audio();
      sound.src = "/sounds/hint.wav";
      sound.play();
    }
    if (numberHint === 0) {
      hintBtn.current.disabled = true;
    }

    const enable = document.querySelectorAll("input:not([disabled])");
    const empty = Array.from(enable).filter((elem) => elem.value === "");
    if (empty.length > 0) {
      // empty[0].focus();
      const randomIndex = Math.floor(Math.random() * empty.length);
      const randomInput = empty[randomIndex];
      const fill = Array.from(enable).indexOf(randomInput);
      if (fill !== -1) {
        randomInput.value = randomWord[fill].toUpperCase();
      }
    }
  }

  useEffect(() => {
    const interval = setTimeout(() => {
      generateInputs();
    }, 0);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <div className="container">
        <div className="side-game">
          <div ref={dataLetters} className="data">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div ref={letters} className="letters"></div>

          <div className="options">
            <button onClick={check} ref={checkBtn}>
              Check Word
            </button>
            <button ref={hintBtn} onClick={getHint}>
              Hint <span>{numberHint}</span>
            </button>
          </div>

          <div className="tip">Typing Letters in Fields ...</div>
          <div className="status">
            <div className="score" ref={score}>
              SCORE : <img width={30} src="/pics/loading.svg" />
            </div>
            <button
              ref={reset}
              onClick={(e) => {
                e.target.disabled = true;
                scored = 0;
                store("score", scored);
                score.current.innerHTML = `SCORE : <span>${scored}</span>`;

                const sound = new Audio();
                sound.src = "/sounds/reset.wav";
                sound.play();
              }}
            >
              Reset
            </button>
          </div>

       
        </div>
      </div>
    </main>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import eng from "../../eng.json";

export default function Home() {
  console.log(eng);
  const router = useRouter();
  const letters = useRef();
  const checkBtn = useRef();
  const hintBtn = useRef();
  const info = useRef();
  const dataLetters = useRef();
  const [change, setchange] = useState(false);
  // const [info, setinfo] = useState(false);

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
    const rr = numberLetters / 2;
    numberHint = rr.toFixed();
    hintBtn.current.children[0].innerHTML = numberHint;
    dataLetters.current.children[0].innerHTML = dataWord.category;
    dataLetters.current.children[1].innerHTML = dataWord.length;
    dataLetters.current.children[2].innerHTML = dataWord.mode;
  }
  function generateInputs() {
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
      checkBtn.current.disabled = true;
      hintBtn.current.disabled = true;
      setchange(true);

      tip.innerHTML = `
          <p>${randomWord.toUpperCase()}</p>
          <p>${dataWord.translation}</p>
          <img src="/pics/congrats.png" alt="win" />
          `;
      tip.classList.add("win");
      tip.classList.remove("almost");
      tip.classList.remove("lose");
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
      } else {
        checkBtn.current.disabled = true;
        hintBtn.current.disabled = true;
        setchange(true);

        tip.innerHTML = `
        <p>${randomWord.toUpperCase()}</p>
        <p>${dataWord.translation}</p>
        <img src="/pics/good-luck.png" alt="win" />
        
        `;
        tip.classList.add("losing");
        tip.classList.remove("lose");
      }
    }

    console.log(percent, still, result);
    console.log(arrayLetters, arrayWord, result, still);
  }

  function getHint() {
    if (numberHint > 0) {
      numberHint--;
      hintBtn.current.children[0].innerHTML = numberHint;
      checkBtn.current.disabled = false;
    }
    if (numberHint === 0) {
      hintBtn.current.disabled = true;
    }

    const enable = document.querySelectorAll("input:not([disabled])");
    const empty = Array.from(enable).filter((elem) => elem.value === "");
    if (empty.length > 0) {
      empty[0].focus();
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
            }}
          >
            <i className="fi fi-rr-comment-info"></i>
          </div>
        )}
      </div>
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
        </div>

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
      </div>
    </main>
  );
}

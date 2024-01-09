"use client";
import { useEffect, useRef } from "react";
import styles from "./page.module.css";
import _ from "lodash";

export default function Home() {
  const letters = useRef();
  const checkBtn = useRef();
  const hintBtn = useRef();

  const englishWords = [
    "apple",
    "banana",
    "car",
    "dog",
    "elephant",
    "flower",
    "guitar",
    "happy",
    "island",
    "jazz",
    "kite",
    "lemon",
    "mountain",
    "notebook",
    "ocean",
    "puzzle",
    "quilt",
    "rainbow",
    "sunshine",
    "tiger",
    "umbrella",
    "vibrant",
    "wonderful",
    "xylophone",
    "yellow",
    "zeppelin",
  ];
  let randomWord =
    englishWords[Math.floor(Math.random() * englishWords.length)].toUpperCase();

  let numberTry = 5;
  let numberLetters = randomWord.length;
  let currentTry = 1;
  let arrayLetters;
  let arrayWord;

  console.log(randomWord, numberLetters);
  function generateInputs() {
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
        // if (inputs[index].value === "" || inputs[index].value === " ") {
        //   if (inputs[index].classList.contains("right")) {
        //     inputs[index].classList.remove("right");
        //   } else if (inputs[index].classList.contains("not-place")) {
        //     inputs[index].classList.remove("not-place");
        //   } else if (inputs[index].classList.contains("wrong")) {
        //     inputs[index].classList.remove("wrong");
        //   }
        // }
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
      if (letter == currentLetter) {
        input.classList.add("right");
        input.disabled = true;
      } else if (randomWord.includes(letter) && letter !== "") {
        input.classList.add("not-place");
        input.disabled = true;
      } else if (!randomWord.includes(letter) && letter !== "") {
        input.classList.add("wrong");
        input.disabled = true;
      }

      // console.log(letter, currentLetter);
    }

    const result = _.isEqual(arrayLetters, arrayWord);
    const still = _.difference(arrayWord, arrayLetters);
    let hint = still.length;

    if (result === true && still.length <= 0) {
      checkBtn.current.disabled = true;
      hintBtn.current.disabled = true;

      tip.innerHTML = `Great! You Win ... The Word is
        <p>${randomWord.toUpperCase()}</p>`;
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
        tip.innerHTML = `Sorry! You Lose ... The Word is
        <p>${randomWord.toUpperCase()}</p>`;
        tip.classList.add("lose");
      }
    }

    console.log(percent, still, result);
    console.log(arrayLetters, arrayWord, result, still);
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
        <p>Hint Game</p>
      </div>
      <div className="container">
        <div className="side-game">
          <div ref={letters} className="letters"></div>

          <div className="options">
            <button onClick={check} ref={checkBtn}>
              Check Word
            </button>
            <button ref={hintBtn}>Hint</button>
          </div>

          <div className="tip">Typing Letters in Fields ...</div>
        </div>

        <div className="info">
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

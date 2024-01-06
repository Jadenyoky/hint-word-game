"use client";
import { useEffect, useRef } from "react";
import styles from "./page.module.css";

export default function Home() {
  const letters = useRef();
  const checkBtn = useRef();

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
    englishWords[Math.floor(Math.random() * englishWords.length)];

  let numberTry = 5;
  let numberLetters = randomWord.length;
  let currentTry = 1;

  console.log(randomWord, numberLetters);

  function generateInputs() {
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
        console.log(inputs[index], inputs[index].value);
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
    let success = true;
    // checkBtn.current.disabled = true;
    for (let i = 1; i <= numberLetters; i++) {
      const input = document.querySelector(`#try-${currentTry}-letter-${i}`);
      const letter = input.value;
      const currentLetter = randomWord[i - 1];

      // console.log(input);

      if (letter === currentLetter) {
        input.classList.add("right");
      } else if (randomWord.includes(letter) && letter !== "") {
        input.classList.add("not-place");
        success = false;
      } else if (!randomWord.includes(letter) && letter !== "") {
        input.classList.add("wrong");
        success = false;
      }
      if (
        input.classList.contains("right") ||
        input.classList.contains("not-place") ||
        input.classList.contains("wrong")
      ) {
        input.disabled = true;
      }

      const tip = document.querySelector(".tip");
      if (success && letter !== "") {
        tip.textContent = `Great! You Win ... The Word is ${randomWord}`;
        tip.classList.add("win");

        // console.log(letter, currentLetter);
      } else if (!success && letter !== "") {
        tip.textContent = `Wrong! ... Try Again`;
        tip.classList.add("lose");
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
        <p>Hint Game</p>
      </div>
      <div className="container">
        <div className="side-game">
          <div ref={letters} className="letters"></div>

          <div className="options">
            <button onClick={check} ref={checkBtn}>
              Check Word
            </button>
            <button>Hint</button>
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

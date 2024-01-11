"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import _ from "lodash";
import { useRouter } from "next/navigation";

export default function Home() {
  const eng = [
    "Canada",
    "Brazil",
    "India",
    "France",
    "Mexico",
    "China",
    "Russia",
    "Japan",
    "Egypt",
    "Italy",
    "Greece",
    "Chile",
    "Kenya",
    "Peru",
    "Nigeria",
    "Morocco",
    "Colombia",
    "Spain",
    "Uganda",
    "Australia",
    "Nepal",
    "Venezuela",
    "Argentina",
    "Vietnam",
    "Indonesia",
    "Thailand",
    "Malaysia",
    "Singapore",
    "Taiwan",
    "Bangladesh",
    "Switzerland",
    "Portugal",
    "Poland",
    "Denmark",
    "Finland",
    "Malawi",
    "Austria",
    "Cuba",
    "Sweden",
    "Norway",
    "Ireland",
    "Netherlands",
    "Palestine",
    "Iceland",
    "Egypt",
    "Riyadh",
    "Cairo",
    "Amman",
    "Tunis",
    "Baghdad",
    "Beirut",
    "Damascus",
    "Kuwait",
    "Muscat",
    "Doha",
    "Paris",
    "London",
    "Tokyo",
    "Berlin",
    "Sydney",
    "Rome",
    "Beijing",
    "Cairo",
    "Dubai",
    "Mumbai",
    "Rio",
    "Toronto",
    "Istanbul",
    "Bangkok",
    "Seoul",
    "Athens",
    "Stockholm",
    "Amsterdam",
    "Vienna",
    "Barcelona",
    "Prague",
    "Budapest",
    "Kyoto",
    "Singapore",
    "Hanoi",
    "Lisbon",
    "Dubrovnik",
    "Copenhagen",
    "Marrakech",
    "Vancouver",
    "Edinburgh",
    "Auckland",
    "Zurich",
    "Brussels",

    "Oslo",
    "Helsinki",
    "Jerusalem",
    "Nairobi",
    "Brisbane",
    "Santiago",
    "Bogota",
    "Kiev",
    "Madrid",
    "Tehran",
    "Amman",
    "Havana",
    "Reykjavik",
    "Nassau",
    "Lima",
    "Kingston",
    "lion",

    "elephant",
    "giraffe",
    "tiger",
    "penguin",
    "cheetah",
    "zebra",
    "koala",
    "kangaroo",
    "rhinoceros",
    "hippopotamus",
    "gorilla",
    "monkey",
    "crocodile",
    "dolphin",
    "whale",
    "panda",
    "koala",
    "seagull",
    "butterfly",
    "octopus",
    "shark",
    "parrot",
    "chimpanzee",
    "panther",
    "jaguar",
    "gazelle",
    "lemur",
    "platypus",
    "armadillo",
    "beetle",
    "antelope",
    "albatross",
    "armadillo",
    "buffalo",
    "chinchilla",
    "dingo",
    "falcon",
    "flamingo",
    "hyena",
    "jellyfish",
    "lemming",
    "lynx",
    "mantis",
    "mongoose",
    "narwhal",
    "ocelot",
    "orangutan",
    "ostrich",
    "pelican",

    "adventure",

    "discovery",
    "fantasy",

    "mystery",
    "challenge",
    "victory",
    "defeat",
    "triumph",
    "success",
    "failure",
    "sunset",
    "sunrise",
    "twilight",
    "dusk",
    "dawn",
    "midnight",
    "noon",
    "daytime",
    "nightfall",
    "starlight",
    "serenity",
    "tranquility",
    "calmness",
    "peacefulness",
    "quietude",
    "stillness",
    "silence",
    "harmony",
    "balance",
    "equilibrium",
    "imagination",
    "creativity",
    "innovation",
    "inspiration",
    "curiosity",
    "wisdom",
    "knowledge",
    "learning",
    "growth",
    "development",
    "connection",
    "communication",
    "collaboration",
    "cooperation",
    "community",
    "friendship",
    "relationship",
    "partnership",
    "companionship",
    "camaraderie",
    "health",
    "wellness",
    "fitness",
    "nutrition",
    "exercise",
    "meditation",
    "yoga",
    "mindfulness",
    "resilience",
    "strength",
    "music",
    "art",
    "dance",
    "theater",
    "film",
    "painting",
    "sculpture",
    "literature",
    "poetry",
    "photography",
    "explore",
    "discover",
    "wander",
    "roam",
    "journey",
    "venture",
    "travel",
    "expedition",
    "quest",
    "pilgrimage",
    "delight",
    "joy",
    "bliss",
    "happiness",
    "euphoria",
    "contentment",
    "pleasure",
    "satisfaction",
    "fulfillment",
    "gratification",
    "apple",
    "banana",
    "carrot",
    "grape",
    "orange",
    "banana",
    "grape",
    "kiwi",
    "strawberry",
    "watermelon",
    "peach",
    "mango",
    "blueberry",
    "elephant",
    "giraffe",
    "lion",
    "tiger",
    "zebra",
    "kangaroo",
    "penguin",
    "giraffe",
    "rhinoceros",
    "cheetah",
    "computer",
    "keyboard",
    "mouse",
    "monitor",
    "printer",
    "laptop",
    "tablet",
    "smartphone",
    "router",
    "speaker",
    "ocean",
    "mountain",
    "river",
    "forest",
    "desert",
    "valley",
    "canyon",
    "island",
    "cave",
    "lake",
    "sun",
    "moon",
    "star",
    "planet",
    "galaxy",
    "nebula",
    "quasar",
    "asteroid",
    "comet",
    "meteor",
    "happy",
    "sad",
    "angry",
    "surprised",
    "excited",
    "bored",
    "relaxed",
    "nervous",
    "confused",
    "curious",
    "love",
    "friendship",
    "family",
    "kindness",
    "compassion",
    "generosity",
    "forgiveness",
    "gratitude",
    "happiness",
    "peace",
    "book",
    "pen",
    "paper",
    "notebook",
    "pencil",
    "marker",
    "eraser",
    "scissors",
    "glue",
    "tape",
    "flower",
    "tree",
    "grass",
    "rose",
    "tulip",
    "daisy",
    "lily",
    "sunflower",
    "orchid",
    "cactus",
    "run",
    "walk",
    "jump",
    "swim",
    "climb",
    "crawl",
    "dance",
    "sing",
    "read",
    "write",
    "car",
    "bus",
    "train",
    "airplane",
    "bicycle",
    "motorcycle",
    "boat",
    "ship",
    "submarine",
    "helicopter",
    "happy",
    "sad",
    "angry",
    "surprised",
    "excited",
    "bored",
    "relaxed",
    "nervous",
    "confused",
    "curious",
    "laugh",
    "cry",
    "smile",
    "frown",
    "yawn",
    "blink",
    "sigh",
    "shiver",
    "grin",
    "snicker",
    "rain",
    "snow",
    "sunshine",
    "cloud",
    "wind",
    "storm",
    "thunder",
    "lightning",
    "rainbow",
    "fog",
    // ... continue with more words
  ];

  const router = useRouter();
  const letters = useRef();
  const checkBtn = useRef();
  const hintBtn = useRef();
  const info = useRef();
  const numLetters = useRef();
  const [change, setchange] = useState(false);
  // const [info, setinfo] = useState(false);

  const englishWords = _.uniq(eng);
  let randomWord =
    englishWords[Math.floor(Math.random() * englishWords.length)].toUpperCase();

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
    numLetters.current.innerHTML =
      numberLetters >= 9
        ? `hard - ${numberLetters}`
        : numberLetters >= 6
        ? `Normal - ${numberLetters}`
        : numberLetters >= 4
        ? `Easy - ${numberLetters}`
        : null;
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
          <div ref={numLetters} className="num"></div>
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

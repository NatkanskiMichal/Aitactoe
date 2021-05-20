class Game {
  constructor() {
    this.handlers = [...document.querySelectorAll(".btn")];
    this.firstShot;
    this.checkFill = false;
    this.allFills = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    //loader
    this.loader = document.createElement("div");
    //game result
    this.gameResult = document.createElement("div");
    // random times loader
    this.randomTimesLoader = [1000, 500, 700, 1500];
    //random text loader
    this.randomTextLoader = [
      "hmm...",
      "wait...",
      "I'm thinking...",
      "give me a time...",
      "ok...",
      "Just moment..."
    ];
    //generate randomTimes to loader
    this.randomTimes = Math.floor(
      Math.random() * this.randomTimesLoader.length
    );
    //game-blocker
    this.gameBlocker = document.createElement("div");
    //board
    this.board = document.querySelector(".board");
    // userChose
    this.userSelection;
    //stats
    this.playerWinsSpan = document.querySelector(".player-wins");
    this.aiWinsSpan = document.querySelector(".ai-wins");
    this.drawsSpan = document.querySelector(".draws");
    this.playerWins = 0;
    this.aiWins = 0;
    this.draws = 0;
    this.hardLevelStart = false;
  }

  addGameResult = result => {
    this.gameResult.classList.add("game-result");
    this.gameResult.textContent = result;
    const span = document.createElement("span");
    this.gameResult.appendChild(span);
    this.board.appendChild(this.gameResult);
  };

  removeGameResult = () => {
    this.gameResult.parentNode.removeChild(this.gameResult);
  };

  checkWin = () => {
    if (
      (this.handlers[0].classList.contains("user") &&
        this.handlers[1].classList.contains("user") &&
        this.handlers[2].classList.contains("user")) ||
      (this.handlers[0].classList.contains("user") &&
        this.handlers[3].classList.contains("user") &&
        this.handlers[6].classList.contains("user")) ||
      (this.handlers[0].classList.contains("user") &&
        this.handlers[4].classList.contains("user") &&
        this.handlers[8].classList.contains("user")) ||
      (this.handlers[2].classList.contains("user") &&
        this.handlers[5].classList.contains("user") &&
        this.handlers[8].classList.contains("user")) ||
      (this.handlers[2].classList.contains("user") &&
        this.handlers[4].classList.contains("user") &&
        this.handlers[6].classList.contains("user")) ||
      (this.handlers[6].classList.contains("user") &&
        this.handlers[7].classList.contains("user") &&
        this.handlers[8].classList.contains("user")) ||
      (this.handlers[1].classList.contains("user") &&
        this.handlers[4].classList.contains("user") &&
        this.handlers[7].classList.contains("user")) ||
      (this.handlers[3].classList.contains("user") &&
        this.handlers[4].classList.contains("user") &&
        this.handlers[5].classList.contains("user"))
    ) {
      this.playerWinsSpan.classList.add("active");
      this.playerWins++;
      this.playerWinsSpan.textContent = this.playerWins;
      if (this.playerWins === 5) {
        this.addGameResult("Now you make me angry!");
      } else {
        this.addGameResult("You win...");
      }

      setTimeout(() => {
        this.removeGameResult();
        this.playerWinsSpan.classList.remove("active");
      }, 1000);
      this.allFills = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      this.handlers.forEach(el => {
        el.textContent = "";
        el.classList.remove("user");
        el.classList.remove("ai");
      });
    } else if (
      (this.handlers[0].classList.contains("ai") &&
        this.handlers[1].classList.contains("ai") &&
        this.handlers[2].classList.contains("ai")) ||
      (this.handlers[0].classList.contains("ai") &&
        this.handlers[3].classList.contains("ai") &&
        this.handlers[6].classList.contains("ai")) ||
      (this.handlers[0].classList.contains("ai") &&
        this.handlers[4].classList.contains("ai") &&
        this.handlers[8].classList.contains("ai")) ||
      (this.handlers[2].classList.contains("ai") &&
        this.handlers[5].classList.contains("ai") &&
        this.handlers[8].classList.contains("ai")) ||
      (this.handlers[2].classList.contains("ai") &&
        this.handlers[4].classList.contains("ai") &&
        this.handlers[6].classList.contains("ai")) ||
      (this.handlers[6].classList.contains("ai") &&
        this.handlers[7].classList.contains("ai") &&
        this.handlers[8].classList.contains("ai")) ||
      (this.handlers[1].classList.contains("ai") &&
        this.handlers[4].classList.contains("ai") &&
        this.handlers[7].classList.contains("ai")) ||
      (this.handlers[3].classList.contains("ai") &&
        this.handlers[4].classList.contains("ai") &&
        this.handlers[5].classList.contains("ai"))
    ) {
      this.addGameResult("You lost...");
      this.aiWinsSpan.classList.add("active");
      this.aiWins++;
      this.aiWinsSpan.textContent = this.aiWins;
      setTimeout(() => {
        this.removeGameResult();
        this.aiWinsSpan.classList.remove("active");
      }, 1000);
      this.allFills = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      this.handlers.forEach(el => {
        el.textContent = "";
        el.classList.remove("user");
        el.classList.remove("ai");
      });
    } else {
      for (let i = 0; i < this.allFills.length; i++) {
        if (typeof this.allFills[i] === "number") return false;
      }

      this.addGameResult("We have a draw...");
      this.drawsSpan.classList.add("active");
      this.draws++;
      this.drawsSpan.textContent = this.draws;
      setTimeout(() => {
        this.removeGameResult();
        this.drawsSpan.classList.remove("active");
      }, 1000);
      this.allFills = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      this.handlers.forEach(el => {
        el.textContent = "";
        el.classList.remove("user");
        el.classList.remove("ai");
      });
    }
  };

  addLoadder = () => {
    const randomText = Math.floor(Math.random() * this.randomTextLoader.length);
    this.loader.classList.add("ai-loader");
    this.loader.textContent = this.randomTextLoader[randomText];
    const span = document.createElement("span");
    this.loader.appendChild(span);
    this.board.appendChild(this.loader);
  };

  removeLoader = () => {
    this.loader.parentNode.removeChild(this.loader);
  };

  renderGame = () => {
    this.handlers.forEach((btn, i) => {
      btn.addEventListener("click", e => {
        if (btn.classList.contains("user") || btn.classList.contains("ai")) {
          btn.classList.remove("activeLvl");
          btn.classList.add("active");
          setInterval(() => {
            btn.classList.remove("active");
          }, 500);
          return;
        }
        this.gameBlocker.classList.add("game-blocker");
        this.board.appendChild(this.gameBlocker);

        this.userSelection = i;

        e.currentTarget.classList.add("user");
        e.currentTarget.textContent = "x";
        this.allFills.splice(i, 1, "x");
        this.checkWin();
        this.checkFill = true;
        this.addLoadder();

        setTimeout(() => {
          this.checkShot();
          this.removeLoader();
          this.gameBlocker.parentNode.removeChild(this.gameBlocker);
        }, this.randomTimesLoader[this.randomTimes]);
      });
    });
  };

  random = () => {
    this.firstShot = Math.floor(Math.random() * this.allFills.length);
  };

  aiChoose = fill => {
    if (
      this.allFills[this.firstShot] === "x" &&
      this.allFills[this.firstShot] === "o"
    ) {
      this.random();
    } else {
      this.firstShot = fill;
    }
  };

  checkLevel = () => {
    if (this.playerWins === 5) {
      this.hardLevelStart = true;
      document.body.style.background = `rgb(30,30,30)`;
      this.handlers.forEach(btn => {
        btn.classList.add("activeLvl");
      });
    }
  };

  checkShot = () => {
    if (this.checkFill === true) {
      this.random();
      if (this.hardLevelStart === true) {
        if (
          (this.handlers[1].classList.contains("user") &&
            this.handlers[2].classList.contains("user")) ||
          (this.handlers[3].classList.contains("user") &&
            this.handlers[6].classList.contains("user")) ||
          (this.handlers[4].classList.contains("user") &&
            this.handlers[8].classList.contains("user"))
        ) {
          if (
            this.handlers[0].classList.contains("user") ||
            this.handlers[0].classList.contains("ai")
          ) {
            this.random();
            this.aiChoose(this.firstShot);
          } else {
            this.aiChoose(0);
          }
        } else if (
          (this.handlers[0].classList.contains("user") &&
            this.handlers[2].classList.contains("user")) ||
          (this.handlers[4].classList.contains("user") &&
            this.handlers[7].classList.contains("user"))
        ) {
          if (
            this.handlers[1].classList.contains("user") ||
            this.handlers[1].classList.contains("ai")
          ) {
            this.random();
            this.aiChoose(this.firstShot);
          } else {
            this.aiChoose(1);
          }
        } else if (
          (this.handlers[0].classList.contains("user") &&
            this.handlers[1].classList.contains("user")) ||
          (this.handlers[4].classList.contains("user") &&
            this.handlers[6].classList.contains("user")) ||
          (this.handlers[5].classList.contains("user") &&
            this.handlers[8].classList.contains("user"))
        ) {
          if (
            this.handlers[2].classList.contains("user") ||
            this.handlers[2].classList.contains("ai")
          ) {
            this.random();
            this.aiChoose(this.firstShot);
          } else {
            this.aiChoose(2);
          }
        } else if (
          (this.handlers[0].classList.contains("user") &&
            this.handlers[6].classList.contains("user")) ||
          (this.handlers[4].classList.contains("user") &&
            this.handlers[5].classList.contains("user"))
        ) {
          if (
            this.handlers[3].classList.contains("user") ||
            this.handlers[3].classList.contains("ai")
          ) {
            this.random();
            this.aiChoose(this.firstShot);
          } else {
            this.aiChoose(3);
          }
        } else if (
          (this.handlers[3].classList.contains("user") &&
            this.handlers[5].classList.contains("user")) ||
          (this.handlers[0].classList.contains("user") &&
            this.handlers[8].classList.contains("user")) ||
          (this.handlers[1].classList.contains("user") &&
            this.handlers[7].classList.contains("user")) ||
          (this.handlers[2].classList.contains("user") &&
            this.handlers[6].classList.contains("user"))
        ) {
          if (
            this.handlers[4].classList.contains("user") ||
            this.handlers[4].classList.contains("ai")
          ) {
            this.random();
            this.aiChoose(this.firstShot);
          } else {
            this.aiChoose(4);
          }
        } else if (
          (this.handlers[3].classList.contains("user") &&
            this.handlers[4].classList.contains("user")) ||
          (this.handlers[2].classList.contains("user") &&
            this.handlers[8].classList.contains("user"))
        ) {
          if (
            this.handlers[5].classList.contains("user") ||
            this.handlers[5].classList.contains("ai")
          ) {
            this.random();
            this.aiChoose(this.firstShot);
          } else {
            this.aiChoose(5);
          }
        } else if (
          (this.handlers[0].classList.contains("user") &&
            this.handlers[3].classList.contains("user")) ||
          (this.handlers[4].classList.contains("user") &&
            this.handlers[2].classList.contains("user")) ||
          (this.handlers[7].classList.contains("user") &&
            this.handlers[8].classList.contains("user"))
        ) {
          if (
            this.handlers[6].classList.contains("user") ||
            this.handlers[6].classList.contains("ai")
          ) {
            this.random();
            this.aiChoose(this.firstShot);
          } else {
            this.aiChoose(6);
          }
        } else if (
          (this.handlers[6].classList.contains("user") &&
            this.handlers[8].classList.contains("user")) ||
          (this.handlers[1].classList.contains("user") &&
            this.handlers[4].classList.contains("user"))
        ) {
          if (
            this.handlers[7].classList.contains("user") ||
            this.handlers[7].classList.contains("ai")
          ) {
            this.random();
            this.aiChoose(this.firstShot);
          } else {
            this.aiChoose(7);
          }
        } else if (
          (this.handlers[6].classList.contains("user") &&
            this.handlers[7].classList.contains("user")) ||
          (this.handlers[0].classList.contains("user") &&
            this.handlers[4].classList.contains("user")) ||
          (this.handlers[2].classList.contains("user") &&
            this.handlers[5].classList.contains("user"))
        ) {
          if (
            this.handlers[8].classList.contains("user") ||
            this.handlers[8].classList.contains("ai")
          ) {
            this.random();
            this.aiChoose(this.firstShot);
          } else {
            this.aiChoose(8);
          }
        }
      }

      if (this.allFills[this.firstShot] === "x") {
        this.checkFill = true;
        this.checkShot();
      } else if (this.allFills[this.firstShot] === "o") {
        this.checkFill = true;
        this.checkShot();
      } else {
        this.checkFill = false;
        this.allFills.splice(this.firstShot, 1, "o");
        this.handlers[this.firstShot].classList.add("ai");
        this.handlers[this.firstShot].textContent = "o";
        this.checkWin();
        this.checkLevel();
      }
    }
  };
}

const game = new Game();
game.renderGame();

<template>
  <div class="simon-says">
    <div class="game-board">
      <div class="simon">
        <ul>
          <li
            id="red"
            :class="[activeColor === 'red' ? 'tile red active' : 'tile', 'red']"
            @click="playerClick('red')"
          ></li>
          <li
            id="blue"
            :class="[
              activeColor === 'blue' ? 'tile blue active' : 'tile',
              'blue',
            ]"
            @click="playerClick('blue')"
          ></li>
          <li
            id="yellow"
            :class="[
              activeColor === 'yellow' ? 'tile yellow active' : 'tile',
              'yellow',
            ]"
            @click="playerClick('yellow')"
          ></li>
          <li
            id="green"
            :class="[
              activeColor === 'green' ? 'tile green active' : 'tile',
              'green',
            ]"
            @click="playerClick('green')"
          ></li>
        </ul>
      </div>
    </div>
    <div class="game-info">
      <h2>
        Раунд: <span value="0">{{ round }}</span>
      </h2>
      <button @click="startGame">Начать</button>
    </div>
    <div class="game-options">
      <h2>Сложность игры:</h2>
      <div>
        <label>Легко (1.5 сек)</label
        ><input type="radio" name="mode" value="0" v-model="difficulty" />
      </div>
      <div>
        <label>Нормально (1 сек)</label
        ><input type="radio" name="mode" value="1" v-model="difficulty" />
      </div>
      <div>
        <label>Сложно (0.4 сек)</label
        ><input type="radio" name="mode" value="2" v-model="difficulty" />
      </div>
    </div>
    <audio
      id="red-sound"
      src="https://github.com/MashPot1/simon-says-vue2/blob/main/src/assets/sounds/1.mp3"
    ></audio>
    <audio
      id="blue-sound"
      src="https://github.com/MashPot1/simon-says-vue2/blob/main/src/assets/sounds/2.mp3"
    ></audio>
    <audio
      id="yellow-sound"
      src="https://github.com/MashPot1/simon-says-vue2/blob/main/src/assets/sounds/3.mp3"
    ></audio>
    <audio
      id="green-sound"
      src="https://github.com/MashPot1/simon-says-vue2/blob/main/src/assets/sounds/4.mp3"
    ></audio>
  </div>
</template>

<script>
export default {
  name: "SimonSays",
  data() {
    return {
      colors: ["red", "blue", "yellow", "green"],
      activeColor: "",
      sequence: [],
      playerSequence: [],
      gameDifficult: [1500, 1000, 400],
      round: 1,
      isPlaying: false,
      difficulty: 0,
    };
  },
  methods: {
    lightUp(color) {
      if (this.isPlaying) {
        this.activeColor = color;
        let audio = document.getElementById(`${color}-sound`);
        audio.play();
        setTimeout(() => {
          this.unLightUp();
        }, this.gameDifficult[this.difficulty] - 200);
      }
    },
    unLightUp() {
      this.activeColor = "";
    },
    startGame() {
      this.isPlaying = true;
      this.sequence = [];
      this.playerSequence = [];
      this.triggerNextMove();
    },
    triggerNextMove() {
      // generate number 0 to 3
      let randomIndex = Math.floor(Math.random() * this.colors.length);
      // and push it to sequence
      this.sequence.push(this.colors[randomIndex]);
      this.unLightUp();
      // after call light up sequence
      this.lightUpSequence(this.sequence);
    },
    lightUpSequence(sequence) {
      let i = 0;
      let interval = setInterval(() => {
        this.lightUp(sequence[i]);
        i++;
        if (i >= sequence.length) {
          clearInterval(interval);
        }
      }, this.gameDifficult[this.difficulty]);
    },
    playerClick(color) {
      if (this.isPlaying) {
        this.playerSequence.push(color);
        this.lightUp(color); // подсветим нажатый цвет
        if (this.playerSequence.length === this.sequence.length) {
          this.checkSequence();
        }
      }
    },
    checkSequence() {
      const isEqual = this.playerSequence.every(
        (value, index) => value === this.sequence[index]
      );
      if (isEqual) {
        if (this.playerSequence.length === this.round) {
          this.round += 1;
          this.playerSequence = [];
          setTimeout(() => {
            this.triggerNextMove();
          }, 1000);
        }
      } else {
        this.playerSequence = [];
        this.isPlaying = false;
        this.sequence = [];
        this.round = 1;
        alert("Вы проиграли!"); // сообщение об окончании игры
      }
    },
  },
};
</script>

<style>
ul {
  list-style: none;
}

ul,
li {
  padding: 0;
  margin: 0;
}

p[data-action="lose"] {
  display: none;
}

.active {
  opacity: 1 !important;
}

.simon-says {
  width: 540px;
  margin: 0 auto;
}
.simon {
  background: #fff;
  position: relative;
  float: left;
  margin-right: 3em;
  width: 295px;
  height: 290px;
  border-radius: 150px 150px 150px 150px;
  box-shadow: 2px 1px 12px #aaa;
}

.tile {
  opacity: 0.6;
  transition: opacity 250ms ease;
}

.tile:hover {
  cursor: pointer;
}

.tile.active {
  opacity: 1;
}

.red,
.blue,
.yellow,
.green {
  height: 290px;
  border-radius: 150px 150px 150px 150px;
  position: absolute;
  text-indent: 10000px;
}

.red:hover,
.blue:hover,
.yellow:hover,
.green:hover {
  border: 2px solid black;
}

.red {
  background: #ff5643;
  clip: rect(0px, 300px, 150px, 150px);
  width: 296px;
}

.blue {
  background: dodgerblue;
  clip: rect(0px, 150px, 150px, 0px);
  width: 300px;
}

.yellow {
  background: #feef33;
  clip: rect(150px, 150px, 300px, 0px);
  width: 300px;
}

.green {
  background: #bede15;
  clip: rect(150px, 300px, 300px, 150px);
  width: 296px;
}

.game-info {
  margin-top: 90px;
}

.game-info button {
  width: 5em;
  box-sizing: border-box;
  font-size: 1.4em;
  border-radius: 10px 10px 10px 10px;
  background: #78bcff;
  border: none;
  padding: 0.3em 0.6em;
}

.game-info button:hover {
  background: #4380bd;
  cursor: pointer;
}

.game-options {
  height: 200px;
  width: 180px;
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  flex-direction: column;
}

.game-options h2 {
  margin-top: 30px;
  margin-bottom: 0;
}

.game-options input[type="radio"] {
  margin-right: 10px;
}
</style>

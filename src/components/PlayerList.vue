<template>
  <div class="player-list">
    <ul>
      <li
        v-for="player in players"
        :key="player.id"
        :class="{ death: !player.isAlive }"
      >
        <span class="name">
          {{ player.name }}
        </span>
        <button
          class="vote"
          v-if="isVote && playersVote.map(p => p.id).includes(player.id)"
          @click="submitVote(player.id)"
        >
          Vote
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { sendData } from "../utils/socket";

export default {
  name: "PlayerList",
  data() {
    return {
      isVote: false,
      playersVote: []
    };
  },
  computed: {
    ...mapGetters(["players", "socket"])
  },
  methods: {
    submitVote(playerId) {
      sendData("vote", this.socket.id, playerId);
    }
  },
  created() {
    this.socket.on("voteStart", players => {
      this.isVote = true;
      this.playersVote = players;
    });
    this.socket.on("voteEnd", () => {
      this.isVote = false;
      this.playersVote = [];
    });
  }
};
</script>

<style lang="scss" scoped>
.death {
  text-decoration: line-through;
}
.player-list {
  float: right;
  width: 40vh;
  line-height: 2em;
  text-align: left;
}
.name {
  overflow-wrap: break-word;
}
.vote {
  float: right;
}
ul {
  list-style: "- ";
}
</style>

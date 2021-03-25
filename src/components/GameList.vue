<template>
  <div class="gameList">
    <ul>
      <li v-for="game in games" v-bind:key="game.gameId">
        {{ game.id }} {{ game.nbPlayer }}/{{ game.maxPlayer }}
        <button
          v-if="game.maxPlayer - game.nbPlayer > 0"
          @click="joinGame(game.id)"
        >
          Join game
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { sendData } from "@/utils/socket";

export default {
  name: "GameList",
  computed: {
    ...mapGetters(["games"])
  },
  methods: {
    joinGame(gameId) {
      sendData("join", gameId);
    }
  }
};
</script>

<style scoped></style>

<template>
  <div id="app">
    <notifications group="game" position="top center" />
    <Game v-if="gameId"></Game>
    <div v-else>
      <button @click="createGame">Create game</button>
      <GameList />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { connect, sendData } from "@/utils/socket";

export default {
  name: "App",
  components: {
    Game: () => import("./components/Game"),
    GameList: () => import("./components/GameList")
  },
  methods: {
    ...mapActions(["setSocket"]),
    createGame() {
      if (!this.gameId) sendData("create", this.socket.id);
    }
  },
  computed: {
    ...mapGetters(["gameId", "socket"])
  },
  created() {
    this.setSocket(connect(process.env.VUE_APP_SERVER_URI));
    this.socket.on("win", win => {
      this.$notify({
        group: "game",
        title: "Victoire",
        type: "success",
        text: win
      });
    });
  }
};
</script>

<style lang="scss"></style>

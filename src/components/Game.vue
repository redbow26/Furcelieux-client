<template>
  <div class="game">
    <span>GAME ID: {{ gameId }}</span>
    <br />
    <div class="config" v-if="!isStarted">
      <button @click="startGame">Start the game</button>
    </div>

    <div class="game-info">
      <RoleCard v-if="role" />
      <Chat />
      <PlayerList />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Game",
  data() {
    return {
      isStarted: false
    };
  },
  components: {
    PlayerList: () => import("./PlayerList"),
    RoleCard: () => import("./RoleCard"),
    Chat: () => import("./Chat")
  },
  methods: {
    ...mapActions(["setRole"]),
    startGame() {
      this.socket.emit("start", this.gameId);
    }
  },
  computed: {
    ...mapGetters(["socket", "role", "gameId"])
  },
  created() {
    this.socket.on("start", () => {
      this.isStarted = true;
    });
    this.socket.on("role", role => {
      this.setRole(role);
    });

    this.socket.on("kill", kill => {
      this.$notify({
        type: "error",
        title: "kill",
        group: "game",
        text: kill
      });
    });
  },
  destroyed() {
    this.socket.off("start");
    this.socket.off("role");
    this.socket.off("voteStart");
    this.socket.off("voteEnd");
    this.socket.off("kill");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.game-info {
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  width: 85%;
}
</style>

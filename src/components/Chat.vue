<template>
  <div class="chat">
    <p v-for="msg in messages" :key="messages.indexOf(msg)" :class="{color: msg.color}">
      <span v-if="msg.name">{{ msg.name }}:</span> <span>{{ msg.message }}</span>
    </p>
    <input type="text" v-model="message" />
    <button @click="sendMessage">Envoyer le message</button>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Chat",
  data() {
    return {
      message: "",
      messages: []
    };
  },
  methods: {
    sendMessage() {
      this.socket.emit("message", this.socket.id, this.message);
      this.message = "";
    },
    receiveMessage({ message, name, color }) {
      this.messages.push({
        message,
        name,
        color
      });
      if (this.messages.length > 25) {
        this.messages.shift();
      }
    }
  },
  computed: {
    ...mapGetters(["socket"])
  },
  created() {
    this.socket.on("message", this.receiveMessage);
  },
  destroyed() {
    this.socket.off("message");
  }
};
</script>

<style scoped>

</style>

<template>
  <div class="chat">
    <div class="chat-box">
      <p
        v-for="msg in messages"
        :key="messages.indexOf(msg)"
        :style="{ color: msg.color }"
      >
        <span v-if="msg.name">{{ msg.name }}:</span> {{ msg.message }}
      </p>
    </div>
    <form @submit.prevent="sendMessage" class="message">
      <label>
        <input type="text" v-model="message" />
      </label>
      <input type="submit" value="Envoyer le message" />
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
      console.log(color);
      this.$nextTick(() => {
        const chatBox = this.$el.getElementsByClassName("chat-box")[0];
        chatBox.scrollTop = chatBox.clientHeight;
      });
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

<style lang="scss" scoped>
.chat {
  width: 30%;
  margin: 0 auto;
}
.chat-box {
  border: 1px solid black;
  overflow-wrap: break-word;
  border-radius: 5px;
  height: 70vh;
  overflow: auto;
}
</style>

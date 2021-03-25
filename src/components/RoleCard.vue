<template>
  <div class="roleCard">
    <button @click="$modal.show('role')">Role</button>
    <modal name="role">
      <h1>{{ this.role.name }}</h1>
      <span>{{ this.role.description }}</span>
    </modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "RoleCard",
  computed: {
    ...mapGetters(["role"])
  },
  mounted() {
    this.$modal.show("role");
  }
};
</script>

<style scoped></style>

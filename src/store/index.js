import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    socket: null,
    gameId: null,
    games: [],
    players: [],
    role: null
  },
  mutations: {
    SET_SOCKET(state, socket) {
      state.socket = socket;
    },
    SET_PLAYER(state, players) {
      state.players = players;
    },
    SET_ROLE(state, role) {
      state.role = role;
    },
    SET_GAME_ID(state, gameId) {
      state.gameId = gameId;
    },
    SET_GAMES(state, games) {
      state.games = games;
    }
  },
  actions: {
    setSocket: ({ commit }, socket) => commit("SET_SOCKET", socket),
    setGameId: ({ commit }, gameId) => commit("SET_GAME_ID", gameId),
    setGames: ({ commit }, games) => commit("SET_GAMES", games),
    setRole: ({ commit }, role) => commit("SET_ROLE", role),
    setPlayer: ({ commit }, players) => commit("SET_PLAYER", players)
  },
  modules: {},
  getters: {
    socket: state => state.socket,
    gameId: state => state.gameId,
    players: state => state.players,
    role: state => state.role,
    games: state => state.games
  }
});

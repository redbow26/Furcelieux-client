import { io } from "socket.io-client";
import store from "../store";

const join = async gameId => {
  await store.dispatch("setGameId", gameId);
};

const updatePlayer = async players => {
  await store.dispatch("setPlayer", players);
};

const updateGames = async games => {
  await store.dispatch("setGames", games);
};

const leave = async () => {
  await store.dispatch("setGameId", null);
  await store.dispatch("setPlayer", []);
  await store.dispatch("setRole", null);
};

export const connect = url => {
  console.log("Starting connection");
  const socket = io(url);
  socket.on("join", join);
  socket.on("leave", leave);
  socket.on("updatePlayer", updatePlayer);
  socket.on("updateGames", updateGames);
  return socket;
};

// eslint-disable-next-line
export const sendData = (method, clientId, data) => {
  const socket = store.getters.socket;
  if (!socket) throw new Error("No socket.io connection");
  socket.emit(method, clientId, data);
};

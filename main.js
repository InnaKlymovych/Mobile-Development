import AudioPlayer from "./components/AudioPlayer.js";
import Controller from "./components/Controller.js";
import Info from "./components/Info.js";
import Menu from "./components/Menu.js";
import PeekABoo from "./components/PeekABoo.js";
import RangeBar from "./components/RangeBar.js";

let appData;
let audioPlayer;

let peekaboo;
let info;
let controller;
let volumeBar;
let menu;

const API_URL = "https://purring-cyclic-jackrabbit.glitch.me/";

window.onload = async () => {
  console.log("loading...");
  await initialize(API_URL);
  setupLayout();
  setupAudio();

  console.log("ready!");
};

const initialize = async (api_url) => {
  try {
    const req = await fetch(api_url, {
      headers: {
        "Accept-Encoding": "gzip",
      },
    });
    const apiData = await req.json();
    console.log("ijd", apiData);
    appData = [
      ...apiData,
      {
        type: "open",
        name: "open...",
      },
      {
        type: "reset",
        name: "reset",
      },
    ];
  } catch (error) {
    console.log(error);
  }
};

const setupLayout = () => {
  peekaboo = new PeekABoo("#peek-a-boo");

  info = new Info("#info", (value) => {
    console.log("info", value);
  });

  controller = new Controller("#controller", (action) => {
    switch (action) {
      case "play":
        audioPlayer.currentTrack ? audioPlayer.play() : menu.open();
        break;
      case "pause":
        audioPlayer.pause();
        break;
      case "next":
        audioPlayer.next();
        break;
      case "previous":
        audioPlayer.previous();
        break;
    }
  });

  volumeBar = new RangeBar("#volume", (value) => {
    audioPlayer.volume = value;
  });

  menu = new Menu("#menu", async (value) => {
    switch (value.type) {
      case "opening":
        info.close();
        break;
      case "music":
      case "file":
        menu.close();
        await audioPlayer.play(value, fetchPlaylist(appData, value.id));
        break;
      case "open":
        document.querySelector("#file-input").click();
        break;

      case "reset":
        menu.close();
        await initialize(`${API_URL}/reset`);
        menu.data = appData;
        peekaboo.show("Data updated!");
        break;
    }
  });
  menu.data = appData;

  const fileInput = document.querySelector("#file-input");
  fileInput.onchange = async () => {
    const localPlaylist = [];
    Array.from(fileInput.files).forEach((file) => {
      localPlaylist.push({
        id: file.name,
        name: file.name,
        url: URL.createObjectURL(file),
      });
    });
    menu.close();
    await audioPlayer.play(localPlaylist[0], localPlaylist);
  };
};

const setupAudio = () => {
  audioPlayer = new AudioPlayer((action, error = null) => {
    controller.setState(action);

    switch (action) {
      case "error":
        info.update({
          name: audioPlayer.currentTrack.name,
          type: "error",
          error: error,
        });
        break;
      case "play":
        menu.setTrail(audioPlayer.currentTrack.id.split("/"));
        break;

      default:
        break;
    }
    if (action !== "error") {
      info.update(audioPlayer.currentTrack);
    }
  });
  audioPlayer.volume = volumeBar.value;
};

const fetchPlaylist = (node, itemID) => {
  let item = null;
  for (let i = 0; i < node.length; i++) {
    const n = node[i];
    if (n.children) item = fetchPlaylist(n.children, itemID);
    else if (n.id === itemID) item = node;

    if (item) break;
  }
  return item;
};

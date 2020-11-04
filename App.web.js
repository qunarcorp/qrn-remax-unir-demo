import Home from './src/pages/home/index';
import { AppRegistry } from "react-native";
// register the app
AppRegistry.registerComponent("Home", () => Home);
// web enterance
AppRegistry.runApplication("Home", {
    initialProps: {},
    rootTag: document.getElementById("app")
});

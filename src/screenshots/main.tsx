import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/source-sans-3/latin-400.css";
import "@fontsource/source-sans-3/latin-500.css";
import "@fontsource/source-sans-3/latin-600.css";
import "@fontsource/source-sans-3/latin-700.css";
import "@fontsource/geist-sans/latin-400.css";
import "@fontsource/geist-sans/latin-500.css";
import "@fontsource/geist-sans/latin-600.css";
import "@fontsource/geist-sans/latin-700.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-600.css";
import "../styles/tokens.css";
import "../styles/themes.css";
import "../styles/window-shell.css";
import "../styles/components.css";
import "../styles/theme-features.css";
import "../styles/startup-dialog.css";
import "../main-window/main-window.css";
import "../main-window/styles/index.css";
import "../ui/tree/tree-view.css";
import "../features/scenes/editor/scene-editor.css";
import { ScreenshotHarness } from "./ScreenshotHarness";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ScreenshotHarness />
  </React.StrictMode>,
);

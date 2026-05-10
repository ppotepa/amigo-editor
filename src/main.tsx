import { installConsoleLogFile } from "./debug/consoleLogFile";

installConsoleLogFile();

if (new URLSearchParams(window.location.search).has("screenshot")) {
  void import("./screenshots/main").catch((error: unknown) => {
    console.error("Failed to bootstrap Amigo Editor screenshot harness", error);
  });
} else {
  void import("./mainApp").catch((error: unknown) => {
    console.error("Failed to bootstrap Amigo Editor", error);
  });
}

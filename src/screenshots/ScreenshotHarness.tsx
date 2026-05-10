import { AppSplash } from "../startup/AppSplash";
import { ThemeServiceProvider } from "../theme/themeService";
import "./screenshot-harness.css";

function ScreenshotShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <ThemeServiceProvider>
      <div className={`screenshot-root ${className}`} data-screenshot-ready="true">
        {children}
      </div>
    </ThemeServiceProvider>
  );
}

function ScreenshotSplash() {
  return (
    <ScreenshotShell className="screenshot-splash">
      <AppSplash />
    </ScreenshotShell>
  );
}

export function ScreenshotHarness() {
  const view = new URLSearchParams(window.location.search).get("screenshot") ?? "startup";
  switch (view) {
    case "splash":
      return <ScreenshotSplash />;
    default:
      return <ScreenshotSplash />;
  }
}

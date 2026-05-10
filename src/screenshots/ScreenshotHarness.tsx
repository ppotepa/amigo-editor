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

function ScreenshotStartup() {
  return (
    <ScreenshotShell className="startup-shell window-shell launcher-window-shell screenshot-startup">
      <header className="startup-header window-titlebar">
        <div className="brand window-brand">
          <div className="brand-mark">A</div>
          <div>
            <strong>Amigo Editor</strong>
            <span>Interactive mod launcher powered by mod.toml discovery.</span>
          </div>
        </div>
        <div className="header-actions window-titlebar-actions">
          <button className="button button-ghost" type="button">Theme</button>
          <button className="button button-ghost" type="button">Settings</button>
        </div>
      </header>

      <section className="startup-main-grid">
        <aside className="screenshot-panel screenshot-mods">
          <div className="screenshot-panel-header">
            <span>Projects</span>
            <button className="button button-primary" type="button">New Project</button>
          </div>
          {["Ink Frontier", "Core Runtime", "Pixel Lab"].map((name, index) => (
            <button className={`screenshot-mod-row ${index === 0 ? "selected" : ""}`} key={name} type="button">
              <strong>{name}</strong>
              <span>{index === 0 ? "4 scenes, 126 assets" : index === 1 ? "Runtime package" : "Experimental tools"}</span>
            </button>
          ))}
          <div className="screenshot-footer">
            <span>Last scan</span>
            <strong>2 seconds ago</strong>
          </div>
        </aside>

        <main className="screenshot-panel screenshot-preview">
          <section className="screenshot-hero-preview">
            <img src="/splash-desert-night.png" alt="" />
            <div>
              <span>Selected scene</span>
              <strong>Desert Gate</strong>
              <small>2D scene, 41 render nodes, 18 scripted triggers</small>
            </div>
          </section>
          <div className="screenshot-scene-strip">
            {["Desert Gate", "Market Night", "Observatory"].map((scene, index) => (
              <div className={index === 0 ? "selected" : ""} key={scene}>
                <strong>{scene}</strong>
                <span>{index === 0 ? "Ready" : index === 1 ? "Cached" : "Draft"}</span>
              </div>
            ))}
          </div>
        </main>

        <aside className="screenshot-panel screenshot-inspector">
          <h2>Ink Frontier</h2>
          <div className="screenshot-summary-grid">
            {[
              ["Scenes", "4"],
              ["Assets", "126"],
              ["Scripts", "18"],
              ["Warnings", "2"],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="screenshot-diagnostics">
            <strong>Diagnostics</strong>
            <p><span className="warning" />2 assets use fallback lighting metadata.</p>
            <p><span className="info" />Scene graph compiled with 41 render nodes.</p>
            <p><span className="success" />No blocking validation errors.</p>
          </div>
        </aside>
      </section>
    </ScreenshotShell>
  );
}

function ScreenshotWorkspace() {
  return (
    <ScreenshotShell className="main-window-shell screenshot-workspace">
      <header className="main-window-titlebar">
        <div className="window-brand">
          <div className="brand-mark">A</div>
          <div>
            <strong>Ink Frontier / Desert Gate</strong>
            <span>Workspace ready</span>
          </div>
        </div>
        <div className="window-titlebar-actions">
          <button className="button button-ghost" type="button">Theme</button>
          <button className="button button-primary" type="button">Save</button>
        </div>
      </header>

      <div className="screenshot-workspace-grid">
        <aside className="workspace-dock workspace-dock-left">
          <div className="dock-tabs">
            <span className="active">Project</span>
            <span>Scenes</span>
            <span>Files</span>
          </div>
          <div className="screenshot-tree">
            <strong>Ink Frontier</strong>
            <span>scenes/desert_gate.scene.yml</span>
            <span>scenes/hud.ui.yml</span>
            <span>spritesheets/hero.sprite.yml</span>
            <span>scripts/packages/encounters/package.yml</span>
          </div>
        </aside>

        <main className="screenshot-workspace-center">
          <div className="scene-editor-toolbar">
            {["Select", "Move", "Rotate", "Scale", "Grid", "Snap"].map((tool, index) => (
              <button className={index === 0 ? "selected" : ""} key={tool} type="button">{tool}</button>
            ))}
          </div>
          <section className="scene-editor-shell">
            <div className="scene-editor-tool-dock">
              {["S", "M", "R", "T"].map((tool, index) => (
                <button className={index === 0 ? "selected" : ""} key={tool} type="button">{tool}</button>
              ))}
            </div>
            <div className="scene-editor-view-dock">
              <button type="button">-</button>
              <strong>100%</strong>
              <button type="button">+</button>
            </div>
            <div className="scene-editor-canvas">
              <div className="scene-editor-grid" />
              <div className="scene-editor-artboard">
                <img src="/splash-desert-night.png" alt="" />
                <div className="screenshot-selection-box" />
              </div>
            </div>
          </section>
          <footer className="scene-editor-status-bar">
            <span>2D</span>
            <span>1920 x 1080</span>
            <span>x 428 / y 216</span>
            <span>Preview synced</span>
            <span>2 diagnostics</span>
          </footer>
        </main>

        <aside className="workspace-dock workspace-dock-right">
          <section className="screenshot-widget">
            <h3>Target</h3>
            <p>Selected entity: Gate Sentinel</p>
            <p>Transform: x 428, y 216, scale 1.0</p>
          </section>
          <section className="screenshot-widget">
            <h3>Assets</h3>
            <p>hero.sprite.yml</p>
            <p>desert_tiles.tileset.yml</p>
            <p>gate_light.layered-image.yml</p>
          </section>
          <section className="screenshot-widget">
            <h3>Problems</h3>
            <p>Warning: fallback lightmap bounds</p>
            <p>Info: one unused atlas frame</p>
          </section>
        </aside>
      </div>

      <footer className="main-window-statusbar">
        <span>1 unsaved change</span>
        <span>12 events</span>
        <span>Theme: Graphite</span>
      </footer>
    </ScreenshotShell>
  );
}

export function ScreenshotHarness() {
  const view = new URLSearchParams(window.location.search).get("screenshot") ?? "startup";
  switch (view) {
    case "splash":
      return <ScreenshotSplash />;
    case "workspace":
      return <ScreenshotWorkspace />;
    case "startup":
    default:
      return <ScreenshotStartup />;
  }
}

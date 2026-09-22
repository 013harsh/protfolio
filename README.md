# Harsh's Portfolio — Desktop OS Experience 🖥️

An interactive personal portfolio built to look and feel like a desktop operating system. Instead of scrolling through static sections, visitors explore "apps" — About Me, Experience, Projects, Skills, Photos, Videos, a Terminal, a Files explorer, a Browser, and more — just like navigating a real desktop environment.

**Live Demo:** [Add your deployed link here]

---

## ✨ Features

- 🖱️ **Desktop-style UI** — draggable/openable app windows with icons on a virtual desktop
- 🧭 **Custom Navbar** — Activities button, Activities overview, system clock, and a system menu (like GNOME/macOS-style top bars)
- 📂 **Files App** — browse portfolio content like a file explorer
- 🌐 **Browser App** — an in-portfolio simulated browser
- 💻 **Terminal App** — a playful terminal-style interface
- ⚙️ **Settings App** — customize/explore preferences within the experience
- 🗺️ **Maps & Camera Apps** — extra desktop-style utility apps
- 📄 **Detail Pages** — dedicated windows for About Me, Experience, Projects, Skills, CV, Photos, and Videos
- 📱 **Responsive** — adapts to different screen sizes via a custom `useScreenSize` hook
- 🎨 **Styled with Tailwind CSS**
- ⚡ **Built with Vite** for fast development and builds

---

## 🛠️ Tech Stack

- **Frontend:** React (JSX)
- **Styling:** Tailwind CSS, PostCSS
- **Build Tool:** Vite
- **Linting:** ESLint
- **Routing:** React Router (`routes/routes.jsx`)
- **State Management:** React Context (`MediaContext`, `WindowContext`)
- **Deployment:** Vercel

---

## 📁 Project Structure

```
frontend/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── vercel.json
└── src/
    ├── App.jsx                # Root app component
    ├── main.jsx                # Entry point
    ├── index.css                # Global styles
    ├── component/
    │   ├── DesktopIcon.jsx      # Desktop icon component
    │   ├── navbar.jsx           # Top navigation bar
    │   ├── apps/                # Desktop "applications"
    │   │   ├── BrowserApp.jsx
    │   │   ├── CameraApp.jsx
    │   │   ├── DetailWindow.jsx
    │   │   ├── FilesApp.jsx
    │   │   ├── GenericApp.jsx
    │   │   ├── MapsApp.jsx
    │   │   ├── SettingsApp.jsx
    │   │   └── TerminalApp.jsx
    │   └── navbar/               # Navbar sub-components
    │       ├── ActivitiesButton.jsx
    │       ├── ActivitiesOverview.jsx
    │       ├── Clock.jsx
    │       └── SystemMenu.jsx
    ├── context/
    │   ├── MediaContext.jsx      # Media state (photos/videos)
    │   └── WindowContext.jsx     # Window management state
    ├── hooks/
    │   └── useScreenSize.js      # Responsive screen size hook
    ├── pages/
    │   ├── Landingpg.jsx         # Landing/desktop page
    │   └── Details/              # Detail windows/pages
    │       ├── AboutMe.jsx
    │       ├── Experience.jsx
    │       ├── MyCV.jsx
    │       ├── PhotosApp.jsx
    │       ├── Projects.jsx
    │       ├── Skills.jsx
    │       └── VideosApp.jsx
    └── routes/
        └── routes.jsx            # App routing
```
## Git Diagram 
<img width="5314" height="6020" alt="diagram (4)" src="https://github.com/user-attachments/assets/b7ed5091-42d2-450a-938a-301aa02cb76e" />

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd 013harsh-protfolio/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🧩 Key Components

| Component | Purpose |
|---|---|
| `WindowContext.jsx` | Manages open/close/focus state of desktop app windows |
| `MediaContext.jsx` | Provides photo/video media data across the app |
| `DesktopIcon.jsx` | Renders clickable icons that launch apps |
| `useScreenSize.js` | Custom hook for responsive behavior |
| `DetailWindow.jsx` | Generic wrapper for detail pages (About, Experience, etc.) |

---

## 📦 Deployment

This project is configured for deployment on **Vercel** via `vercel.json`. Push to your connected repository or run:

```bash
vercel --prod
```

---

## 📌 Roadmap / Ideas

- [ ] Add drag-and-drop window repositioning
- [ ] Add window minimize/maximize animations
- [ ] Dark/light theme toggle via Settings App
- [ ] Sound effects for interactions

---

## 🙋 About Me

Built by **Harsh** — a B.Tech Computer Science student and Full Stack (MERN) Developer, passionate about building creative, interactive web experiences.

---

## 📄 License

This project is open source. Feel free to fork and customize it for your own portfolio — attribution appreciated!



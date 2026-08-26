import Navbar from "./component/navbar";
import Routes from "./routes/routes";
import { WindowProvider } from "./context/WindowContext";
import { MediaProvider } from "./context/MediaContext";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  return (
    <WindowProvider>
      <MediaProvider>
        <div className="relative h-screen overflow-hidden">
          <Navbar />
          <Routes />
          <Analytics />
        </div>
      </MediaProvider>
    </WindowProvider>
  );
};

export default App;

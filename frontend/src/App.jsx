import Navbar from "./component/navbar";
import Routes from "./routes/routes";
import { WindowProvider } from "./context/WindowContext";
import { MediaProvider } from "./context/MediaContext";

const App = () => {
  return (
    <WindowProvider>
      <MediaProvider>
        <div className="relative h-screen overflow-hidden">
          <Navbar />
          <Routes />
        </div>
      </MediaProvider>
    </WindowProvider>
  );
};

export default App;

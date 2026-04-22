import Navbar from "./component/navbar";
import Routes from "./routes/routes";
import { WindowProvider } from "./context/WindowContext";
import { MediaProvider } from "./context/MediaContext";

const App = () => {
  return (
    <WindowProvider>
      <MediaProvider>
        <div className="relative h-screen overflow-hidden">
          <h1 style={{ color: "red" }}>TEST CHANGE</h1>
          <Navbar />
          <Routes />
        </div>
      </MediaProvider>
    </WindowProvider>
  );
};

export default App;

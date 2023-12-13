import { Provider } from "react-redux";
import "./App.css";
import Body from "./components/Body";
import store from "./utils/store";
import VideoContainer from "./components/VideoContainer";
import WatchPage from "./components/WatchPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChannelPage from "./components/channelComponents/ChannelPage";
import ResultsPage from "./components/ResultComponents/ResultsPage";
import PlayList from "./components/playList/PlayList";
import WatchPlaylist from "./components/WatchPlaylist";

function App() {
  const appRouter = new createBrowserRouter([
    {
      path: "/",
      element: <Body></Body>,
      children: [
        {
          path: "/",
          element: <VideoContainer></VideoContainer>,
        },
        {
          path: "/watch",
          element: <WatchPage></WatchPage>,
        },
        {
          path: "/channel",
          element: <ChannelPage></ChannelPage>,
        },
        {
          path: "/results",
          element: <ResultsPage></ResultsPage>,
        },
        {
          path: "/playlist",
          element: <PlayList></PlayList>,
        },
        {
          path: "/videoPlaylist",
          element: <WatchPlaylist></WatchPlaylist>,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={appRouter}></RouterProvider>
    </Provider>
  );
}

export default App;

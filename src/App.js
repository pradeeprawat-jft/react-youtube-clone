import { Provider } from "react-redux";
import "./App.css";
import Body from "./components/Body";
import Head from "./components/Head";
import store from "./utils/store";
import VideoContainer from "./components/VideoContainer";
import WatchPage from "./components/WatchPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChannelPage from "./components/channelComponents/ChannelPage";

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
          path: "watch",
          element: <WatchPage></WatchPage>,
        },
        {
          path: "/chennel",
          element: <ChannelPage></ChannelPage>,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <Head></Head>
      <RouterProvider router={appRouter}></RouterProvider>
    </Provider>
  );
}

export default App;

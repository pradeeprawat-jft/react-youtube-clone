import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    videoList: [],
  },
  reducers: {
    addVideo: (state, action) => {
      state.videoList.push(action.payload);
    },

    updateVideo: (state, action) => {
      const { id, updatedVideo } = action.payload;
      const videoIndex = state.videoList.findIndex((video) => video.id === id);
      if (videoIndex !== -1) {
        state.videoList[videoIndex] = {
          ...state.videoList[videoIndex],
          ...updatedVideo,
        };
      }
    },
    deleteVideo: (state, action) => {
      const videoId = action.payload;
      state.videoList = state.videoList.filter((video) => video !== videoId);
    },

    findVideo: (state, action) => {
      return state.videoList.includes(action.payload);
    },
  },
});

export default videoSlice.reducer;
export const { addVideo, updateVideo, deleteVideo, findVideo } =
  videoSlice.actions;

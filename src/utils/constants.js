export const YOUTUBE_API_KEY = "AIzaSyDNSTBRQnX8Etbxld0heZU-Bw0fkVx-luA";

export const YOUTUBE_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" +
  YOUTUBE_API_KEY;

export const YOUTUBE_API_FOR_SPECIFIC_VIDEO =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=" +
  YOUTUBE_API_KEY;

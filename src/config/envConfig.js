export const imgUrl = "http://10.10.20.22:5000/";

export const url = `${imgUrl}api/`;

// //  WebSocket base URL (auto picks wss:// if https page, ws:// otherwise)
// const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
// export const wsUrl = `${wsProtocol}://${new URL(imgUrl).host}`;

// // Function to get the base API URL
export const getBaseUrl = () => url;

// // Function to get the image base URL
// export const getImageBaseUrl = () => imgUrl;

// // Function to get the WebSocket base URL
// export const getWsBaseUrl = () => wsUrl;

// // asdf 

// export const getImageUrl = (imagePath) => {
//   if (!imagePath) return "";

//   // If it's already a full URL, return as-is
//   if (imagePath.startsWith("http")) {
//     return imagePath;
//   }

//   // Remove trailing slash from base and leading slash from path
//   const base = imgUrl.replace(/\/+$/, "");
//   const path = imagePath.replace(/^\/+/, "");

//   const finalUrl = `${base}/${path}`;
//   // console.log("Image URL:", finalUrl);

//   return finalUrl;
// };

export const __prod__ = process.env.NODE_ENV === "production";
export const __apiUrl__ = __prod__
  ? "/api/"
  : (process.env.REACT_APP_API_URL as string);
export const __socketPath__ = __prod__
  ? "/ws"
  : (process.env.REACT_APP_SOCKET_PATH as string);

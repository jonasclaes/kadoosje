import dotenv from "dotenv";

dotenv.config();

export default {
  API_ENDPOINT:
    process.env.API_ENDPOINT ||
    process.env.VUE_APP_API_ENDPOINT ||
    "http://localhost:3000",
  FUNCTIONS_ENDPOINT:
    process.env.FUNCTIONS_ENDPOINT ||
    process.env.VUE_APP_FUNCTIONS_ENDPOINT ||
    "http://localhost:8081/http://localhost:9999",
};

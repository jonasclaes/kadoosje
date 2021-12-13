import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

export const handler: Handler = async (event, context) => {
  const { url = null } = event.queryStringParameters;

  try {
    const response = await fetch(url);
    const data = await response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({
        data,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed fetching data",
        message: error,
      }),
    };
  }
};

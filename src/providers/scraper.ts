import $ from "jquery";
import config from "./config";

export type ScraperResponse = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  currency?: string;
  price?: number;
};

export class Scraper {
  static async scrape(url: string): Promise<ScraperResponse> {
    const response = await fetch(
      `${config.FUNCTIONS_ENDPOINT}/.netlify/functions/get-webpage?url=${url}`
    );
    const data = await response.json();
    const parser = new DOMParser().parseFromString(data.data, "text/html");

    const scraperResponse: ScraperResponse = {};

    for (const meta of parser.getElementsByTagName("meta")) {
      let propertyName = meta.getAttribute("property");
      if (!propertyName) propertyName = meta.getAttribute("name");
      if (!propertyName) propertyName = meta.getAttribute("itemprop");

      if (propertyName) {
        console.debug(propertyName, meta.getAttribute("content"));

        switch (propertyName) {
          case "og:title":
            scraperResponse.title = meta.getAttribute("content") as string;
            break;

          case "og:description":
            scraperResponse.description = meta.getAttribute(
              "content"
            ) as string;
            break;

          case "description":
            if (!scraperResponse.description) {
              scraperResponse.description = meta.getAttribute(
                "content"
              ) as string;
            }
            break;

          case "og:image":
            scraperResponse.image = meta.getAttribute("content") as string;
            break;

          case "og:url":
            scraperResponse.url = meta.getAttribute("content") as string;
            break;

          case "canonical":
            if (!scraperResponse.url) {
              scraperResponse.url = meta.getAttribute("href") as string;
            }
            break;

          case "url":
            if (!scraperResponse.url) {
              scraperResponse.url = meta.getAttribute("content") as string;
            }
            break;

          case "priceCurrency":
            scraperResponse.currency = meta.getAttribute("content") as string;
            break;

          case "price":
            scraperResponse.price = parseFloat(
              meta.getAttribute("content") as string
            );
            break;
        }
      }
    }

    // Get product title from the webpage title.
    if (!scraperResponse.title) {
      const titles = parser.getElementsByTagName("title");
      if (titles.length > 0) scraperResponse.title = titles[0].innerText;
    }

    // Get product image from the image elements on the page.
    if (!scraperResponse.image) {
      let src = $(data.data)
        .find(`img[alt^='${scraperResponse.title}']`)
        .attr("src");

      // If a full match hasn't been found, go through some loopy searches
      if (!src) {
        const productNameArray = scraperResponse.title?.split(" ") || [];
        let goodProductName = "";
        const tempProductNameArray = [];

        // Assemble the product name, piece by piece
        // until it doesn't match anymore.
        for (const block of productNameArray) {
          tempProductNameArray.push(block);

          src = $(data.data)
            .find(`img[alt^='${tempProductNameArray.join(" ")}']`)
            .attr("src");

          if (src) goodProductName = tempProductNameArray.join(" ");
        }

        src = $(data.data).find(`img[alt^='${goodProductName}']`).attr("src");
      }

      // Set the image to the src
      if (src) scraperResponse.image = src;
    }

    if (!scraperResponse.url) scraperResponse.url = url;

    console.debug(scraperResponse);

    return scraperResponse;
  }
}

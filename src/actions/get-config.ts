"use server";

export default async function getConfig(country: string) {
  const url = "https://sky-scrapper.p.rapidapi.com/api/v1/getConfig";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
      "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result: Config = await response.json();
    return result.data.find((item) => item.country === country);
  } catch (error) {
    console.error(error);
  }
}

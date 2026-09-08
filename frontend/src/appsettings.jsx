const environment = "development";

const development = {
    BASE_URL: "https://localhost:7117"
};

const production = {
    BASE_URL: "https://your-production-api-url.com"
};

const config =
    environment === "development"
        ? development
        : production;

export default config;
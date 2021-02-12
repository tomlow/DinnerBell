import config from "../../config.js";

const addDevelopmentMiddlewares = async (app) => {
  if (config.env === "development") {
    const { default: errorHandler } = await import("../errorHandler.js");
    app.use(errorHandler());
  }
};

export default addDevelopmentMiddlewares;

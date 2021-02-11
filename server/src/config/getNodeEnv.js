const getNodeEnv = () => {
  console.log(process.env)
  return process.env.NODE_ENV || "development";
};

export default getNodeEnv;

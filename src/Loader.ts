import { Params, defer } from "react-router-dom";

const Loader = (params: Params<string>) => {
  const fetcher = async () => {
    const { id, page = "" } = params;
    const data = await fetch(`https://swapi.dev/api/${id}/?page=${page}`);
    const body = await data.json();
    return body;
  };

  return defer({ subject: fetcher() });
};

export default Loader;

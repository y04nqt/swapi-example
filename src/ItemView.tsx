import { Button, Input, Typography } from "@mui/material";
import React, { useState } from "react";
import { Await, Link, useLoaderData, useLocation } from "react-router-dom";

interface IItem {
  url: string;
  name?: string;
  title?: string;
  created?: string;
  edited?: string;
}

const filterResults = (result: IItem, search: string) =>
  result?.name?.toLowerCase().includes(search.toLowerCase().trim()) ||
  result?.url?.toLowerCase().includes(search.toLowerCase().trim());
const extractPageNumber = (str: string): string =>
  str.split("page=").pop() || "";

const ItemView = () => {
  //@ts-ignore
  const { subject } = useLoaderData();

  const [search, setSearch] = useState("");
  const [prevLinkData, setPrevLinkData] = useState(null);
  const [nextLinkData, setNextLinkData] = useState(null);
  const loc = useLocation();
  const pathSubject = loc.pathname.split("/")[1];
  const pageNum = loc.pathname.split("/")[2];

  const prevLink = (previous: string | null ) =>
    previous !== null
      ? `/${pathSubject}/${extractPageNumber(previous)}`
      : `/${pathSubject}/`;

  const nextLink = ( next: string | null ) =>
    next !== null
      ? `/${pathSubject}/${extractPageNumber(next)}`
      : `/${pathSubject}/`;

  return (
    <div className="mt-[calc(108.5px+1rem)]">
      <div className="fixed px-8 sm:px-0 w-full justify-center top-[76.5px] flex bg-white">
        <Input
          className="w-full sm:w-1/2"
          placeholder="Search the page"
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setSearch(e.target.value)
          }
        />
      </div>
      <React.Suspense
        fallback={<p className="text-center animate-pulse">Loading post...</p>}
      >
        <Await
          resolve={subject}
          errorElement={
            <p className="text-center text-red-500">
              <Link to="/">Error! Turn back now! Click Here</Link>
            </p>
          }
        >
          {(data) => {
            const filteredResults = data?.results?.filter((item: IItem) =>
              filterResults(item, search)
            );
            
            setPrevLinkData(data.previous)
            setNextLinkData(data.next)
            
            return (
              <div>
                <ul className="w-full p-8 pb-[calc(68.5px+1rem)] mx-auto sm:w-1/2">
                  {filteredResults.length > 0 &&
                    filteredResults.map((item: IItem, idx: number) => (
                      <li
                        className={`flex flex-col p-4 border-l-0 border-r-0 ${
                          idx % 2 === 1 ? "bg-gray-100" : "bg-white"
                        }`}
                        key={item?.url}
                      >
                        <Typography variant="h4">
                          <a
                            className="inline-flex"
                            href={item?.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {item?.name ?? item?.title ?? 'N/A'}
                          </a>
                        </Typography>
                        <Typography variant="subtitle1">
                          <span className="font-thin">Created:</span> <br />{" "}
                          {item?.created}
                        </Typography>
                        <Typography variant="subtitle1">
                          <span className="font-thin">Edited:</span> <br />{" "}
                          {item?.edited}
                        </Typography>
                      </li>
                    ))}
                  {filteredResults.length === 0 && (
                    <li className="text-center">
                      <p>No results found.</p>
                    </li>
                  )}
                </ul>
              </div>
            );
          }}
        </Await>
      </React.Suspense>
      <div className="fixed bottom-0 flex justify-center w-full gap-8 py-4 bg-white border-t-[1px]">
        <Link
          to={prevLink(prevLinkData)}
          className={
            prevLinkData === null
              ? "pointer-events-none opacity-50"
              : ""
          }
        >
          <Button>Prev</Button>
        </Link>
        <span className="flex self-center">{pageNum || "1"}</span>
        <Link
          className={
            nextLinkData === null ? "pointer-events-none opacity-50" : ""
          }
          to={nextLink(nextLinkData)}
        >
          <Button>Next</Button>
        </Link>
      </div>
    </div>
  );
};

export default ItemView;

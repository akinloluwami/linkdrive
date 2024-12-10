import React, { useEffect, useRef } from "react";
import Input from "./ui/input";
import { bookmarks, collections } from "@/mock";
import { FolderWithFiles, LinkMinimalistic2 } from "solar-icon-set";
import { Link } from "@tanstack/react-router";

const GlobalSearch = () => {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<
    { name: string; type: "bookmark" | "collection"; data: any }[]
  >([]);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = (query: string) => {
    if (!query) {
      setResults([]);
      setIsDropdownOpen(false);
      return;
    }

    const normalizedBookmarks = bookmarks
      .filter((bookmark) =>
        bookmark.title.toLowerCase().includes(query.toLowerCase())
      )
      .map((bookmark) => ({
        name: bookmark.title,
        type: "bookmark",
        data: bookmark,
      }));

    const normalizedCollections = collections
      .filter((collection) =>
        collection.name.toLowerCase().includes(query.toLowerCase())
      )
      .map((collection) => ({
        name: collection.name,
        type: "collection",
        data: collection,
      }));

    //@ts-ignore
    setResults([...normalizedBookmarks, ...normalizedCollections]);
    setIsDropdownOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleResultClick = () => {
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative lg:w-[600px] w-full" ref={searchRef}>
      <Input
        className="w-full placeholder:text-gray-400"
        placeholder="Search bookmarks and collections..."
        value={query}
        onChange={handleInputChange}
      />
      {isDropdownOpen && results.length > 0 && (
        <div className="absolute w-full bg-white rounded-2xl shadow-lg h-fit overflow-y-auto p-4 z-10">
          <div>
            {results.map((result, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-100 rounded-2xl cursor-pointer"
                onClick={handleResultClick}
              >
                {result.type === "collection" ? (
                  <Link
                    to="/collections/$collectionId"
                    params={{ collectionId: result.data.id }}
                    className="flex items-center gap-x-2"
                  >
                    <FolderWithFiles />
                    <span className="font-medium truncate">{result.name}</span>
                  </Link>
                ) : (
                  <a
                    href={result.data.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-x-2"
                  >
                    <LinkMinimalistic2 />
                    <span className="font-medium truncate">{result.name}</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;

import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function formatDate(dateString) {

    const date = new Date(dateString);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month} ${day}, ${year}`;
}

const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get(`/api/v1/search/history`);

        // Deduplicate by ID using Map (keeps most recent duplicate)
        const uniqueHistory = [
          ...new Map(res.data.history.map((item) => [item.id, item])).values(),
        ];

        setSearchHistory(uniqueHistory);
      } catch (error) {
        setSearchHistory([]);
      }
    };

    getSearchHistory();
  }, []);

  console.log(searchHistory);
  const handleDelete = async (entry) => {
    try {
      await axios.delete(`/api/v1/search/history/${entry.id}`);
      setSearchHistory(searchHistory.filter((item) => item.id !== entry.id));
    } catch (error) {
      toast.error("Failed to delete search item");
    }
  };

  if (searchHistory?.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No search history found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4">
          {searchHistory?.map((entry) => {
            const linkPath =
              entry.searchType === "person" ? null : `/watch/${entry.id}`;

            const CardContent = (
              <div className="flex items-center bg-[#141414] hover:bg-[#1f1f1f] transition-all duration-300 rounded-lg p-4 shadow-md hover:shadow-lg hover:shadow-red-900/20 group transform hover:scale-[1.02]">
                <div className="relative w-16 h-16 mr-4 flex-shrink-0 overflow-hidden rounded-md">
                  <img
                    src={
                      entry.image
                        ? SMALL_IMG_BASE_URL + entry.image
                        : "/netflix-logo.png"
                    }
                    alt={entry.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300 ease-out"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <span className="text-white font-semibold text-lg tracking-tight">
                    {entry.title}
                  </span>
                  <span className="text-gray-400 text-xs mt-1">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>

                <span
                  className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${
                    entry.searchType === "Movie"
                      ? "bg-red-600 text-white"
                      : entry.searchType === "TV"
                      ? "bg-blue-600 text-white"
                      : "bg-green-600 text-white"
                  }`}
                >
                  {entry.searchType[0].toUpperCase() +
                    entry.searchType.slice(1)}
                </span>

                {/* Delete icon */}
                <button
                  className="ml-4 text-gray-400 hover:text-red-500 transition"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(entry);
                  }}
                >
                  <Trash className="w-5 h-5 cursor-pointer" />
                </button>
              </div>
            );

            return linkPath ? (
              <Link to={linkPath} key={entry.id} className="block">
                {CardContent}
              </Link>
            ) : (
              <div key={entry.id}>{CardContent}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default SearchHistoryPage;

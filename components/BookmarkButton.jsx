"use client";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";
import SmallSpinner from "./SmallSpinner";

const BookmarkButton = ({ property }) => {
  const [isBookmarked, setIsBookmarked] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      if (!userId) {
        setLoading(false);
        setIsBookmarked(false);
        return;
      }

      try {
        const res = await checkBookmarkStatus(property._id);
        setIsBookmarked(res.isBookMarked);
      } catch (error) {
        toast.error(error.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkStatus();
  }, [property._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to sign in to bookmark a property");
      return;
    }

    try {
      const res = await bookmarkProperty(property._id);
      setIsBookmarked(res.isBookMarked);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  if (loading || isBookmarked === null) return <SmallSpinner />;

  return isBookmarked ? (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" />
      Removed Bookmark
    </button>
  ) : (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" />
      Bookmark Property
    </button>
  );
};

export default BookmarkButton;

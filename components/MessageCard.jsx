"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import markMessageAsRead from "@/app/actions/markMessageAsRead";
import deleteMessage from "@/app/actions/deleteMessage";
import { useGlobalContext } from "@/context/GlobalContext";

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    const read = await markMessageAsRead(message._id);
    setIsRead(read);
    setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
    toast.success(`Marked as ${read ? "read" : "new"}`);
  };

  const handleDeleteClick = async () => {
    await deleteMessage(message._id);
    setIsDeleted(true);
    setUnreadCount((prevCount) => (isRead ? prevCount : prevCount - 1));
    toast.success("Message Deleted");
  };

  if (isDeleted) {
    return <p className="text-green-500">Deleted Message</p>;
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-teal-500 text-white px-2 py-1 rounded-md text-sm">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <strong>Property Inquiry: </strong>
        {message.property.name}
      </h2>
      <p className="text-gray-600">{message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className="mt-4 mr-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
      >
        {isRead ? "Mark As New" : "Mark As Read"}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;

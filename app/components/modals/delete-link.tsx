import React from "react";
import { useMutation } from "@tanstack/react-query";
import Input from "../ui/input";
import Button from "../ui/button";
import axios from "axios";

const DeleteLink: React.FC<{
  currentUrl: string;
  id: string;
  onDeleteSuccess: () => void;
}> = ({ currentUrl, id, onDeleteSuccess }) => {
  const deleteLink = async () => {
    await axios.delete(`/api/bookmarks/${id}`);
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: deleteLink,
    onSuccess: () => {
      onDeleteSuccess();
    },
    onError: (error) => {
      console.error("Delete failed:", error);
    },
  });

  return (
    <div className="space-y-4">
      <div>
        <Input
          placeholder="https://"
          defaultValue={currentUrl}
          readOnly
          errorMessage={error?.message}
          disabled
        />
      </div>
      <Button
        className="bg-red-600 hover:bg-red-500 transition-colors disabled:bg-gray-400"
        onClick={() => mutate()}
        disabled={isPending}
        loading={isPending}
      >
        Delete link
      </Button>
    </div>
  );
};

export default DeleteLink;

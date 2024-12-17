import React from "react";
import axios from "axios";
import Input from "../ui/input";
import Button from "../ui/button";
import { useAxiosMutation } from "@/hooks/useAxiosMutation";

const EditLink: React.FC<{
  currentUrl: string;
  id: string;
  onEditSuccess: () => void;
}> = ({ currentUrl, id, onEditSuccess }) => {
  const [url, setUrl] = React.useState(currentUrl);
  const updateLink = async () => {
    await axios.put(`/api/bookmarks/${id}`, { url });
  };

  const { mutate, isPending, error } = useAxiosMutation({
    mutationFn: updateLink,
    onSuccess: () => onEditSuccess(),
  });

  return (
    <div className="space-y-4">
      <div>
        <Input
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          errorMessage={error?.response?.data.error || error?.message}
        />
      </div>
      <Button
        onClick={mutate}
        disabled={!url || url === currentUrl || isPending}
        loading={isPending}
      >
        Update link
      </Button>
    </div>
  );
};

export default EditLink;

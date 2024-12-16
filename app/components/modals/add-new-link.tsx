import React from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import axios from "axios";
import useGlobalModalStore from "@/stores/globalModalStore";

const AddNewLink = () => {
  const [url, setUrl] = React.useState("");
  const [errors, setErrors] = React.useState<{ url: string }>({ url: "" });
  const [loading, setLoading] = React.useState(false);
  const { setActiveModal } = useGlobalModalStore();

  const handleAddLink = async () => {
    setErrors({ url: "" });
    setLoading(true);
    try {
      await axios.post("/api/bookmarks", { url });
      setActiveModal(null);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="">
        <p className="font-semibold text-accent">Enter URL</p>
        <Input
          placeholder="https://"
          onChange={(e) => setUrl(e.target.value)}
          errorMessage={errors.url}
        />
      </div>
      <Button onClick={handleAddLink} loading={loading}>
        Add bookmark
      </Button>
    </div>
  );
};

export default AddNewLink;

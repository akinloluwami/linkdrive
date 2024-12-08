import React from "react";
import Button from "../ui/Button";
import Input from "../ui/input";

const AddNewLink = () => {
  const [url, setUrl] = React.useState("");
  const [errors, setErrors] = React.useState<{ url: string }>({ url: "" });
  const [loading, setLoading] = React.useState(false);

  const handleAddLink = () => {
    setErrors({ url: "" });
    setLoading(true);
    setTimeout(() => {
      setErrors({ url: "Something went wrong" });
      setLoading(false);
    }, 1500);
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

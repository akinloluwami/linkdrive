import React from "react";
import Button from "../ui/Button";
import Input from "../ui/input";
import Textarea from "../ui/textarea";

const CreateCollection = () => {
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleAddLink = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="">
        <p className="font-semibold text-accent">Name</p>
        <Input onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="">
        <p className="font-semibold text-accent">Description</p>
        <Textarea />
      </div>
      <Button onClick={handleAddLink} loading={loading}>
        Create Collection
      </Button>
    </div>
  );
};

export default CreateCollection;

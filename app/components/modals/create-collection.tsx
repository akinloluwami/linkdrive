import React from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import Textarea from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";

const CreateCollection = () => {
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isPublic, setIsPublic] = React.useState(false);

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
      <div className="">
        <Checkbox
          onChange={(checked) => setIsPublic(checked)}
          label="Make collection public"
        />
        <p className="text-sm">
          Anyone with the link can view the content of this collection
        </p>
      </div>
      <Button onClick={handleAddLink} loading={loading}>
        Create Collection
      </Button>
    </div>
  );
};

export default CreateCollection;

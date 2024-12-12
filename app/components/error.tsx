const Error = ({ message }: { message: string }) => {
  return <div className="text-sm text-red-500">{message}</div>;
};

export default Error;

import { BookmarkProps } from "@/types";

const BookmarkCard: React.FC<BookmarkProps> = ({
  href,
  title,
  favicon,
  image,
  date,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="lg:h-[300px] h-[250px] w-full bg-white shadow rounded-2xl p-3 flex flex-col justify-between"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <img src={favicon} alt="Favicon" className="w-6" />
          <div>
            <p className="text-sm font-medium truncate lg:w-[250px] w-[120px]">
              {title}
            </p>
            <p className="text-xs">{new URL(href).hostname}</p>
          </div>
        </div>
      </div>
      <div className="h-[200px]">
        <img
          src={image}
          alt="Preview"
          className="rounded-2xl object-cover h-full w-full"
        />
      </div>
      <div>
        <p className="font-medium text-xs">{date}</p>
      </div>
    </a>
  );
};

export default BookmarkCard;

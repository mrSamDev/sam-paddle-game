import { Link } from "react-router";

type CreatorInfoProps = {
  title: string;
  creatorName: string;
  creatorUrl: string;
};

export const CreatorInfo = ({ title, creatorName, creatorUrl }: CreatorInfoProps) => {
  return (
    <div className="w-full md:w-auto text-center md:text-left">
      <Link to="/">
        <h1 className="text-3xl md:text-4xl font-bold text-main">{title}</h1>
      </Link>
      <p className="text-main/80 text-sm md:pl-2">
        by{" "}
        <a href={creatorUrl} target="_blank" rel="noopener noreferrer" className="hover:text-main hover:underline underline-offset-2">
          {creatorName}
        </a>
      </p>
    </div>
  );
};

type AvatarProps = {
  src: string;
  alt: string;
  size: "sm" | "md";
};

export const Avatar = ({ src, alt, size = "md" }: AvatarProps) => {
  const sizeClasses: Record<AvatarProps["size"], string> = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
  };

  return (
    <div className="relative">
      <img src={src} alt={alt} className={`${sizeClasses[size]} rounded-full border-2 border-main/20`} />
    </div>
  );
};

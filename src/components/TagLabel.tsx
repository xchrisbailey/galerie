type Props = {
  tag: string;
};

export const TagLabel = ({ tag }: Props) => {
  if (tag.length > 0) {
    return (
      <p className="px-2 py-1 m-1 text-xs bg-pink-200 rounded shadow">{tag}</p>
    );
  } else {
    return null;
  }
};

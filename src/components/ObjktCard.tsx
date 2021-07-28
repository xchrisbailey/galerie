import { Objkt } from '../pages';
import { getImageUrl } from '../utils/getImageUrl';
import { v4 as uuidv4 } from 'uuid';
import { TagLabel } from './TagLabel';
import Image from 'next/image';

type Props = {
  objkt: Objkt;
};

export const ObjktCard = (props: Props) => {
  const { objkt } = props;

  return (
    <article className="flex flex-col items-start w-full min-h-0 p-1 bg-white rounded shadow">
      <section>
        <h3 className="py-3 ml-1 text-sm text-indigo-600 uppercase">
          <a href={`https://www.hicetnunc.xyz/objkt/${objkt.token.id}`}>
            {objkt.token.title ? objkt.token.title : 'unknown'}
          </a>
        </h3>
      </section>
      <section className="px-1 w-full">
        <Image
          layout="responsive"
          width="100%"
          height="100%"
          src={getImageUrl(objkt.token.display_uri)}
          alt={objkt.token.title ? objkt.token.title : 'unknown'}
          className="rounded"
        />
      </section>
      <section className="flex flex-wrap mt-2">
        {objkt.token.token_tags.map((tag) => (
          <TagLabel key={uuidv4()} tag={tag.tag.tag} />
        ))}
      </section>
    </article>
  );
};

import React from 'react';
import { Objkt } from '../pages';
import { getImageUrl } from '../utils/getImageUrl';
import { v4 as uuidv4 } from 'uuid';
import { TagLabel } from './TagLabel';

type Props = {
  objkt: Objkt;
};

export const ObjktCard = (props: Props) => {
  const { objkt } = props;
  console.log(objkt.token.token_tags);

  return (
    <article className="flex flex-col w-full p-1 bg-gray-100 rounded">
      <section>
        <h3 className="py-3 ml-1 text-sm text-indigo-600 uppercase">
          <a href={`https://www.hicetnunc.xyz/objkt/${objkt.token.id}`}>
            {objkt.token.title ? objkt.token.title : 'unknown'}
          </a>
        </h3>
      </section>
      <section className="px-1">
        <img
          src={getImageUrl(objkt.token.display_uri)}
          className="rounded shadow"
        />
      </section>
      <section className="flex-grow">
        <p className="p-1 text-sm">{objkt.token.description}</p>
      </section>
      <section className="flex flex-wrap mt-2">
        {objkt.token.token_tags.map((tag) => (
          <TagLabel key={uuidv4()} tag={tag.tag.tag} />
        ))}
      </section>
    </article>
  );
};

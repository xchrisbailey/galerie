import Head from 'next/head';
import Image from 'next/image';
import { fetchGraphQL, galleryQuery } from '../utils/galleryFetch';
import { getImageUrl } from '../utils/getImageUrl';

type Props = {
  result: Objekt[];
};

export default function Home(props: Props) {
  console.log(props);
  return (
    <div>
      {props.result.map((g) => (
        <img src={getImageUrl(g.token.display_uri)} width={'300px'} />
      ))}
    </div>
  );
}

type Objekt = {
  token: Token;
};

type Token = {
  id: number;
  artifact_uri: string;
  description: string;
  display_uri: string;
  mime: string;
  thumbnail_uri: string;
  timestamp: string;
  title: string;
  swaps: Amount[];
  token_tags: Tag[];
};

type Tag = {
  tag: {
    tag: string;
  };
};

type Amount = {
  amount: number;
  amount_left: number;
  creator_id: string;
  price: number;
};

export async function getStaticProps() {
  const { errors, data } = await fetchGraphQL(galleryQuery, 'gallery', {
    address: 'tz1YM2CwbSi8Zr19jQkV1oShVm1arwHxvPqY'
  });
  if (errors) throw new Error(errors);
  const result = data.hic_et_nunc_token_holder;

  return {
    props: { result }
  };
}

import { ObjktCard } from '../components/ObjktCard';
import { fetchGraphQL, galleryQuery } from '../utils/galleryFetch';

type Props = {
  result: Objkt[];
};

export default function Home(props: Props) {
  return (
    <>
      <header className="p-4 mb-8 bg-indigo-300">
        <h1 className="ml-2 text-2xl font-bold tracking-widest">GALERIE</h1>
      </header>
      <main className="w-full mx-2 mb-10 md:container md:mx-auto">
        <section>
          <header className="w-full p-2 bg-pink-200 rounded shadow mb-3 flex items-center">
            <h2 className="ml-2 text-4xl font-bold tracking-wider text-black uppercase">
              HEN Gallery
            </h2>
          </header>
          <section className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-4">
            {props.result.map((objkt) => (
              <ObjktCard objkt={objkt} key={objkt.token.id} />
            ))}
          </section>
        </section>
      </main>
    </>
  );
}

export type Objkt = {
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
  creator: {
    address: string;
  };
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
  const henWallet = process.env.HEN_WALLET;

  const { errors, data } = await fetchGraphQL(galleryQuery, 'gallery', {
    address: henWallet ?? null
  });
  if (errors) throw new Error(errors);
  const result: Objkt[] = data.hic_et_nunc_token_holder.sort(
    (a: Objkt, b: Objkt) =>
      a.token.creator.address > b.token.creator.address ? 1 : -1
  );

  return {
    props: { result }
  };
}

export function getImageUrl(ipfsUrl: string): string {
  console.log(ipfsUrl);
  const matched = ipfsUrl.match(/ipfs:\/\/(.*)/);
  if (matched) {
    return `https://cloudflare-ipfs.com/ipfs/${matched[1]}`;
  }
  return '';
}

export function getImageUrl(ipfsUrl: string): string {
  const matched = ipfsUrl.match(/ipfs:\/\/(.*)/);
  if (matched) {
    return `https://cloudflare-ipfs.com/ipfs/${matched[1]}`;
  }
  return '';
}

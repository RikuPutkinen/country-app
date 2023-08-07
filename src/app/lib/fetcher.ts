const fetcher = (url: string) => fetch(url, { next: { revalidate: 86400 }}).then(res => res.json());

export default fetcher;
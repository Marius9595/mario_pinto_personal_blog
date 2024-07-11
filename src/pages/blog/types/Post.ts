export type Post = {
    title: string;
    author: string;
    tags: string[];
    image: {
        url: string;
        alt: string;
    }
    publicationDate: string;
    url: string;
}
export type Post = {
    title: string;
    tags: string[];
    image: {
        url: string;
        alt: string;
    }
    publicationDate: string;
    url: string;
}
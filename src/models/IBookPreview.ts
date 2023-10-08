export interface IBookPreview {
    id: string;
    volumeInfo: {
        title: string;
        authors: string[];
        categories: string[];
        publishedDate: string;
        description: string;
        pageCount: number;
        printType: string;
        imageLinks: {
            smallThumbnail: string;
            thumbnail: string;
        };
    };
}

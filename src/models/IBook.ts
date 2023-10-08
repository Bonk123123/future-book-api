export interface IBook {
    id: string;
    volumeInfo: {
        title: string;
        authors: string[];
        categories: string[];
        publishedDate: string;
        description: string;
        pageCount: number;
        printType: string;
        previewLink: string;
        imageLinks: {
            small: string;
            medium: string;
            large: string;
        };
    };
}

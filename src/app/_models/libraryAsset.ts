import { Photo } from './photo';

export interface LibraryAsset {
    id: number;
    title: string;
    year: number;
    status: string;
    cost: number;
    added: Date;
    copiesAvailable: number;
    description: string;
    photoUrl: string;
    photo?: Photo;
    assetTypeName: string;
    assetType: string;
    authorName: string;
    isbn?: string;
    deweyIndex?: string;
    category?: string;
    categoryId?: number;
    authorId?: number;
}

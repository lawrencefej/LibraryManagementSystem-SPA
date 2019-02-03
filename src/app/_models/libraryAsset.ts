import { Photo } from './photo';
import { Author } from './author';
import { AssetType } from './assetType';

export interface LibraryAsset {
    id: number;
    title: string;
    year: number;
    status: string;
    cost: number;
    added: Date;
    copies: number;
    description: string;
    photoUrl: string;
    photo?: Photo;
    assetTypeName: string;
    assetType: AssetType;
    author: Author;
    isbn?: string;
    deweyIndex?: string;

}

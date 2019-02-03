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
    copiesAvailable: number;
    description: string;
    photoUrl: string;
    photo?: Photo;
    assetTypeName: string;
    assetType: AssetType;
    authorName: string;
    isbn?: string;
    deweyIndex?: string;

}

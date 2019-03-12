import { LibraryAsset } from './libraryAsset';

export interface Author {
    id?: number;
    firstName?: string;
    lastName?: string;
    assets?: LibraryAsset[];
    fullName?: string;
    // name: function(): string {
    //     return this.firstName + ' ' + this.lastName;
    // }

    // test(): string {
    // }
}

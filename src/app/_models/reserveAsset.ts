export interface ReserveAsset {
    id?: number;
    title?: string;
    libraryCardId?: number;
    libraryAssetId?: number;
    reserved?: Date;
    until?: Date;
    dateCheckedOut?: Date;
    status?: string;
}

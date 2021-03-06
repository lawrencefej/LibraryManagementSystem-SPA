export interface Checkout {
    id?: number;
    title?: string;
    since?: Date;
    until?: Date;
    userId: number;
    libraryAssetId?: number;
    libraryCardId?: number;
    dateReturned?: Date;
    status?: string;
    statusId?: number | undefined;
    libraryCardNumber: number;
}

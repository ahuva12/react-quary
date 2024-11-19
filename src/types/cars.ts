export interface CarDocument {
    _id?: string;
    model: string;
    color: string; 
    price: number;
}

export interface CarDocumentForUpdate {
    _id: string;
    model?: string;
    color?: string; 
    price?: number;
}

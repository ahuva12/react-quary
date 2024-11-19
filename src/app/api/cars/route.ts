"use server";
import { connectDatabase, getAllDocuments, insertDocument } from "@/services/mongo";
import { NextResponse } from "next/server";
import { CarDocument } from "@/types/cars";

export async function GET(request: Request) {
    try {
        const client = await connectDatabase();
        const data = await getAllDocuments(client, 'cars');

        return NextResponse.json(data);

    } catch (error) {
        console.error('Error fetching documents:', error);
        return NextResponse.json(
            { message: 'Failed to fetch documents' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const body: CarDocument = await req.json(); 
        const client = await connectDatabase();
        const res = await insertDocument(client, 'cars', body);

        return NextResponse.json({ _id: res._id }, { status: 201 });
    } catch (error) {
        console.error("Error post request:", error);
        return NextResponse.json({ error: "Failed to insert document" }, { status: 500 });
    }
}

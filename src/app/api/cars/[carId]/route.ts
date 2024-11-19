import { NextResponse } from 'next/server';
import { connectDatabase, deleteDocument, updateDocument } from '@/services/mongo';
import { ObjectId } from 'mongodb';
import { CarDocument } from '@/types/cars';

export async function DELETE(req: Request, { params }: { params: Promise<{ carId: string }> }) {
    try {
        const { carId } = await params;
        if (!carId) {
            return NextResponse.json({ message: "Car ID is required" }, { status: 400 });
        }

        const client = await connectDatabase();
        const result = await deleteDocument(client, 'cars', { _id: new ObjectId(carId) });

        if (result.deletedCount === 1) {
            return NextResponse.json({ message: "Car deleted successfully" }, {status: 200});
        } else {
            return NextResponse.json({ message: "Car not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ carId: string }> }) {
    try {
        const { carId } = await params;
        const body: CarDocument = await req.json(); 

        if (!carId) {
            return NextResponse.json({ message: "Car ID is required" }, { status: 400 });
        }

        const { _id, ...updateFields } = body;

        if (Object.keys(updateFields).length === 0) {
            return NextResponse.json({ message: "No fields to update" }, { status: 400 });
        }

        const client = await connectDatabase();
        const result = await updateDocument(client, 'cars', { _id: new ObjectId(carId) }, updateFields);

        if (result.modifiedCount === 1) { 
            return NextResponse.json({ message: "Car updated successfully" }, {status: 200});
        } else {
            return NextResponse.json({ message: "Car not found or no changes made" }, { status: 404 });
        }
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

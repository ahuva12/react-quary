"use client";
import { CarDocumentForUpdate } from "@/types/cars";
import { useState } from "react";
import styles from './Car.module.css';
import FormCar from "@/components/FormCar/FormCar";

interface CarProps {
    carId: any;
    model: string;
    color: string;
    price: number;
    handleUpdate: (updatedCar:CarDocumentForUpdate) => void;
    handleDelete: (carId:string) => void;
}

const Car = ({ carId, model, color, price, handleUpdate, handleDelete }: CarProps) => {

    const [isForm, setIsForm] = useState(false);
    const [formData, setFormData] = useState({
        model,
        color,
        price,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
          const updatedCar = {
            _id: carId,
            model: (form[0] as HTMLInputElement).value,
            color: (form[1] as HTMLInputElement).value,
            price: Number((form[2] as HTMLInputElement).value),
        }
        handleUpdate(updatedCar);
        setIsForm(false);
    };

    return (
        <div className={styles.Car}>
            <div className={styles.details}>
                <p>Model: {model}</p>
                <p>Color: {color}</p>
                <p>Price: {price}</p>
            </div>
            <div className={styles.buttons}>
                <button style={{ backgroundColor: '#03af03' }} onClick={() => setIsForm((prev) => !prev)}>update</button>
                <button style={{ backgroundColor: '#f73838' }} onClick={() => handleDelete(carId)}>delete</button>
            </div>
            {isForm && 
               <FormCar 
                    handleSubmit={handleSubmit}
                    formData={{
                        model,
                        color,
                        price,
                    }}            
               />
            }
        </div>
    );
};

export default Car;

"use client";
import styles from './FormCar.module.css';

interface CarFormData {
    model: string;
    color: string;
    price: number;
}

interface FormCarProps {
    handleSubmit: (e: React.FormEvent) => void;
    formData: CarFormData;
}

const FormCar = ({ handleSubmit, formData}: FormCarProps) => {
    return (
        <form className={styles.FormCar} onSubmit={handleSubmit}>
                    <div>
                        <label>Model</label>
                        <input
                            type="text"
                            name="model"
                            placeholder={formData.model}
                            defaultValue={formData.model}
                        />
                    </div>
                    <div>
                        <label>Color</label>
                        <input
                            type="text"
                            name="color"
                            placeholder={formData.color}
                            defaultValue={formData.color}
                        />
                    </div>
                    <div>
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            placeholder={String(formData.price)}
                            defaultValue={formData.price}
                        />
                    </div>
                    <div>
                        <button type="submit">OK</button>
                    </div>
        </form>
    );

};

export default FormCar;


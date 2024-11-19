'use client';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/components/ReactQueryProvider';
import { getAllCars, postCar, deleteCar, updateCar } from '@/services/cars';
import Car from "@/components/Car/Car";
import FormCar from "@/components/FormCar/FormCar";
import styles from './styles.module.css';
import { useState } from "react";
import { CarDocument, CarDocumentForUpdate } from '@/types/cars'

export default function Home() {
  const { isPending, error, data, isLoading, isFetching }  = useQuery({ queryKey: ['cars'], queryFn: getAllCars, staleTime: 40000 });

  const [isForm, setIsForm] = useState(false);

    // Mutations
    const postMutation = useMutation({
      mutationFn: postCar,
      onMutate: async (car: CarDocument) => {
        await queryClient.cancelQueries({ queryKey: ['cars'] })
        const previousCars = queryClient.getQueryData(['cars'])
        queryClient.setQueryData(['cars'], (old: CarDocument[]) => [...old, car])
        return { previousCars }
    },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['cars'] })
      },
    });

    const deleteMutation = useMutation({
      mutationFn: deleteCar,
      onMutate: async (id: string) => {
        await queryClient.cancelQueries({ queryKey: ['cars'] })
        const previousCars = queryClient.getQueryData(['cars'])
        queryClient.setQueryData(['cars'], (old: CarDocument[]) => old.filter((car: CarDocument) => car._id !== id))
        return { previousCars }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['cars'] })
      },
    });

    const putMutation = useMutation({
      mutationFn: updateCar,
      onMutate: async (car:CarDocumentForUpdate) => {
        await queryClient.cancelQueries({ queryKey: ['cars'] })
        const previousCars = queryClient.getQueryData(['cars'])
        queryClient.setQueryData(['cars'], (old: CarDocument[]) => old.map((oldCar: CarDocument) => oldCar._id === car._id ? car : oldCar))
        return { previousCars }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['cars'] })
      },
    });

  const handleAddCar = (e: React.FormEvent) => {
      e.preventDefault();

        const form = e.target as HTMLFormElement;
        const newCar = {
            model: (form[0] as HTMLInputElement).value,
            color: (form[1] as HTMLInputElement).value,
            price: Number((form[2] as HTMLInputElement).value),
        }
        postMutation.mutate(newCar);
        setIsForm(false);
  };

  const handleDeleteCar = (carId: string) => {
    deleteMutation.mutate(carId);
  };

  const handleUpdateCar = (updatedCar: CarDocumentForUpdate) => {
    putMutation.mutate(updatedCar);
  };

  return (
    <div className={styles.mainContainer}>
        <h1 className={styles.title}>Cars</h1>

        {(isLoading || isPending) ? (
            <div className={styles.loading}>Loading cars...</div>
        ) : (
            <ul className={styles.tableCars}>
                {data.map((car:CarDocument, index:number) => (
                    <li key={index}>
                        <Car
                            carId={car._id}
                            model={car.model}
                            color={car.color}
                            price={car.price}
                            handleUpdate={handleUpdateCar}
                            handleDelete={handleDeleteCar}
                        />
                    </li>
                ))}
            </ul>
        )}

        <button className={styles.addCar} onClick={() => setIsForm(prev => !prev)}>
            Add Car
        </button>

        {isForm && 
            <FormCar 
                handleSubmit={handleAddCar}
                formData={{
                  model: "",
                  color: "",
                  price: 0
                }}            
            />
        }
    </div>
);
}

import { http } from '@/services/http';
import { CarDocument, CarDocumentForUpdate } from '@/types/cars'

//get cars
export const getAllCars = async () => {
    try {
      const response = await http.get(''); 
      if (response.status !== 200)
        throw new Error(`${response.status}: error fetching cars`);

      return response.data; 

    } catch (error: any) {
        console.error('Error:', error.message);
        throw new Error(error.message);
    }
};

// Post car
export const postCar = async (newCar: any) => {
    try {
      const response = await http.post('/', newCar);

      if (response.status !== 201)
        throw new Error(`${response.status}: error posting car`);

      return response.data;
    } catch (error: any) {
      console.error('Error posting car:', error);
      throw new Error(`'Error posting car: ${error.message}`);
    }
  };
  
//delete car
export const deleteCar = async (carId:string) => {
    try {
        const response = await http.delete(`/${carId}`);

        if (response.status !== 200)
          throw new Error(`${response.status}: fail in deleting car`);

        return response.data;

      } catch (error) {
        console.error('Error deleting car:', error);
        throw new Error(`'Error deleting car: ${error}`);
    }
}

//update car
export const updateCar = async (updateCar:CarDocumentForUpdate) => {
    try {
        const response = await http.patch(`/${updateCar._id}`, updateCar);

        if (response.status !== 200)
          throw new Error(`${response.status}: fail in deleting car`);

        
        return response.data;
      } catch (error) {
        console.error('Error updating car:', error);
        throw new Error(`'Error updating car: ${error}`);
    }
}






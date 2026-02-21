import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { assets } from "../../assets/assets";

import Title from "../../components/admin/Title";

import { useAppContext } from "../../context/AppContext";

const ManageCars = () => {
  const { currency, isAdmin, axios } = useAppContext();

  const [cars, setCars] = useState([]);

  const fetchAdminCars = async () => {
    try {
      const { data } = await axios.get("/api/admin/cars");
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    isAdmin && fetchAdminCars();
  }, [isAdmin]);

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post(`/api/admin/toggle-car`, { carId });
      if (data.success) {
        toast.success(data.message);
        fetchAdminCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteCar = async (carId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this car?",
      );
      if (!confirm) return null;

      const { data } = await axios.post(`/api/admin/delete-car`, { carId });
      if (data.success) {
        toast.success(data.message);
        fetchAdminCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Cars"
        subtitle="View and manage all cars in the inventory"
      />
      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500">
            <tr className="">
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Category</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium max-md:hidden">Status</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr className="border-t border-borderColor" key={index}>
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={car.image}
                    alt="car img"
                    className="w-12 h-12 aspect-square rounded-md object-cover"
                  />
                  <div className="max-md:hidden">
                    <p className="font-medium">
                      {car.brand} {car.model}
                    </p>
                    <p className="text-sm text-gray-500">
                      {car.seating_capacity} * {car.transmission}
                    </p>
                  </div>
                </td>
                <td className="p-3 max-md:hidden">{car.category}</td>
                <td className="p-3">
                  {currency} {car.pricePerDay} /day
                </td>
                <td className="p-3 max-md:hidden">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${car.isAvaliable ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}
                  >
                    {car.isAvaliable ? "Available" : "Unavailable"}{" "}
                  </span>
                </td>
                <td className="flex items-center p-3">
                  <img
                    onClick={() => toggleAvailability(car._id)}
                    src={
                      car.isAvaliable ? assets.eye_close_icon : assets.eye_icon
                    }
                    alt="icons"
                    className="cursor-pointer"
                  />
                  <img
                    onClick={() => deleteCar(car._id)}
                    src={assets.delete_icon}
                    alt="icons"
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCars;

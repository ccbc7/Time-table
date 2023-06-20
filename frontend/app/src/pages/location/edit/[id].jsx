import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "@/utils/firebase";
import Header from "@/components/Header";
import { useForm } from "react-hook-form";

const EditLocation = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [location, setLocation] = useState(null);
  const router = useRouter();
  const { id } = router.query; // get id from url
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchLocation = async () => {
      const response = await axios.get(`/locations/${id}`);
      setLocation(response.data);
    };
    fetchLocation();
  }, [id]);

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onSubmit = async (data) => {
    // data contains the values from the form
    const fd = new FormData();
    fd.append("location[location_name]", data.locationName); // Use the location name from the form
    if (selectedFile) {
      fd.append("location[image]", selectedFile, selectedFile.name);
    }
    fd.append("location[user_id]", auth.currentUser.uid); // Add user_id to form data
    // await axios.put(`/users/${auth.currentUser.uid}/locations/${id}`, fd);
    await axios.put(`/locations/${id}`, fd); // Use axios.put to update the location
    router.push("/LocationShow");
  };

  return (
    <>
      <Header />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="locationName"
            {...register("locationName", { required: true })}
            placeholder="Location Name"
          />
          {errors.locationName && <p>This field is required</p>}
          <input type="file" onChange={fileSelectedHandler} />
          <input type="submit" value="Update" />
        </form>
      </div>
    </>
  );
};

export default EditLocation;

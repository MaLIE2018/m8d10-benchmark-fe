import * as Yup from "yup";

export const AccommodationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  maxGuests: Yup.number().required("Required"),
  owner: Yup.string(),
});

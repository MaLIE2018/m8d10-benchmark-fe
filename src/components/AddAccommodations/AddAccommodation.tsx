import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { LoginContext } from "../LoginContext";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { AccommodationSchema } from "./AccommodationSchema";
import { uploadAccommodation } from "../../types";
import { FormComponent } from "../SignUp/styles";

function AddAccommodation() {
  const { open, setOpen } = useContext(LoginContext);
  const handleClose = () => setOpen(false);

  const getDestinations = () => {};

  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Accommodation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormComponent>
          <Formik
            initialValues={{
              name: "",
              description: "",
              maxGuests: 0,
              location: "",
            }}
            validationSchema={AccommodationSchema}
            onSubmit={(
              values: uploadAccommodation,
              { setSubmitting }: FormikHelpers<uploadAccommodation>
            ) => {
              // signUp(values);
              setSubmitting(false);
            }}
            render={(props) => {
              const { isSubmitting, errors, touched } = props;
              return (
                <Form>
                  <label htmlFor='name'>Name</label>
                  <Field id='name' name='name' placeholder='John' />
                  {errors.name && touched.name ? (
                    <span className='errors'>{errors.name}</span>
                  ) : null}
                  <label htmlFor='description'>Email</label>
                  <Field
                    id='description'
                    name='description'
                    placeholder='Description'
                    type='description'
                  />
                  {errors.description && touched.description ? (
                    <span className='errors'>{errors.description}</span>
                  ) : null}
                  <label htmlFor='maxGuests'>Password</label>
                  <Field
                    id='maxGuests'
                    name='maxGuests'
                    placeholder='maxGuests'
                    type='number'
                  />
                  {errors.maxGuests && touched.maxGuests ? (
                    <span className='errors'>{errors.maxGuests}</span>
                  ) : null}
                  <label htmlFor='location'>Location</label>
                  <Field
                    component='select'
                    id='location'
                    name='location'
                    multiple={false}>
                    <option value='guest'>Guest</option>
                    <option value='host'>Host</option>
                  </Field>
                  {errors.location && touched.location ? (
                    <span className='errors'>{errors.location}</span>
                  ) : null}
                  <Button type='submit' disabled={isSubmitting ? true : false}>
                    Submit
                  </Button>
                </Form>
              );
            }}
          />
        </FormComponent>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default AddAccommodation;

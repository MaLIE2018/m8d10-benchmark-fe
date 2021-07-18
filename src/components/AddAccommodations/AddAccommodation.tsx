import { useContext, useEffect, useRef, useState } from "react";
import { Button, Modal, Form as MyForm } from "react-bootstrap";
import { LoginContext } from "../LoginContext";

import { Formik, Field, Form, FormikHelpers } from "formik";
import { AccommodationSchema } from "./AccommodationSchema";
import { Destination, uploadAccommodation } from "../../types";
import { getRequest, postRequest } from "../../lib/axios";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Styles } from "./styles";

const AddAccommodation: React.FC<RouteComponentProps> = ({ history }) => {
  const { open, setOpen, user, setLogged, setUpdate, update } =
    useContext(LoginContext);
  const [destinations, setDestinations] = useState<Destination[] | []>([]);
  const [firstRun, setFirstRun] = useState(true);
  const [slideOut, setSlide] = useState(false);
  const inputDest = useRef<HTMLInputElement | null>(null);

  const getDestinations = async () => {
    try {
      const res = await getRequest("accommodation/destinations");
      if (res.status === 200) setDestinations(res.data);
    } catch (error) {
      if (error.response.status === 401) {
        history.push("/welcome/login");
        setLogged(false);
        setOpen(false);
        setUpdate(false);
      }
    }
  };
  const posts = async (
    data: Destination | uploadAccommodation,
    URL: string
  ) => {
    try {
      const res = await postRequest(URL, data);
      if (res.status === 200) setUpdate(true);
    } catch (error) {
      if (error.response.status === 401) {
        history.push("/welcome/login");
        setLogged(false);
        setOpen(false);
      }
    }
  };
  //"accommodation/destinations"

  const addDestEventListener = () => {
    if (inputDest.current !== null && slideOut === true) {
      inputDest.current.addEventListener("keypress", function (event) {
        if (event.keyCode === 13 && inputDest.current !== null) {
          event.preventDefault();
          setSlide(!slideOut);
          posts(
            { location: inputDest.current.value },
            "accommodation/destinations"
          );
          inputDest.current.value = "";
          setUpdate(true);
        }
      });
    } else if (inputDest.current !== null && slideOut === false) {
      inputDest.current.removeEventListener("keypress", function () {});
    }
  };

  useEffect(() => {
    if (firstRun) {
      setFirstRun(false);
    } else {
      getDestinations();
    }
  }, [open, firstRun, update]);

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        maxGuests: 0,
        location: "",
        owner: "",
      }}
      validationSchema={AccommodationSchema}
      onSubmit={async (
        accommodation: uploadAccommodation,
        { setSubmitting }: FormikHelpers<uploadAccommodation>
      ) => {
        accommodation = { ...accommodation, owner: user._id! };
        posts(accommodation, "accommodation");
        setSubmitting(false);
        setOpen(false);
      }}
      render={(props) => {
        const { isSubmitting, errors, touched, submitForm } = props;
        return (
          <Modal show={open} onHide={() => setOpen(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add Accommodation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Styles>
                <Form id='mainForm'>
                  <label htmlFor='name'>Name of the Accommodation</label>
                  <Field
                    id='name'
                    name='name'
                    placeholder='Hotel at the beach'
                  />
                  {errors.name && touched.name ? (
                    <span className='errors'>{errors.name}</span>
                  ) : null}
                  <label htmlFor='description'>Description</label>
                  <Field
                    id='description'
                    name='description'
                    placeholder='Description'
                    type='text'
                  />
                  {errors.description && touched.description ? (
                    <span className='errors'>{errors.description}</span>
                  ) : null}
                  <label htmlFor='maxGuests'>maxGuests</label>
                  <Field
                    id='maxGuests'
                    name='maxGuests'
                    placeholder='maxGuests'
                    min='1'
                    type='number'
                  />
                  {errors.maxGuests && touched.maxGuests ? (
                    <span className='errors'>{errors.maxGuests}</span>
                  ) : null}
                  <div className='d-flex flex-row align-items-center justify-content-between position-relative'>
                    <div className='d-flex flex-column flex-grow-1'>
                      <label htmlFor='location'>Location</label>
                      <Field
                        component='select'
                        id='location'
                        name='location'
                        multiple={false}>
                        {destinations.map((destination) => (
                          <option key={destination._id} value={destination._id}>
                            {destination.location}
                          </option>
                        ))}
                      </Field>
                      {errors.location && touched.location ? (
                        <span className='errors'>{errors.location}</span>
                      ) : null}
                    </div>

                    <input
                      className={`new-destination ${slideOut ? "show" : ""}`}
                      type='text'
                      ref={inputDest}
                    />

                    <Button
                      className='h-50 ml-2 align-self-end'
                      onClick={() => {
                        addDestEventListener();
                        if (inputDest.current !== null) {
                          inputDest.current.focus();
                        }
                        setSlide(!slideOut);
                      }}>
                      Add
                    </Button>
                  </div>
                </Form>
              </Styles>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type='submit'
                disabled={isSubmitting ? true : false}
                onClick={submitForm}>
                Submit
              </Button>
              <Button variant='secondary' onClick={() => setOpen(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        );
      }}
    />
  );
};
export default withRouter(AddAccommodation);

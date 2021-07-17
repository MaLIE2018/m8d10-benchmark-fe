import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { postRequest } from "../../lib/axios";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { User } from "../../types";
import { FormComponent } from "./styles";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { SignUpSchema } from "./SignUpSchema";
import { LoginContext } from "../LoginContext";

const SignUp: React.FC<RouteComponentProps> = ({ history }) => {
  const { setNewCustomer } = useContext(LoginContext);
  const signUp = async (user: User) => {
    try {
      console.log("user:", user);
      const res = await postRequest("users/register", user);
      if (res.status === 200) {
      }
    } catch (error) {}
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        role: "guest",
      }}
      validationSchema={SignUpSchema}
      onSubmit={(values: User, { setSubmitting }: FormikHelpers<User>) => {
        signUp(values);
        setSubmitting(false);
        setNewCustomer(false);
        history.push("/welcome/login");
      }}
      render={(props) => {
        const { isSubmitting, errors, touched } = props;
        return (
          <FormComponent>
            <Form>
              <label htmlFor='name'>Name</label>
              <Field id='name' name='name' placeholder='John' />
              {errors.name && touched.name ? (
                <span className='errors'>{errors.name}</span>
              ) : null}
              <label htmlFor='email'>Email</label>
              <Field
                id='email'
                name='email'
                placeholder='john@acme.com'
                type='email'
              />
              {errors.email && touched.email ? (
                <span className='errors'>{errors.email}</span>
              ) : null}
              <label htmlFor='password'>Password</label>
              <Field
                id='password'
                name='password'
                placeholder='password'
                type='password'
              />
              {errors.password && touched.password ? (
                <span className='errors'>{errors.password}</span>
              ) : null}
              <label htmlFor='role'>What is your role?</label>
              <Field component='select' id='role' name='role' multiple={false}>
                <option value='guest'>Guest</option>
                <option value='host'>Host</option>
              </Field>
              {errors.role && touched.role ? (
                <span className='errors'>{errors.role}</span>
              ) : null}
              <Button type='submit' disabled={isSubmitting ? true : false}>
                Submit
              </Button>
            </Form>
          </FormComponent>
        );
      }}
    />
  );
};

export default withRouter(SignUp);

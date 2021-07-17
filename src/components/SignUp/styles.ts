import styled from "styled-components";

export const FormComponent = styled.div`
  form {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
  }
  input,
  select {
    margin: 0.3rem 0;
  }
  .errors {
    color: red;
    font-size: 0.8rem;
  }
`;

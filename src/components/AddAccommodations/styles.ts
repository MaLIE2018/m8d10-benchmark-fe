import styled from "styled-components";

export const Styles = styled.div`
  .new-destination {
    position: absolute;
    opacity: 0;
    transition: all 0.5s;
    transform: translateX(100%);
    z-index: -5;
    bottom: 0;
    width: 75%;
  }
  button {
    z-index: 1;
  }
  .show {
    opacity: 1;
    z-index: 1050;
    z-index: 1;
    transform: translateX(-1%);
  }

  #mainForm {
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

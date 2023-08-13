import styles from "./Reservations.module.css";
import Wrapper from "../../../UI/Wrapper";
import Form from "./Form";
import { useReducer } from "react";
const reducer = (state, action) => {
  if (action.type === "NAME_CHANGE") {
    return {
      ...state,
      name: action.value,
    };
  }
  if (action.type === "MOBILE_CHANGE") {
    return {
      ...state,
      telNumber: action.value,
    };
  }
  if (action.type === "DATE_CHANGE") {
    return {
      ...state,
      date: action.value,
    };
  }
  if (action.type === "PEOPLE_CHANGE") {
    return {
      ...state,
      peopleAmount: action.value,
    };
  }
  if (action.type === "NOTE_CHANGE") {
    return {
      ...state,
      note: action.value,
    };
  }
  if (action.type === "TIME_CHANGE") {
    return {
      ...state,
      time: action.value,
    };
  }
  if (action.type === "RESET") {
    return {
      name: "",
      telNumber: "",
      date: "",
      peopleAmount: "",
      time: "",
      note: "",
    };
  }
  return state;
};
const Reservations = () => {
  const [formData, dispatchFormData] = useReducer(reducer, {
    name: "",
    telNumber: "",
    date: "",
    peopleAmount: "",
    time: "",
    note: "",
  });
  return (
    <>
      <Wrapper>
        <Form dispatch={dispatchFormData} data={formData} />
      </Wrapper>
    </>
  );
};
export default Reservations;

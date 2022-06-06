import classes from "./Checkout.module.css";
import { useInput } from "../itils/helpers/useInput";
import CartContext from "../../store/cart-context";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = (props) => {
  let cartCTX = useContext(CartContext);
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameinputBlurHandler,
    emptyHandler: emptyInput,
  } = useInput((value) => value.trim() === "");

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurChangeHandler,
    emptyHandler: emptyStreet,
  } = useInput((value) => value.trim() === "");

  const {
    value: enteredCode,
    isValid: enteredCodeIsValid,
    hasError: codeInputHasError,
    valueChangeHandler: codeChangeHandler,
    inputBlurHandler: codeBlurChangeHandler,
    emptyHandler: emptyCode,
  } = useInput((value) => value.trim() === "");
  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurChangeHandler,
    emptyHandler: emptyCity,
  } = useInput((value) => value.trim() === "");



  async function fetchData() {
    let data = {
      enteredName,
      enteredStreet,
      enteredCity,
      enteredCode,
      items: cartCTX.items,
      amount: `$${cartCTX.totalAmount.toFixed(2)}`,
    };
    let response = await fetch(
      "https://food-2c28d-default-rtdb.firebaseio.com/users.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    console.log(response);
  }

  const confitmHandler = (event) => {
    event.preventDefault();

    try {
      fetchData();
    } catch (error) {}
    console.log("confirmed");
    emptyInput();
    emptyStreet();
    emptyCode();
    emptyCity();
  };

  let formsIsValid = false;
  if (
    !enteredNameIsValid &&
    !enteredStreetIsValid &&
    !enteredCodeIsValid &&
    !enteredCityIsValid
  ) {
    formsIsValid = true;
  }

  // console.log(nameInputHasError);
  const nameControl = nameInputHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const streetControl = streetInputHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const codeControl = codeInputHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const cityControl = cityInputHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  let btnDis = formsIsValid
    ? `${classes.actions} ${classes.button} ${classes.submit}`
    : `${classes.actions}`;
  // let cancel = `${classes.button}`;

  return (
    <form onSubmit={confitmHandler}>
      <div className={nameControl}>
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameinputBlurHandler}
        />
      </div>
      <div className={streetControl}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetBlurChangeHandler}
        />
      </div>
      <div className={codeControl}>
        <label htmlFor="postal">Postal code</label>
        <input
          type="text"
          id="postal"
          value={enteredCode}
          onChange={codeChangeHandler}
          onBlur={codeBlurChangeHandler}
        />
      </div>
      <div className={cityControl}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityChangeHandler}
          onBlur={cityBlurChangeHandler}
        />
      </div>
      <ToastContainer />
      <div className={classes.actions}>
        <button
          className={classes.actions}
          type="button"
          onClick={props.onCancel}
        >
          Cancel
        </button>
        <button disabled={!formsIsValid} className={btnDis}>
          Confirm
        </button>
      </div>
     
    </form>
  );
};

export default Checkout;

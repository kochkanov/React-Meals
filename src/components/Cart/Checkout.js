import classes from "./Checkout.module.css";
import { useInput } from "../itils/helpers/useInput";

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameinputBlurHandler,
    emptyHandler:emptyInput
  } = useInput((value) => value.trim() === "");

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurChangeHandler,
    emptyHandler:emptyStreet,
  } = useInput((value) => value.trim() === "");

  const {
    value:enteredCode,
    isValid:enteredCodeIsValid,
    hasError:codeInputHasError,
    valueChangeHandler:codeChangeHandler,
    inputBlurHandler: codeBlurChangeHandler,
    emptyHandler:emptyCode,
  } = useInput((value)=>value.trim() === "")
  const {
    value:enteredCity,
    isValid:enteredCityIsValid,
    hasError:cityInputHasError,
    valueChangeHandler:cityChangeHandler,
    inputBlurHandler: cityBlurChangeHandler,
    emptyHandler:emptyCity,
  } = useInput((value)=>value.trim() === "")

  const confitmHandler = (event) => {
    event.preventDefault();
    console.log("confirmed");
    emptyInput()
    emptyStreet()
    emptyCode()
    emptyCity()
  }; 

  let formsIsValid = false 
  if(!enteredNameIsValid && !enteredStreetIsValid && !enteredCodeIsValid && !enteredCityIsValid){
      formsIsValid = true
  }
 

// console.log(nameInputHasError);
  const nameControl = nameInputHasError ? `${classes.control} ${classes.invalid}`:`${classes.control}`
  const streetControl = streetInputHasError ?  `${classes.control} ${classes.invalid}`:`${classes.control}`
  const codeControl = codeInputHasError ?  `${classes.control} ${classes.invalid}`:`${classes.control}`
  const cityControl = cityInputHasError ?  `${classes.control} ${classes.invalid}`:`${classes.control}`


  let btnDis = formsIsValid ? `${classes.actions} ${classes.button} ${classes.submit}` : `${classes.actions}`
  let cancel = `${classes.button}`

  return (
    <form onSubmit={confitmHandler}>
      <div className={nameControl}>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" value={enteredName} onChange={nameChangeHandler} onBlur={nameinputBlurHandler}/>
      </div>
      <div className={streetControl}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" value={enteredStreet} onChange={streetChangeHandler} onBlur={streetBlurChangeHandler}/>
      </div>
      <div className={codeControl}>
        <label htmlFor="postal">Postal code</label>
        <input type="text" id="postal" value={enteredCode} onChange={codeChangeHandler} onBlur={codeBlurChangeHandler} />
      </div>
      <div className={cityControl}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" value={enteredCity} onChange={cityChangeHandler} onBlur={cityBlurChangeHandler}/>
      </div>
      <div className={classes.actions}>
         <button className={classes.actions} type="button" onClick={props.onCancel}>
        Cancel     
      </button>
      <button  disabled={!formsIsValid} className={btnDis}>Confirm</button>
    
      </div>
         
      
    </form>
  );
};

export default Checkout;

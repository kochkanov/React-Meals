import { useReducer } from "react";

function inputReduce(prevState,action){
    if(action.type==="INPUTS"){
        return{
            ...prevState,
            enteredValue:action.value,
        }
    }
    if(action.type==="INPUT_BLUR"){
        return{
            ...prevState,
            isTouched: action.value
        }
    }

    if(action.type === "EMPTY"){
      return{
        enteredValue:"",
        isTouched:false
      }
    }
    
}

export const useInput = (validateState) => {
  const [inputs, dispatchInputs] = useReducer(inputReduce, {
    enteredValue: "",
    isTouched: false,
  });

 function emptyHandler(){
   dispatchInputs({
type:"EMPTY"
   })
 }

  const valueIsValid = validateState(inputs.enteredValue);
  const hasError = valueIsValid && inputs.isTouched;

  const valueChangeHandler = (e) => {
    dispatchInputs({
      type: "INPUTS",
      value: e.target.value,
    });
  };

  const inputBlurHandler = (e) => {
    dispatchInputs({
      type: "INPUT_BLUR",
      value: true,
    });
  };
  return {
    value: inputs.enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    emptyHandler,
  };
};

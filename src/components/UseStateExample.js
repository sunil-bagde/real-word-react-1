import React, { useState } from "react";
import * as yup from "yup";
import groupBy from "lodash.groupby";
import keys from "lodash.keys";
import foreach from "lodash.foreach";
let userSchema = yup.object({
  name: yup.string().required(),
  gender: yup.string().required(),
  city: yup.string().required(),
  email: yup.string().required().email(),
  agree: yup.string().required(),

});
import "./UseStateExample.css";
const UseStateExample = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    gender: "",
    city: "",
    agree: "",
  });
  const [erros, setErros] = useState({
    name: "",
    email: "",
    gender: "",
    city: "",
    agree: "",
  });
  const handleInputChange = (event) => {
    const value = event.target.value;
    const inputValues = {
      ...input,
      [event.target.name]: value,
    };
    setInput(inputValues);
  };
  const handleInputCheckbox = (event) => {
    if (event.target.checked) {
      value = event.target.checked;
    } else {
      value = event.target.checked;
    }
    const inputValues = {
      ...input,
      [event.target.name]: value,
    };
    setInput(inputValues);
  };
  async function buildError(error) {
    const errorObject = {};
    if (error instanceof yup.ValidationError) {
      const fieldErrors = await groupBy(error.inner, "path");
      const fields = keys(fieldErrors);
      await foreach(fields, async (field) => {
        const errorsHolder = [];
        await foreach(fieldErrors[field], (fieldError) => {
          if (!errorObject[field]) {
            errorObject[field] = fieldError.errors[0];
          }
        });
      });
    }
    return errorObject;
  }

console.log("erros", erros );
  return (
    <div className="container-sm border rounded mt-2">
      <div style={{ padding: 10 }}>
        <h1>User info</h1>
      </div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const user = await userSchema.validate(input, {
              abortEarly: false,
            });
            console.log("user", user);
          } catch (err) {
            const result = await buildError(err);
             setErros(result)
          }
        }}
        noValidate
      >
        <div>
          <label className="form-label" htmlFor="name">
            Name:
          </label>
          <input
            className={`form-control  ${erros['name']  ? 'is-invalid' : ''}`}
            type="text"
            id="name"
            name="name"
            onChange={handleInputChange}
          />
          <div id="validationServer03Feedback" className="invalid-feedback">
            {erros['name']}
          </div>
        </div>
        <div>
          <label className="form-label" htmlFor="email">
            Email:
          </label>
          <input
          className={`form-control  ${erros['email']  ? 'is-invalid' : ''}`}
            type="email"
            id="email"
            name="email"
            onChange={handleInputChange}
          />
          <div id="validationServer03Feedback" className="invalid-feedback">
            {erros['email']}
          </div>
        </div>

        <div className="form-check">
          <label className="form-check-label" htmlFor="male">
            Male
          </label>
          <input
            className={`form-check-input  ${erros['gender']  ? 'is-invalid' : ''}`}
            value="male"
            type="radio"
            id="male"
            name="gender"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <div className={`form-check ${erros['gender']  ? 'is-invalid' : ''}`}>
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
            <input
           className={`form-check-input  ${erros['gender']  ? 'is-invalid' : ''}`}
              value="female"
              type="radio"
              id="female"
              name="gender"
              onChange={handleInputChange}
            />

          </div>
          <div id="validationServer03Feedback" className="invalid-feedback">
            {erros['gender']}
          </div>
        </div>


        <div>
          <select className={`form-select ${erros['city'] ? ' is-invalid' : ''}`} name="city" id="city">
            <option value="">Select city</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Thane">Thane</option>

          </select>
          <div id="validationServer03Feedback" className="invalid-feedback">
            {erros['city']}
          </div>
        </div>
        <div>
          <div className={`form-check ${erros['agree']  ? 'is-invalid' : ''}`}>
            <label className="form-check-label" htmlFor="agree">
              Agree
            </label>
            <input
              onChange={handleInputCheckbox}
             className={`form-check-input  ${erros['agree']  ? 'is-invalid' : ''}`}
              type="checkbox"
              name="agree"
            />

          </div>
          <div id="validationServer03Feedback" className="invalid-feedback">
            {erros['agree']}
          </div>
        </div>

        <div className="py-2">
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export { UseStateExample };

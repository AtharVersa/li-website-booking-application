import React, { memo } from "react";

const styles = {
  color: "#F00",
  fontSize: "12px",
};

function Input({ label, type, register, placeholder, name, error, required }) {
  function getCurrentDate() {
    if (type === "date") {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  }

  return (
    <>
      {label && (
        <label htmlFor="input-field" className="font-weight-bold text-primary">
          {label}
        </label>
      )}

      {type === "date" ? (
        <input
          onKeyDown={(e) => e.preventDefault()} // Disables typing
          type={type}
          className={"form-control" + (!error ? "" : " is-invalid")}
          placeholder={placeholder}
          name={name}
          min={getCurrentDate()}
          {...register(name, required)}
        />
      ) : (
        <input
          type={type}
          className={"form-control" + (!error ? "" : " is-invalid")}
          placeholder={placeholder}
          name={name}
          {...register(name, required)}
        />
      )}
      {error && <span style={styles}>{error}</span>}
    </>
  );
}
export default memo(Input);

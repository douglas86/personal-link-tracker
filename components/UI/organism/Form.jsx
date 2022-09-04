import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";

import { label } from "../atom";

import Handler from "../../utils/handlers/Handler";

import styles from "./styles/Form.module.css";

const Form = ({ array }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { data: session } = useSession();
  const { handleOnSubmit } = Handler();

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleOnSubmit)}>
      {array.map((items, index) => (
        <div key={index}>
          {label("text-muted", items)}
          <br />
          <input
            {...register(items, { required: `${items} is required` })}
            className={styles.input}
          />
          {Object.entries(errors).map(([key, values]) => (
            <p key={key} style={{ color: "red" }}>
              {key === items && values.type === "required" && values.message}
            </p>
          ))}
        </div>
      ))}
      <Button
        variant="warning"
        type="submit"
        className={styles.button}
        disabled={!session}
      >
        {session ? "Post" : "Login to Post"}
      </Button>
    </form>
  );
};

export default Form;

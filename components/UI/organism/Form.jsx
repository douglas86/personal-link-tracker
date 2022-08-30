import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";

import { label } from "../atom/label";

import styles from "./styles/Form.module.css";
import { useContext } from "react";
import { Context } from "../../../Context/Store";
import Handler from "../../utils/handlers/Handler";

const Form = ({ array }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [state, dispatch] = useContext(Context);

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

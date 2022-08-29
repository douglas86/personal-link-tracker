import { useForm } from "react-hook-form";
import Handler from "../../utils/handlers/Handler";

const ShowRadio = ({ items, name }) => {
  const { register } = useForm();
  const { handleRadio } = Handler();

  return (
    <div>
      <label htmlFor={items}>
        <input
          {...register("types", { required: true })}
          type="radio"
          name={name}
          onChange={() => handleRadio(items, name)}
        />{" "}
        {items}
      </label>
      <br />
    </div>
  );
};

export default ShowRadio;

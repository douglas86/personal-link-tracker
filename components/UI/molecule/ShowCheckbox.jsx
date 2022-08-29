import { Controller, useForm } from "react-hook-form";
import { Checkbox } from "@material-ui/core";

import Handler from "../../utils/handlers/Handler";

const ShowCheckbox = ({ title }) => {
  const { control } = useForm();
  const { handleCheckbox } = Handler();

  return (
    <div>
      <Controller
        control={control}
        name={title}
        render={({ field }) => (
          <Checkbox
            {...field}
            onChange={(event) => handleCheckbox(event.target.checked, title)}
          />
        )}
      />
      <label>{title}</label>
    </div>
  );
};

export default ShowCheckbox;

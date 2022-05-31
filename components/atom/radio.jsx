export const RadioButton = ({ value, checked, onChange }) => (
    <>
        <input
            type="radio"
            onChange={onChange}
            name="radio"
            defaultChecked={checked}
        />
    </>
);

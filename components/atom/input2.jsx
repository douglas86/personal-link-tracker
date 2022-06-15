export const input = (type, name, state, setState, placeholder, value) => (
  <>
    <input
      type={type}
      style={{ width: "100%", margin: "2% 1%" }}
      value={value}
      onChange={(e) => setState({ ...state, [name]: e.target.value })}
      placeholder={placeholder}
    />
  </>
);

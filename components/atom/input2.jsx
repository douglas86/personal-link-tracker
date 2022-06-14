export const input = (type, name, state, setState, placeholder) => (
  <input
    type={type}
    style={{ width: "100%", margin: "2% 1%" }}
    onChange={(e) => setState({ ...state, [name]: e.target.value })}
    placeholder={placeholder}
  />
);

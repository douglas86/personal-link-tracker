export const input = (type, style, change, placeholder, value) => (
  <input
    type={type}
    value={value}
    style={style}
    onChange={(e) => change(e.target.value)}
    placeholder={placeholder}
  />
);

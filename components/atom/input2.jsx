export const input = (type, style, change, placeholder) => (
  <input
    type={type}
    style={style}
    onChange={(e) => change(e.target.value)}
    placeholder={placeholder}
  />
);

export const input = (type, style, change) => (
  <input type={type} style={style} onChange={(e) => change(e.target.value)} />
);

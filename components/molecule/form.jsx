export const form = (
  setTitle,
  register,
  name,
  handleSubmit,
  errors,
  quillRef
) => (
  <>
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={(e) => setTitle(e.target.value)} />
      <p>{errors.title && "Enter valid title"}</p>
      <div ref={quillRef} />
      <p>{errors.description && "Enter valid description"}</p>
      <input type="submit" />
    </form>
  </>
);

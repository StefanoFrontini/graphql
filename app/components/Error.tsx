interface ErrorProps {
  msg: string;
}

const Error = ({ msg }: ErrorProps) => {
  return (
    <section className="error-page section">
      <div className="error-container">
        <h1>{msg}</h1>
      </div>
    </section>
  );
};
export default Error;

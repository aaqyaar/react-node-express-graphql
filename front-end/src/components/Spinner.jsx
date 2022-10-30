export default function Spinner({ variant }) {
  return (
    <div className={`d-flex justify-content-center ${variant || ""}`}>
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
}

import "./post.css";

export default function Post({head, children}) {/* destruction atribute */
  return (
    <div className="post">
      <h2>{head}</h2>
      <hr />
      <p>{children}</p>
    </div>
  );
}

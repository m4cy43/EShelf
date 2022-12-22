import { Link } from "react-router-dom";
import "./css/tableline.css";

function AuthorTableLine({ book }) {
  return (
    <tr>
      <td>{book.number}</td>
      <td><Link to={`/book/${book.uuid}`}>{book.title}</Link></td>
      <td>{book.year}</td>
      <td>
        {book.genres
          .map((el) => {
            return <a key={el.uuid}>{el.genreName}</a>;
          })}
      </td>
      <td>{book.section.sectionName}</td>
    </tr>
  );
}

export default AuthorTableLine;

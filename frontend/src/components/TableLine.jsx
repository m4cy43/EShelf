import { Link } from "react-router-dom";
import "./css/tableline.css";

function TableLine({ book }) {
  return (
    <tr>
      <td>{book.number}</td>
      <td>
        <Link to={`/book/${book.uuid}`}>{book.title}</Link>
      </td>
      <td>
        {book.authors.map((el) => {
          return (
            <Link to={`/author/${el.uuid}`} key={el.uuid}>
              {el.surname} {el.name} {el.middlename}
            </Link>
          );
        })}
      </td>
      <td>{book.year}</td>
      <td>
        {book.genres.map((el) => {
          return <a key={el.uuid}>{el.genreName}</a>;
        })}
      </td>
      <td>{book.section ? book.section.sectionName : ""}</td>
    </tr>
  );
}

export default TableLine;

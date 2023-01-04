import { Link } from "react-router-dom";
import "./css/tableline.css";

function DebtsTableLine({ user, book, approve, decline }) {
  return (
    <tr>
      <td>
        {approve ? (
          <input
            type="submit"
            value="+"
            className="plusBut"
            onClick={() => {
              approve(user.uuid, book.uuid);
            }}
          />
        ) : (
          <></>
        )}
        {decline ? (
          <input
            type="submit"
            value="-"
            className="minusBut"
            onClick={() => {
              decline(user.uuid, book.uuid);
            }}
          />
        ) : (
          <></>
        )}
      </td>
      <td>{book.debt.deadlineDate}</td>
      <td>
        {user.surname} {user.name}
      </td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
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
    </tr>
  );
}

export default DebtsTableLine;

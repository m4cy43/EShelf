import "./css/tableline.css";

function TableLine({ book }) {
  return (
    <tr>
      <td>{book.number}</td>
      <td>{book.title}</td>
      <td>{book.authors.map((el)=>{
        return `${el.surname} ${el.name} ${el.middlename}`
      }).join(", ")}</td>
      <td>{book.year}</td>
      <td>{book.genres.map((el)=>{
        return `${el.genreName}`
      }).join(", ")}</td>
      <td>{book.section.sectionName}</td>
    </tr>
  );
}

export default TableLine;

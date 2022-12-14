import "./css/tableline.css";

function TableLine({ book }) {
  let aline = [];
  for (let el of book.authors) {
    aline.push(`${el.surname} ${el.name} ${el.middlename}`);
  }
  let aresline = aline.join(", ");

  let gline = [];
  for (let el of book.genres) {
    gline.push(el.genreName);
  }
  let gresline = gline.join(", ");

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

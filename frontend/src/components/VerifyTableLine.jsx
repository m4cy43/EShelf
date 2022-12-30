import "./css/tableline.css";

function VerifyTableLine({ user, verify }) {
  return (
    <tr>
      <td>
        <input
          type="submit"
          value="+"
          onClick={() => {
            verify(user.uuid);
          }}
        />
      </td>
      <td>{user.updatedAt}</td>
      <td>
        {user.surname} {user.name}
      </td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
    </tr>
  );
}

export default VerifyTableLine;

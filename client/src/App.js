import { useEffect, useState } from "react";
import "./App.css";
import { getAll, createUser, deleteUser, editUser, sortPairs } from "./services/users";

function App() {
  const [id, setId] = useState("");
  const [userList, setUser] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editing, setEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAll(setUser);
  }, [editing]);

  const clearValues = () => {
    setId("");
    setName("");
    setEmail("");
  };

  return (
    <main>
      <div className="newUser">
        <h1>Cadastro de novo usuario</h1>
        <span className="alert">{errorMessage}</span>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={({ target: { value } }) => setName(value)}
          />
        </label>
        <label>
          E-mail:
          <input
            type="email"
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
          />
        </label>
        <div className="buttons">
          <button
            onClick={() => {
              editing
                ? editUser(id, name, email).then(() => {
                    setUser([]);
                    setEditing(false);
                    clearValues();
                  })
                : createUser(name, email).then(({ data }) => {
                    if (data.error) {
                      setErrorMessage(data.error);
                      setInterval(() => setErrorMessage(''), 1000)
                      return;
                    }
                    const { _id } = data;
                    setUser([...userList, { _id, name, email }]);
                    clearValues();
                  });
            }}
          >
            {editing ? "Alterar user" : "Cadastrar"}
          </button>
          <button
            style={{ display: editing ? "block" : "none" }}
            onClick={() => {
              setEditing(false);
              clearValues();
              setId("");
            }}
          >
            Cancelar edi????o
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {userList.map(({ _id, name, email }) => {
            return (
              <tr key={_id}>
                <td>{name}</td>
                <td>{email}</td>
                <td>
                  <button
                    onClick={() => {
                      setUser(userList.filter((user) => user._id !== _id));
                      deleteUser(_id);
                    }}
                  >
                    Apagar
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setName(name);
                      setEmail(email);
                      setId(_id);
                      setEditing(true);
                    }}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={sortPairs}>Sortear!</button>
    </main>
  );
}

export default App;

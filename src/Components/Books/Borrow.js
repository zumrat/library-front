import React, { useState } from "react";

const Borrow = ({ book, _borrowBook }) => {
  const [state, setState] = useState({
    name: "",
    second: "",
    phone: "",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "30%" }}>
      <input
        placeholder="Name"
        value={state.name}
        name="name"
        onChange={(e) =>
          setState({ ...state, [e.target.name]: e.target.value })
        }
      />
      <br />
      <input
        placeholder="Second Name"
        value={state.second}
        name="second"
        onChange={(e) =>
          setState({ ...state, [e.target.name]: e.target.value })
        }
      />
      <br />
      <input
        placeholder="Tel"
        value={state.phone}
        name="phone"
        onChange={(e) =>
          setState({ ...state, [e.target.name]: e.target.value })
        }
      />
      <br />
      <button onClick={() => _borrowBook({ ...state, bookId: book.id })}>
        Send Request
      </button>
    </div>
  );
};

export default Borrow;

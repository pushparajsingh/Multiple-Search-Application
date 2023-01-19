import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [state, setState] = useState();
  const [inputData, setInputData] = useState({
    date: "",
    id: "",
    name: "",
  });
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await fetch(
      "https://629dae743dda090f3c07dd7f.mockapi.io/fakeapi"
    );
    const dataTable = await result.json();
    try {
      if (dataTable) {
        setState(dataTable);
      }
    } catch (error) {
      console.log("list error", error);
    }
  };

  function Search() {
    const filterDate = state
      .filter((items) => {
        if (inputData.date == "") {
          return items;
        } else if (
          items.createdAt.toLowerCase() === inputData?.date.toLowerCase()
        ) {
          return items;
        }
      })
      .filter((items) => {
        if (inputData.id == "") {
          return items;
        } else if (items.id.toLowerCase() === inputData.id.toLowerCase()) {
          return items;
        }
      })
      .filter((items) => {
        if (inputData.name == "") {
          return items;
        } else if (items.name.toLowerCase() === inputData.name.toLowerCase()) {
          return items;
        }
      });

    setState(filterDate);
    if (inputData.date == "" && inputData.id == "" && inputData.name == "") {
      getData();
    }
  }

  function Clear() {
    setInputData({
      date: "",
      id: "",
      name: "",
    });
    getData();
  }

  return (
    <div className="App">
      <label>Date</label>
      <input
        type={"text"}
        className="marginTop marginRight"
        onChange={(e) => {
          setInputData({ ...inputData, date: e.target.value });
        }}
        value={inputData.date}
      />
      <label>ID</label>
      <input
        type={"text"}
        className="marginTop marginRight"
        value={inputData.id}
        onChange={(e) => setInputData({ ...inputData, id: e.target.value })}
      />
      <label>Name</label>
      <input
        type={"text"}
        className="marginTop marginRight"
        value={inputData.name}
        onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
      />
      <button onClick={() => Search()}>Search</button>&nbsp;
      <button onClick={() => Clear()}>Clear</button>
      <table
        cellPadding={"10px"}
        border={"2px"}
        align={"center"}
        className="marginTop"
      >
        <thead>
          <tr>
            <th>createdAt</th>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {state?.map((item) => (
            <tr key={item.id}>
              <td>{item.createdAt}</td>
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

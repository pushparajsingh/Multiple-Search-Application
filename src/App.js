import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [list, setList] = useState();
  const [show, setShow] = useState();
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
        setList(dataTable);
        setShow(dataTable);
      }
    } catch (error) {
      console.log("list error", error);
    }
  };

  const Search = () => {
    console.log("data", list);
    console.log(inputData.id, ":id");
    console.log(inputData.name, ":name");
    const { date, id, name } = inputData;

    const filterDate = list.filter((item) => {
      var filtername =
        name != ""
          ? item.name.toLowerCase() === inputData.name.toLowerCase()
          : true;
      var filterid =
        id != "" ? item.id.toLowerCase() === inputData.id.toLowerCase() : true;
      var filterdate =
        date != ""
          ? item.createdAt
              .toLowerCase()
              .indexOf(inputData.date.toLowerCase()) !== -1
          : true;
      return filtername && filterid && filterdate;
    });
    console.log(filterDate, "data");
    setShow(filterDate);
  };

  const Clear = () => {
    setInputData({
      date: "",
      id: "",
      name: "",
    });
    setShow(list);
  };

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
          {show?.map((item) => (
            <tr key={item.id}>
              <td>{item.createdAt}</td>
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
          ))}

          {show == "" && (
            <tr>
              <td colSpan={3}>Record Not Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;

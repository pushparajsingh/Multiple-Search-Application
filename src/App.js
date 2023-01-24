import "./App.css";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import moment from "moment/moment";

import Header from "./header";
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
      <Header />
      <label className="spacelabel">ID</label>
      <input
        type={"text"}
        className="marginTop marginRight"
        id="idBox"
        value={inputData.id}
        onChange={(e) => setInputData({ ...inputData, id: e.target.value })}
      />
      <label className="spacelabel">Name</label>
      <input
        type={"text"}
        className="marginTop marginRight"
        value={inputData.name}
        onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
      />
      <label className="spacelabel">Date</label>
      <input
        type="date"
        name="date"
        className="marginTop marginRight"
        onChange={(e) => {
          setInputData({ ...inputData, date: e.target.value });
        }}
        value={
          inputData.date
            ? moment(new Date(inputData.date)).format("YYYY-MM-DD")
            : ""
        }
        autoComplete="on"
      />
      <Button variant="outline-light fontsmall" onClick={() => Search()}>
        Search
      </Button>
      &nbsp;
      <Button variant="outline-light fontsmall" onClick={() => Clear()}>
        Clear
      </Button>
      <Table
        striped
        bordered
        hover
        variant="dark"
        align={"center"}
        className="marginTop"
        id="table"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {show?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.createdAt.slice(0, 10)}</td>
            </tr>
          ))}

          {show == "" && (
            <tr>
              <td colSpan={3}>Record Not Found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default App;

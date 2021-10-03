import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Table, Checkbox, Progress } from "semantic-ui-react";
import { useCookies } from "react-cookie";

function getmunros() {
  return fetch("http://localhost:3001")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      console.log(data);
      return JSON.parse(data);
    });
}

function munroUpdate(munro_id, completed, munroUpdateCallback) {
  const done = window.confirm("Have you done this mountain?");
  if (done) {
    fetch(`http://localhost:3001/munros`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ munro_id, completed }),
    }).then(munroUpdateCallback);
  }
}

const Munros = () => {
  const [munros, setmunros] = useState([]);
  const [sortKeys, setSortKeys] = useState(["name", true]);
  const [cookies, setCookie, removeCookie] = useCookies(["jwt-token"]);

  const sortByFieldDir = ([fieldName, fieldDirection]) => {
    if (fieldDirection) {
      return (a, b) => a[fieldName] > b[fieldName];
    } else {
      return (a, b) => a[fieldName] < b[fieldName];
    }
  };

  const updateMunros = () => getmunros().then((data) => setmunros(data));

  let message;
  const completed_munros = munros.filter(
    (munros) => munros["completed"]
  ).length;
  const percentage = completed_munros / munros.length;

  if (percentage < 0.25) {
    message = "You have started on quite a journey! Keep going!";
  } else if (percentage < 0.5) {
    message = "You have visited a lot of Scotland! Do more Munros!";
  } else if (percentage < 0.75) {
    message = "Over half the mountains done! Let's do the rest!";
  } else if (completed_munros === 282) {
    message = "You are a completeist! You have done all Munros!";
  } else {
    message = "You are a true Scot in heart!";
  }

  useEffect(updateMunros);

  return (
    <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Button
                basic
                color="violet"
                onClick={() =>
                  setSortKeys([
                    "name",
                    sortKeys[0] === "name" ? !sortKeys[1] : sortKeys[1],
                  ])
                }
              >
                Name
              </Button>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Button
                basic
                color="violet"
                onClick={() => {
                  setSortKeys([
                    "height_m",
                    sortKeys[0] === "height_m" ? !sortKeys[1] : sortKeys[1],
                  ]);
                }}
              >
                Height (m)
              </Button>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Button
                basic
                color="violet"
                onClick={() => {
                  setSortKeys([
                    "height_ft",
                    sortKeys[0] === "height_ft" ? !sortKeys[1] : sortKeys[1],
                  ]);
                }}
              >
                Height (ft)
              </Button>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Button
                basic
                color="violet"
                onClick={() => {
                  setSortKeys([
                    "completed",
                    sortKeys[0] === "completed" ? !sortKeys[1] : sortKeys[1],
                  ]);
                }}
              >
                Completed
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {munros.sort(sortByFieldDir(sortKeys)).map((elem) => {
            return (
              <Table.Row positive={elem.completed} key={elem.munro_id}>
                <Table.Cell>{elem.name}</Table.Cell>
                <Table.Cell>{elem.height_m}</Table.Cell>
                <Table.Cell>{elem.height_ft}</Table.Cell>
                <Table.Cell>{elem.completed ? "good boi" : "lame"}</Table.Cell>
                <Table.Cell>
                  <Checkbox
                    checked={elem.completed}
                    onClick={() => {
                      munroUpdate(elem.munro_id, !elem.completed, updateMunros);
                    }}
                  ></Checkbox>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <Progress
        style={{ position: "fixed", bottom: "0px", width: "100%" }}
        value={completed_munros}
        total={munros.length}
        progress="ratio"
      >
        {message}
      </Progress>
    </div>
  );
};

export default Munros;

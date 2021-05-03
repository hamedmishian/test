import { Button, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import useStyle from "./styles";
import CallEndIcon from "@material-ui/icons/CallEnd";
import PersonIcon from "@material-ui/icons/Person";

const Test = () => {
  const classes = useStyle();
  const [users, setUsers] = useState([]);
  const [date, setDate] = useState(Date().toLocaleString());
  const [currentCard, setCurrentCard] = useState(null);
  const handleAddUser = e => {
    users.length < 12 &&
      setUsers([
        ...users,
        {
          id: Math.floor(Math.random() * 13),
          title: Math.floor(Math.random() * 13),
          order: Math.floor(Math.random() * 13)
        }
      ]);
  };

  const dragStartHandler = (e, item) => {
    console.log("Drag", item);
    setCurrentCard(item);
  };

  const dragOverHandler = e => {
    e.preventDefault();
    e.target.style.background = "lighgray";
  };

  const dragEndHandler = e => {
    e.target.style.background = "white";
  };

  const dropHandler = (e, item) => {
    e.preventDefault();
    setUsers(
      users.map(box => {
        if (box.id === item.id) {
          return { ...box, order: currentCard.order };
        }
        if (box.id === currentCard.id) {
          return { ...box, order: item.order };
        }
        return box;
      })
    );
    e.target.style.background = "white";
  };

  const sortBoxes = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <Grid container className={classes.test}>
      <Grid container justify="center">
        <Typography
          style={{ color: "white", fontSize: "20px", marginTop: "5px" }}
        >
          {date}
        </Typography>
      </Grid>
      <Grid container justify="center" className={classes.boxContainer}>
        {users?.sort(sortBoxes).map(item => {
          return (
            <Grid
              item
              draggable
              onDragStart={e => dragStartHandler(e, item)}
              onDragLeave={e => dragEndHandler(e)}
              onDragOver={e => dragOverHandler(e)}
              onDragEnd={e => dragEndHandler(e)}
              onDrop={e => dropHandler(e, item)}
              className={classes.userBox}
              style={{ height: users.length <= 4 ? "300px" : "" }}
              key={item.id}
              {...{
                lg:
                  users.length < 3
                    ? 12 / 2
                    : users.length >= 4
                    ? 12 / 4
                    : 12 / 3
              }}
            >
              <PersonIcon color="primary" style={{ fontSize: "100px" }} />
              <Typography>{item.title}</Typography>
            </Grid>
          );
        })}
      </Grid>
      <Grid container justify="center">
        <Button className={classes.addBtn} onClick={handleAddUser}>
          <CallEndIcon color="action" fontSize="large" />
        </Button>
      </Grid>
    </Grid>
  );
};

export default Test;

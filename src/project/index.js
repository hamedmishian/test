import { Button, Grid, Typography } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import useStyle from "./styles";
import CallEndIcon from "@material-ui/icons/CallEnd";
import PersonIcon from "@material-ui/icons/Person";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Test = () => {
  const classes = useStyle();
  const [date, setDate] = useState(Date().toLocaleString());
  const [currentCard, setCurrentCard] = useState(null);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  const max = 12;
  const random = [];

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, [date]);

  for (var i = 0; i < 12; i++) {
    var temp = Math.floor(Math.random() * max);
    if (random.indexOf(temp) == -1) {
      random.push(temp);
    } else i--;
  }

  const handleAddUser = e => {
    e.preventDefault();
    users.length < 12 &&
      dispatch({
        type: "ADD",
        payload: { id: random, title: random, order: random }
      });
  };

  const dragStartHandler = (e, item) => {
    setCurrentCard(item);
  };

  const dragOverHandler = e => {
    e.preventDefault();
  };

  const dragEndHandler = e => {};

  const dropHandler = (e, item) => {
    e.preventDefault();
    dispatch({
      type: "DROP",
      payload: { item, currentCard }
    });
  };

  const sortBoxes = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else if (a.order < b.order) {
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
              onDragEnd={e => dragEndHandler(e)}
              onDragOver={e => dragOverHandler(e)}
              onDrop={e => dropHandler(e, item)}
              className={classes.userBox}
              key={item.id}
              {...{
                lg:
                  users.length < 3
                    ? 12 / 2
                    : users.length >= 4
                    ? 12 / 4
                    : 12 / 3,
                sm:
                  users.length < 3
                    ? 12 / 2
                    : users.length >= 4
                    ? 12 / 4
                    : 12 / 3,
                xs:
                  users.length < 3
                    ? 12 / 2
                    : users.length >= 4
                    ? 12 / 4
                    : 12 / 3
              }}
            >
              <div>
                <Grid item>
                  <PersonIcon color="primary" style={{ fontSize: "100px" }} />
                </Grid>
                <Grid item>
                  <span style={{ fontSize: "12px" }}>{item.title}</span>
                </Grid>
              </div>
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

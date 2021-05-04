const initialState = {
  users: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        users: [...state.users, action.payload]
      };

    case "DROP":
      return {
        ...state,
        users: state.users.map(box => {
          if (box.id === action.payload.item.id) {
            return { ...box, order: action.payload.currentCard.order };
          }
          if (box.id === action.payload.currentCard.id) {
            return { ...box, order: action.payload.item.order };
          }
          return box;
        })
      };

    // setUsers(
    //   users.map(box => {
    //     if (box.id === item.id) {
    //       return { ...box, order: currentCard.order };
    //     }
    //     if (box.id === currentCard.id) {
    //       return { ...box, order: item.order };
    //     }
    //     return box;
    //   })
    // );

    default:
      return state;
  }
}

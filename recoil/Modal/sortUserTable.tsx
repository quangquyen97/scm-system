import { atom, selector } from "recoil";

const sortState = atom({
  key: "sortState",
  default: {
    type: "ascending",
  },
});

const setSortStateAction = selector({
  key: "setSortStateAction",
  get: ({ get }) => {
    const listSort = get(sortState);
  },
//   set: ({ set, get }, {newType:5,dd:5}: any) => {
//     const listSort = get(sortState);
//     switch (newType) {
//       case "CHANGE_SORT":
//         if (newType.column === action.column) {
//           return {
//             ...state,
//             data: state.data.slice().reverse(),
//             direction:
//               state.direction === "ascending" ? "descending" : "ascending",
//           };
//         }

//         return {
//           column: action.column,
//           data: _.sortBy(state.data, [action.column]),
//           direction: "ascending",
//         };
//       default:
//         throw new Error();
//     }
//   },
});

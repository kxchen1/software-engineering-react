import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";
import {findAllUsers} from "../services/users-service";
import {UserList} from "../components/profile/user-list";

jest.mock('axios');

const MOCKED_USERS = [
  {
    username: "alice",
    password: "123",
    email: "alice@alice.com",
    _id: "123",
  },
  {
    username: "bob",
    password: "234",
    email: "bob@bob.com",
    _id: "234",
  },
  {
    username: "charlie",
    password: "345",
    email: "charlie@charlie.com",
    _id: "345",
  },
];

const MOCKED_TUITS = [
  {
    _id: "456",
    postedBy: MOCKED_USERS[0],
    tuit: "alice's tuit",
  },
  {
    _id: "567",
    postedBy: MOCKED_USERS[1],
    tuit: "bob's tuit",
  },
  {
    _id: "678",
    postedBy: MOCKED_USERS[2],
    tuit: "charlie's tuit",
  },
];

test('tuit list renders static tuit array', () => {
  // TODO: implement this
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS} />
      </HashRouter>
  );
  const linkElement = screen.getByText(/alice's tuit/i);
  expect(linkElement).toBeInTheDocument();
});



test('tuit list renders mocked', async () => {
  // TODO: implement this
  axios.get.mockImplementation(() =>
      Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>);

  const tuit = screen.getByText(/bob's tuit/i);
  expect(tuit).toBeInTheDocument();
});

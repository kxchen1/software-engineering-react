import {findAllTuits} from "../services/tuits-service";
import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";

test('tuit list renders async', async () => {
    // TODO: implement this
    const tuits = await findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits = {tuits}/>
        </HashRouter>
    );
    const linkElement = screen.getByText(/user1's tuit/i);
    expect(linkElement).toBeInTheDocument();
})
import React from "react";
import {api} from "../services/dislikes-service";
import {render, screen, waitFor} from "@testing-library/react";
import MyDislikes from "../components/profile/my-dislikes";
import {HashRouter} from "react-router-dom";


const dislikesTuits = [
    {
        tuit: "tuit 1",
        postedBy: {
            username: "1",
            password: "1",
            email: "1@test.com",
            _id: "1"
        },
        stats: {dislikes: 100},
        _id: "1111"
    },
    {
        tuit: "tuit 2",
        postedBy: {
            username: "2",
            password: "2",
            email: "2@test.com",
            _id: "2"
        },
        stats: {dislikes: 200},
        likedByMe: true,
        _id: "2222"
    },
    {
        tuit: "tuit 3",
        postedBy: {
            username: "3",
            password: "3",
            email: "3@test.com",
            _id: "3"
        },
        stats: {dislikes: 300},
        likedByMe: true,
        _id: "3333"
    }
];

describe('render dislike screen', () => {
    const mock = jest.spyOn(api, 'get');

    afterEach(()=> {
        mock.mockRestore();
    })

    test('render dislike screen', async () => {
        mock.mockImplementation(() => {
            return  Promise.resolve({data: dislikesTuits});
        });

        render(
            <HashRouter>
                <MyDislikes/>
            </HashRouter>
        )

        await waitFor(() => {
            dislikesTuits.map(testTuit => {
                let username = testTuit.postedBy.username
                const count = testTuit.stats.dislikes
                const name =  screen.getAllByText(username, {exact: false});
                const tuit =  screen.getAllByText(testTuit.tuit, {exact: false});
                name.forEach(e => expect(e).toBeInTheDocument());
                tuit.forEach(e => expect(e).toBeInTheDocument());
                expect(screen.getByText(count)).toBeInTheDocument();
            })
        })
    })
});
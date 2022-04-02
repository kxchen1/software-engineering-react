import React from "react";
import TuitStats from "../components/tuits/tuit-stats";
import renderer, {act, create} from 'react-test-renderer';

test("render dislikes button", () => {

    let stats = {replies:100 ,retuits:100, likes: 100, dislikes: 100};


    let tuitStats
    act(() => {
        tuitStats = create(
            <TuitStats
                tuit={{stats: stats}}/>
        );
    })

    const root = tuitStats.root;
    const dislikesCounter = root.findByProps({className: 'ttr-dislikes'});
    let dislikesText = dislikesCounter.children[0];
    expect(dislikesText).toBe('100')

});

test("add dislikes number", () => {

    let stats = {replies:100 ,retuits:100, likes: 100, dislikes: 100};

    const addDislike = () => {
        act(()=> {
            stats.dislikes ++;
            tuitStats.update(
                <TuitStats tuit={{stats: stats}}
                dislikeTuit={() => {}} />
            )
        })
    }

    let tuitStats
    act(() => {
        tuitStats = create(
            <TuitStats
                dislikeTuit={addDislike}
                tuit={{stats: stats}}/>
        );
    })

    const root = tuitStats.root;
    const dislikeCounter = root.findByProps({className: 'ttr-dislikes'});
    const dislikeButton = root.findByProps({className:'ttr-dislikes-click'});

    let dislikesText = dislikeCounter.children[0];
    expect(dislikesText).toBe('100');

    act(()=>{
        dislikeButton.props.onClick()
    })

    dislikesText = dislikeCounter.children[0];
    expect(dislikesText).toBe('101');

});

test("decrease dislikes number", () => {

    let stats = {replies:100 ,retuits:100, likes: 100, dislikes: 100};

    const decreaseDislike = () => {
        act(()=> {
            stats.dislikes --;
            tuitStats.update(
                <TuitStats tuit={{stats: stats}}
                           dislikeTuit={() => {}} />
            )
        })
    }

    let tuitStats
    act(() => {
        tuitStats = create(
            <TuitStats
                dislikeTuit={decreaseDislike}
                tuit={{stats: stats}}/>
        );
    })

    const root = tuitStats.root;
    const dislikeCounter = root.findByProps({className: 'ttr-dislikes'});
    const dislikeButton = root.findByProps({className:'ttr-dislikes-click'});

    let dislikesText = dislikeCounter.children[0];
    expect(dislikesText).toBe('100');

    act(()=>{
        dislikeButton.props.onClick()
    })

    dislikesText = dislikeCounter.children[0];
    expect(dislikesText).toBe('99');

});

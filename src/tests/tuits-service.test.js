import {createUser, deleteUsersByUsername, findAllUsers, findUserById} from "../services/users-service";
import {createTuit, deleteTuit, findAllTuits, findTuitById} from "../services/tuits-service";


describe('can create tuit with REST API', () => {
    // TODO: implement this
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    const ripleyTuit = {
        tuit: 'ripley tuit'
    }

    // setup test before running test
    beforeAll(() => {
        // remove any/all users to make sure we create it in the test
        return deleteUsersByUsername(ripley.username);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteUsersByUsername(ripley.username);
    })

    test('can create tuit with REST API', async () => {
        // insert new user in the database
        const newUser = await createUser(ripley);
        const newTuit = await createTuit(newUser._id, ripleyTuit);

        expect(newTuit.tuit).toEqual(ripleyTuit.tuit);
        const status = await deleteTuit(newTuit._id);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });

});

describe('can delete tuit wtih REST API', () => {
    // TODO: implement this
    const sowell = {
        username: 'thommas_sowell',
        password: 'compromise',
        email: 'compromise@solutions.com'
    };

    const sowellTuit = {
        tuit: 'sowell tuit'
    };

    // setup the tests before verification
    beforeAll(() => {
        // insert the sample user we then try to remove
        return createUser(sowell);
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteUsersByUsername(sowell.username);
    })

    test('can delete tuit from REST API by username', async () => {
        const newUser = await createUser(sowell);
        const newTuit = await createTuit(newUser._id, sowellTuit);

        expect(newTuit.tuit).toEqual(sowellTuit.tuit);
        const status = await deleteTuit(newTuit._id);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    // TODO: implement this
    const adam = {
        username: 'adam_smith',
        password: 'not0sum',
        email: 'wealth@nations.com'
    };

    const adamTuit = {
        tuit: 'adam tuit'
    };

    // setup before running test
    beforeAll(() => {
        // clean up before the test making sure the user doesn't already exist
        return deleteUsersByUsername(adam.username)
    });

    // clean up after ourselves
    afterAll(() => {
        // remove any data we inserted
        return deleteUsersByUsername(adam.username);
    });

    test('can retrieve tuit from REST API by primary key', async () => {
        // insert the user in the database
        const newUser = await createUser(adam);
        const newTuit = await createTuit(newUser._id, adamTuit);

        // retrieve the tuit from the database by its primary key
        const existingTuit = await findTuitById(newTuit._id);

        // verify retrieved user matches parameter user
        expect(existingTuit.tuit).toEqual(adamTuit.tuit);
        const status = await deleteTuit(newTuit._id);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve all tuits with REST API', () => {
    // TODO: implement this
    const adams = {
        username: 'adam_smith',
        password: 'not0sum',
        email: 'wealth@nations.com'
    };

    const adamsTuits = ["adams 1", "adams 2", "adams 3"];

    const adamasTuit1 = {
        tuit: 'adams 1'
    };

    const adamasTuit2 = {
        tuit: 'adams 2'
    };

    const adamasTuit3 = {
        tuit: 'adams 3'
    };


    beforeAll(() => {
        // clean up before the test making sure the user doesn't already exist
        return deleteUsersByUsername(adams.username)
    });

    // clean up after ourselves
    afterAll(() => {
        // remove any data we inserted
        return deleteUsersByUsername(adams.username);
    });


    test('can retrieve all tuits from REST API', async () => {
        // retrieve all the users
        const newUser = await createUser(adams);
        const newTuit1 = await createTuit(newUser._id, adamasTuit1);
        const newTuit2 = await createTuit(newUser._id, adamasTuit2);
        const newTuit3 = await createTuit(newUser._id, adamasTuit3);

        const tuits = await findAllTuits();

        // let's check each user we inserted
        const tuitsWeInserted = tuits.filter(
            tuit => adamsTuits.indexOf(tuit.tuit) >= 0);

        // compare the actual users in database with the ones we sent
        tuitsWeInserted.forEach(tuit => {
            const tuitData = adamsTuits.find(tuitData => tuitData === tuit.tuit);
            expect(tuit.tuit).toEqual(tuitData);
        });

        const status1 = await deleteTuit(newTuit1._id);
        const status2 = await deleteTuit(newTuit2._id);
        const status3 = await deleteTuit(newTuit3._id);
    });
});
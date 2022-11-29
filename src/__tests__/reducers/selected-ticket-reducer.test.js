import selectedTicketReducer from "../../reducers/selected-ticket-reducer";

describe("selectedTicketReducer", () => {

	const mainTicketList = {
		1: {
			names: "Sherry and Peppy",
			location: "Beantown",
			issue: "Can't find my pants",
			id: 1
		}, 2: {
			names: "Hansel and Gretel",
			location: "CandyLand",
			issue: "I want baked goods and/or sweets",
			id: 2
		}
	}
	test('Should return default state if no action is specified', () => {
		expect(selectedTicketReducer(null, {type: null})).toEqual(null);
	});

	test('Should display specific ticket when queried with respective id', () => {
    let action = { 
      type: 'FIND_BY_ID',
      id: 2
    };
		expect(selectedTicketReducer(mainTicketList, action)).toEqual({
			names: "Hansel and Gretel",
			location: "CandyLand",
			issue: "I want baked goods and/or sweets",
			id: 2
		})
	})
})
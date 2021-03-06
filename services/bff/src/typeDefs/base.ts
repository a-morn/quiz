export default `
	interface MutationResponse {
		code: String!
		success: Boolean!
		message: String!
	}

	interface SubscriptionPayload {
		"Create/Delete/Update"
		mutation: String!
	}

	type Level {
		_id: ID!
		name: String!
		completed: Boolean!
	}

	type Question {
		_id: ID!
		type: String!
		alternatives: [QuestionAlternative!]
		text: String!
		src: String
		lqip: String
		tones: [String]
		answerIds: [ID]
		hasMultipleCorrectAnswers: Boolean!
		answered: Boolean!
		levelId: String
	} 

	type QuestionAlternative {
		type: String!
		text: String
		src: String
		lqip: String
		_id: ID!
	}

	type Query {
		_empty: String
	}

	type Mutation {
		_empty: String
	}

	type Subscription {
		_empty: String
	}
`

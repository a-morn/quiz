import { v4 as uuid } from "uuid";
import shuffle from "shuffle-array";
import {
  Question,
  QuestionType,
  QuestionEntityType,
  QuestionDirection,
} from "enlighten-common-types";

type GoTHouse = {
  name: string;
  seat: string;
  "coat-of-arms": string;
  region: string;
  words: string;
  "lord-asoiaf-start": string;
};

const QUESTION_TYPE: QuestionType<GoTHouse> = {
  NAME: { id: "name", label: "name" },
  SEAT: { id: "seat", label: "seat" },
  COAT_OF_ARMS: { id: "coat-of-arms", label: "coat of arms" },
  REGION: { id: "region", label: "region" },
  WORDS: { id: "words", label: "words" },
  LORD_ASOIAF_START: {
    id: "lord-asoiaf-start",
    label: "lord (298 AC, start of ASoIaF)",
  },
};

const HOUSES: GoTHouse[] = [
  {
    name: "Stark",
    seat: "Winterfell",
    "coat-of-arms": `/game-of-thrones/coat-of-arms/house-stark.png`,
    region: "The North",
    words: "Winter is Coming",
    "lord-asoiaf-start": "Eddard Stark",
  },
  {
    name: "Lanister",
    seat: "Casterly Rock",
    "coat-of-arms": `/game-of-thrones/coat-of-arms/house-lannister.png`,
    region: "Westerlands",
    words: "Hear Me Roar!",
    "lord-asoiaf-start": "Tywin Lannister",
  },
  {
    name: "Arryn",
    seat: "The Eyrie",
    "coat-of-arms": `/game-of-thrones/coat-of-arms/house-arryn.png`,
    region: "The Vale",
    words: "As High as Honor",
    "lord-asoiaf-start": "Robert Arryn",
  },
  {
    name: "Tully",
    seat: "Riverrun",
    "coat-of-arms": `/game-of-thrones/coat-of-arms/house-tully.png`,
    region: "Riverlands",
    words: "Family, Duty, Honor",
    "lord-asoiaf-start": "Hoster Tully",
  },
  {
    name: "Baratheon",
    seat: "Storms's end",
    "coat-of-arms": `/game-of-thrones/coat-of-arms/house-baratheon.png`,
    region: "Stormlands",
    words: "Ours is the fury",
    "lord-asoiaf-start": "Robert I Baratheon",
  },
];

const config = {
  houses: HOUSES.map(({ name }) => name),
  fromTypes: Object.values(QUESTION_TYPE),
  toTypes: Object.values(QUESTION_TYPE),
  maxAlternatives: 3,
};

const fiz = (toTypeId: string) => {
  switch (toTypeId) {
    case "name":
    case "seat":
    case "region":
    case "words":
    case "coat-of-arms":
      return "What is the";
    case "lord-asoiaf-start":
      return "Who is the";
  }
};

const getQuestionProperties = (
  fromType: QuestionEntityType<GoTHouse> | QuestionEntityType<GoTHouse>[],
  toType: QuestionEntityType<GoTHouse>,
  el: GoTHouse
) => {
  if (Array.isArray(fromType)) {
    throw new Error("No handling for array fromType for got");
  }
  switch (fromType.id) {
    case "name":
    case "seat":
    case "region":
    case "words":
    case "lord-asoiaf-start":
      return {
        type: "text",
        text: `${fiz(toType.id)} __${toType.label}__ of the house with the ${
          fromType.label
        } _${el[fromType.id]}_? `,
      };
    case "coat-of-arms":
      return {
        type: "image",
        text: `What is the __${toType.label}__ of the house with the coat of arms pictured?`,
        src: el["coat-of-arms"],
      };
  }
};

const getAlternative = (toType: QuestionEntityType<GoTHouse>, el: GoTHouse) => {
  switch (toType.id) {
    case "name":
    case "seat":
    case "region":
    case "words":
    case "lord-asoiaf-start":
      return { type: "text", text: el[toType.id] };
    case "coat-of-arms":
      return {
        type: "image",
        src: el["coat-of-arms"],
      };
  }
};

const questions: Question[] = config.fromTypes
  .reduce(
    (acc: QuestionDirection<GoTHouse>[], fromType) =>
      acc.concat(
        config.toTypes
          .filter((toType) => toType !== fromType)
          .map((toType) => ({ fromType, toType }))
      ),
    []
  )
  .reduce(
    (acc: Question[], { fromType, toType }) =>
      acc.concat(
        config.houses
          .map((houseName) => HOUSES.find(({ name }) => houseName === name))
          .filter(function (x: GoTHouse | undefined): x is GoTHouse {
            return x !== undefined;
          })
          .map((el) => ({
            _id: uuid(),
            ...getQuestionProperties(fromType, toType, el),
            alternatives: [el]
              .concat(
                HOUSES.filter(({ name }) => name !== el.name).slice(
                  0,
                  config.maxAlternatives
                )
              )
              .map((el) => ({
                ...getAlternative(toType, el),
                _id: uuid(),
              })),
            category: "game-of-thrones",
          }))
          .map(
            ({ alternatives, ...question }) =>
              ({
                answerId: alternatives[0]._id,
                alternatives: shuffle(alternatives),
                ...question,
              } as Question)
          )
      ),
    []
  );

export default questions;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const typeDefs = graphql_tag_1.default `
  scalar Date

  scalar Time

  scalar DateTime

  scalar Duration

  scalar UtcOffset

  scalar LocalDate

  scalar LocalTime

  scalar LocalEndTime

  scalar EmailAddress

  scalar NegativeFloat

  scalar NegativeInt

  scalar NonEmptyString

  scalar NonNegativeFloat

  scalar NonNegativeInt

  scalar NonPositiveFloat

  scalar NonPositiveInt

  scalar PhoneNumber

  scalar PositiveFloat

  scalar PositiveInt

  scalar PostalCode

  scalar UnsignedFloat

  scalar UnsignedInt

  scalar URL

  scalar ObjectID

  scalar BigInt

  scalar Long

  scalar SafeInt

  scalar UUID

  scalar GUID

  scalar HexColorCode

  scalar HSL

  scalar HSLA

  scalar IPv4

  scalar IPv6

  scalar ISBN

  scalar MAC

  scalar Port

  scalar RGB

  scalar RGBA

  scalar USCurrency

  scalar Currency

  scalar JSON

  scalar JSONObject

  scalar Byte
`;
exports.default = typeDefs;

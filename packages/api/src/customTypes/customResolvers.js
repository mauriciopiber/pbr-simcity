"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_scalars_1 = require("graphql-scalars");
const myResolverMap = {
    ObjectID: graphql_scalars_1.ObjectIDResolver,
    Date: graphql_scalars_1.DateResolver,
    Time: graphql_scalars_1.TimeResolver,
    DateTime: graphql_scalars_1.DateTimeResolver,
    Duration: graphql_scalars_1.DurationResolver,
    UtcOffset: graphql_scalars_1.UtcOffsetResolver,
    LocalDate: graphql_scalars_1.LocalDateResolver,
    LocalTime: graphql_scalars_1.LocalTimeResolver,
    LocalEndTime: graphql_scalars_1.LocalEndTimeResolver,
    NonPositiveInt: graphql_scalars_1.NonPositiveIntResolver,
    PositiveInt: graphql_scalars_1.PositiveIntResolver,
    NonNegativeInt: graphql_scalars_1.NonNegativeIntResolver,
    NegativeInt: graphql_scalars_1.NegativeIntResolver,
    NonPositiveFloat: graphql_scalars_1.NonPositiveFloatResolver,
    PositiveFloat: graphql_scalars_1.PositiveFloatResolver,
    NonNegativeFloat: graphql_scalars_1.NonNegativeFloatResolver,
    NegativeFloat: graphql_scalars_1.NegativeFloatResolver,
    UnsignedFloat: graphql_scalars_1.UnsignedFloatResolver,
    UnsignedInt: graphql_scalars_1.UnsignedIntResolver,
    BigInt: graphql_scalars_1.BigIntResolver,
    Long: graphql_scalars_1.LongResolver,
    SafeInt: graphql_scalars_1.SafeIntResolver,
    EmailAddress: graphql_scalars_1.EmailAddressResolver,
    URL: graphql_scalars_1.URLResolver,
    PhoneNumber: graphql_scalars_1.PhoneNumberResolver,
    PostalCode: graphql_scalars_1.PostalCodeResolver,
    NonEmptyString: graphql_scalars_1.NonEmptyStringResolver,
    UUID: graphql_scalars_1.UUIDResolver,
    GUID: graphql_scalars_1.GUIDResolver,
    HexColorCode: graphql_scalars_1.HexColorCodeResolver,
    HSL: graphql_scalars_1.HSLResolver,
    HSLA: graphql_scalars_1.HSLAResolver,
    RGB: graphql_scalars_1.RGBResolver,
    RGBA: graphql_scalars_1.RGBAResolver,
    IPv4: graphql_scalars_1.IPv4Resolver,
    IPv6: graphql_scalars_1.IPv6Resolver,
    MAC: graphql_scalars_1.MACResolver,
    Port: graphql_scalars_1.PortResolver,
    ISBN: graphql_scalars_1.ISBNResolver,
    USCurrency: graphql_scalars_1.USCurrencyResolver,
    Currency: graphql_scalars_1.CurrencyResolver,
    JSON: graphql_scalars_1.JSONResolver,
    JSONObject: graphql_scalars_1.JSONObjectResolver,
    Byte: graphql_scalars_1.ByteResolver,
};
exports.default = myResolverMap;
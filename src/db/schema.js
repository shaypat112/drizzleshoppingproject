"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users2Table = exports.usersTable = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
exports.usersTable = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity(),
    name: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    age: (0, pg_core_1.integer)().notNull(),
    email: (0, pg_core_1.varchar)({ length: 255 }).notNull().unique(),
});
exports.users2Table = (0, pg_core_1.pgTable)("users2", {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity().unique(),
    name: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    age: (0, pg_core_1.integer)().notNull(),
    email: (0, pg_core_1.varchar)({ length: 1 }).notNull().unique(),
});
// thos osi the shcema for the code

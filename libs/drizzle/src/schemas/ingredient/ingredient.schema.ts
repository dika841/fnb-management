import {
  pgTable,
  text,
  uuid,
  integer,
  doublePrecision,
} from 'drizzle-orm/pg-core';
import { baseSchema } from '../base/base.schema';
import { unitTypes } from '../unit/unit-type.schema';
import { users } from '../me/user.schema';
import { relations } from 'drizzle-orm';
import { ingredientLogs } from './ingredient-log.schema';
import { productIngredients } from '../product/product.schema';
import { stockOpnames } from '../stock-opname/stock-opname.schema';

export const ingredients = pgTable('ingredients', {
  name: text('name').notNull(),
  price: doublePrecision('price').notNull(),
  amount: doublePrecision('amount').notNull(),
  unitTypeId: uuid('unit_type_id')
    .notNull()
    .references(() => unitTypes.id),
  createdBy: uuid('created_by').references(() => users.id),
  updatedBy: uuid('updated_by').references(() => users.id),
  ...baseSchema,
});

export const ingredientRelations = relations(ingredients, ({ one, many }) => ({
  ingredientLogs: many(ingredientLogs),
  stockOpnames: many(stockOpnames),
  unitType: one(unitTypes, {
    fields: [ingredients.unitTypeId],
    references: [unitTypes.id],
  }),
  createdBy: one(users, {
    fields: [ingredients.createdBy],
    references: [users.id],
    relationName: 'created_by',
  }),
  updatedBy: one(users, {
    fields: [ingredients.updatedBy],
    references: [users.id],
    relationName: 'updated_by',
  }),
  productIngredients: many(productIngredients),
}));

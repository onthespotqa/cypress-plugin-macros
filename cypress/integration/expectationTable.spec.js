/// <reference types="cypress"/>
const _ = Cypress._
import { expectationTable } from '../../src/expectation'
import { format } from 'date-fns';

describe('defineTable', () => {
 beforeEach(function () {
  cy.fixture('thor').storeAs('thor');
  cy.fixture('cap').storeAs('cap');
  cy.fixture('iron').storeAs('iron');
  cy.fixture('date').storeAs('today');
 });


 it('returns the table passed in if there are no macros', () => {
  let dataTable = [
   ["Name", "Weapon"],
   ["Captain America", "Shield"]
  ]
  expect(expectationTable(dataTable)).to.eql(dataTable)
 })


 it('returns rows with no macros and rows with all macros', () => {
  let dataTable = [
   ["Name", "Weapon"],
   ["{cap.name}", "{cap.weapon}"]
  ]
  let expected = [
   ["Name", "Weapon"],
   ["Captain America", "Shield"]
  ]
  expect(expectationTable(dataTable)).to.eql(expected)
 });

 it('returns multiple rows with macros', () => {
  let dataTable = [
   ["Name", "Weapon"],
   ["{cap.name}", "{cap.weapon}"],
   ["{iron.name}", "{iron.weapon}"]
  ]
  let expected = [
   ["Name", "Weapon"],
   ["Captain America", "Shield"],
   ["Iron Man", "Gauntlet"]
  ]
  expect(expectationTable(dataTable)).to.eql(expected)
 })

 it('returns multiple rows with macros', () => {
  let dataTable = [
   ["Name", "Weapon", "Power Level"],
   ["{cap.name}", "{cap.weapon}", "1"],
   ["{iron.name}", "{iron.weapon}", "3"]
  ]
  let expected = [
   ["Name", "Weapon", "Power Level"],
   ["Captain America", "Shield", "1"],
   ["Iron Man", "Gauntlet", "3"]
  ]
  expect(expectationTable(dataTable)).to.eql(expected)
 })

 it('returns date formats for today', () => {
  const now = new Date()
  let dataTable = [
   ["Short", "Long", "Current Year"],
   ["{today.short}", "{today.long}", "{today.year}"]
  ]
  let expected = [
   ["Short", "Long", "Current Year"],
   ["6/1/19", "06/01/2019", "2019"]
  ]
  expect(expectationTable(dataTable)).to.eql(expected)
 })

 it('returns a mixture of strings and dates', () => {
  let dataTable = [
   ["Name", "Weapon", "Power Level", "Rating Date"],
   ["{cap.name}", "{cap.weapon}", "1", "{today.short}"],
   ["{iron.name}", "{iron.weapon}", "3", "{today.long}"]
  ]
  let expected = [
   ["Name", "Weapon", "Power Level", "Rating Date"],
   ["Captain America", "Shield", "1", "6/1/19"],
   ["Iron Man", "Gauntlet", "3", "06/01/2019"]
  ]
  expect(expectationTable(dataTable)).to.eql(expected)
 })

 it('replaces multiple macros in the string', () => {
  let dataTable = [
   ["What is the Perferred Weapon?"],
   ["{cap.name} perferred is a {cap.weapon}"]
  ]
  let expected = [
   ["What is the Perferred Weapon?"],
   ["Captain America perferred is a Shield"]
  ]
  expect(expectationTable(dataTable)).to.eql(expected)
 })
})
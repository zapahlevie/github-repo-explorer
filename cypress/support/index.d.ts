declare namespace Cypress {
  interface Chainable {
    searchUser(username: string): Chainable<void>;
  }
}

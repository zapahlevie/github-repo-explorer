describe('GitHub Repo Explorer', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('loads homepage', () => {
    cy.get('[data-testid="username-input"]').should('exist');
    cy.get('[data-testid="search-button"]').should('exist');
  });

  it('searches for a user and displays user list', () => {
    cy.searchUser('octocat');
    cy.contains('octocat').should('exist');
  });

  it('shows loading state and disables button when searching', () => {
    cy.searchUser('octocat');
    cy.get('[data-testid="skeleton-user-item"]').should('exist');
    cy.get('[data-testid="search-button"]').should('be.disabled');
  });

  it('shows error state if user search fails', () => {
    cy.intercept('GET', '**/search/users*', { forceNetworkError: true }).as('getUsersError');
    cy.searchUser('erroruser');
    cy.get('[data-testid="search-info"]')
      .should('contain', 'Error loading users')
      .and('have.class', 'text-red-500');
  });

  it('navigates to repo link and shows loading state when loading', () => {
    cy.searchUser('octocat');
    cy.get('[data-testid="user-item"]').contains('octocat').click();
    cy.get('[data-testid="skeleton-repo-item"]').should('exist');
    cy.get('a[data-testid="repo-item"]').should('have.attr', 'href').and('include', 'github.com');
  });
});

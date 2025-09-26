# Project Roadmap

## Phase 1: Core Scraping and Notification MVP
- [X] Develop the scraper for one or two target websites.
- [X] Set up the database schema for properties and user criteria.
- [x] Set up the functionality to store scraped data in the database.
- [X] Build the basic email n@otification system.
- [X] Set up scheduled scraping tasks.
- [X] Add basic logs to the scraper

## Phase 2: Interactive Dashboard
- [ ] Back-end work
    - [X] Refactor db_client file to better assing responsibilities across modules (email_queries, property_queries and real_state_property_queries)
    - [X] Create the API that will be consumed by the frontend.
        - [X] Create GET endpoint to properties (get all, get only favorites)
        - [X] Create PUT endpoint to update search criteria.
        - [X] Create GET endpoint to get search criteria.
        - [X] Create PUT endpoint to favorite and unfavorite a property.
        - [X] Create GET, POST and DELETE endpoints to email list
        - [X] Implement a basic JWT authentication system

- [ ] Front-end work
    - [ ] Create the templates for the base components that will be used in the dashboard.
            - [ ] Side menu for desktop.
            - [ ] Bottom nav-bar for mobile.
            - [ ] Property card visualization.
            - [ ] Property details visualization.
            - [ ] LLM Agent Container.
            - [ ] Search criteria form.
            - [ ] Email listing form.
    - [ ] Create the templates for the screens of the app
            - [ ] Main layout with side menu and bottom nav-bar
            - [ ] A page to see all properties
            - [ ] A page to see 
    - [ ] Integrate the front-end dashboard with the back-end API.

- [ ] Implement a basic JWT authentication system
    - [ ] Store the password in the env file of the back-end
    - [ ] Create the authentication endpoint
    - [ ] Create the front-end page to authenticate
    - [ ] Block all endpoints to be accessed without authentication

## Phase 3: AI Analysis Integration
- [ ] Integrate with an LLM API.
- [ ] Develop the prompts to generate property analysis.
- [ ] Display the AI-generated insights on the property details page in the dashboard.
- [ ] Cache AI results to minimize API costs.

## Phase 4: Scaling and Refinement
- [ ] Add support for more real estate websites.
- [ ] Improve the scraper's resilience against anti-bot measures.
- [ ] Refine the UI/UX based on user feedback.
- [ ] (Optional) Introduce premium features or different subscription tiers.

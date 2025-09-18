# Project Architecture & Database Design

This document outlines the system architecture and data model for the Intelligent Real Estate Finder project.

---

## 1. System Architecture

The application is designed with a decoupled architecture, separating the user-facing components (Frontend, API) from the background data processing services (Scrapers, Notifiers). This ensures scalability and maintainability.

### 1.1. Architecture Diagram

```mermaid
graph TD
    subgraph User Interaction
        U[User's Browser] -- Manages criteria & views properties --> FE([Angular Frontend]);
    end

    subgraph API Layer
        FE -- REST/GraphQL API Calls --> API[Backend API];
        API -- SQL Queries --> DB[(Turso Database)];
    end

    subgraph Background Services
        Sched(Scheduler <br> Every 5 mins) --> Worker[Scraper & Notifier];
        Worker -- Reads criteria & emails --> DB;
        Worker -- Scrapes data --> RWS[Real Estate Websites];
        Worker -- Checks for new properties & inserts --> DB;
        Worker -- Sends notifications --> Mail(Email Service);
    end

    style Sched fill:#f9f,stroke:#333,stroke-width:2px
    style Worker fill:#ccf,stroke:#333,stroke-width:2px
```

# 1.2. Component Breakdown

## Frontend (Angular)
A single-page application (SPA) that provides the user interface. Its responsibilities are:

- Displaying the found real estate properties in an interactive dashboard.
- Allowing the user to manage the `search_criteria` table (add, edit, delete search profiles).
- Allowing the user to manage the `email_list` table.
- It communicates exclusively with the Backend API.

## Backend API
A server-side application that acts as the bridge between the frontend and the database.

- Provides CRUD (Create, Read, Update, Delete) endpoints for `search_criteria` and `email_list`.
- Provides an endpoint to read properties from the database for display on the dashboard.
- Handles authentication and authorization (if implemented in the future).
- Connects directly to the Turso Database to execute SQL queries.

## Background Worker (Scraper & Notifier)
A standalone service or a set of scripts that run independently from the user-facing application.

- **Scheduler:** Triggered every 5 minutes by a cron job or a similar scheduling mechanism.
- **Scraper:** Fetches data from target real estate websites. It reads the active search criteria from the database to perform the searches.
- **Notifier:** When a new property that matches the criteria is found, this component is responsible for sending a notification email to all addresses in the `email_list`.

## Database (Turso DB)
A distributed SQLite database (using libSQL) that acts as the single source of truth for the application.  
It stores all persistent data.

---

# 2. Core Workflow (Scraping & Notification)

The background process follows a clear, scheduled cycle:

1. **Trigger:** The scheduler executes the worker script every 5 minutes.  
2. **Fetch Criteria:** The worker connects to Turso DB and reads all entries from the `search_criteria` and `email_list` tables.  
3. **Scrape Websites:** The worker visits the target real estate websites and performs searches based on the fetched criteria.  
4. **Process Properties:** For each property found on a website:  
   a. It extracts key details (price, location, etc.) and a unique identifier from the source (e.g., the listing ID).  
   b. It checks the `real_state_property` table in Turso DB to see if a record with the same source website and source ID already exists.  
5. **Match & Act:** If the property does not exist in the database and matches the user's criteria:  
   a. **Insert:** The worker inserts the new property's details into the `real_state_property` table.  
   b. **Notify:** The worker sends a notification email to every email address stored in the `email_list` table.  
6. **Sleep:** The worker finishes its execution and waits for the next trigger from the scheduler.

---

# 3. Database Relational Model

The database is designed to be simple and efficient for the project's core needs.

## 3.1. Entity-Relationship Diagram

**Note:** To ensure properties are unique, the columns `source_id` and `source_website` have been added to the `real_state_property` table. Together, they will act as a unique key.

```mermaid
erDiagram
    real_state_property {
        INTEGER id PK "Auto-incrementing primary key"
        VARCHAR source_id "Unique ID from the source website"
        VARCHAR source_website "Domain of the source website (e.g., zillow.com)"
        DECIMAL price "Property price"
        VARCHAR city
        VARCHAR neighbourhood
        INTEGER number_of_rooms
        INTEGER number_of_parking_spaces
        VARCHAR photo_url "URL of the main photo"
        VARCHAR access_link "URL to the original listing"
        DATETIME created_at "Timestamp of when the record was inserted"
    }

    search_criteria {
        INTEGER id PK "Auto-incrementing primary key"
        VARCHAR city
        VARCHAR neighbourhood
        DECIMAL min_price
        DECIMAL max_price
        INTEGER min_number_of_rooms
        INTEGER max_number_of_rooms
        INTEGER min_number_of_parking_spaces
        INTEGER max_number_of_parking_spaces
    }

    email_list {
        VARCHAR email PK "User's email address"
    }
```

## 3.2. Table Schema Details

### real_state_property
Stores the details of each unique property found by the scraper.

| Column                    | Data Type      | Constraints                   | Description                                         |
|---------------------------|----------------|--------------------------------|-----------------------------------------------------|
| id                        | INTEGER        | PRIMARY KEY                   | Unique identifier for the record.                   |
| source_id                 | VARCHAR(255)   | NOT NULL                      | The property ID from the original website.          |
| source_website            | VARCHAR(255)   | NOT NULL                      | The domain of the website (e.g., quintoandar.com.br).|
| price                     | DECIMAL(12, 2) | NOT NULL                      | The listed price of the property.                   |
| city                      | VARCHAR(255)   | NOT NULL                      | City where the property is located.                 |
| neighbourhood             | VARCHAR(255)   | NOT NULL                      | Neighbourhood where the property is located.        |
| number_of_rooms           | INTEGER        |                                | Number of bedrooms/rooms.                           |
| number_of_parking_spaces  | INTEGER        |                                | Number of parking spaces available.                 |
| photo_url                 | VARCHAR(2048)  |                                | A direct URL to a photo of the property.            |
| access_link               | VARCHAR(2048)  | NOT NULL                      | A direct URL to the property listing page.          |
| created_at                | DATETIME       |                                | Timestamp when the property was added.              |

**Constraint:**  
`UNIQUE(source_id, source_website)` → Ensures no duplicate properties are inserted.

---

### search_criteria
Stores the search profiles used by the scraper. For this simple model, it can hold one or more distinct search configurations.

| Column                      | Data Type      | Constraints   | Description                        |
|-----------------------------|----------------|---------------|------------------------------------|
| id                          | INTEGER        | PRIMARY KEY   | Unique identifier for the search profile. |
| city                        | VARCHAR(255)   |               | Target city for the search.        |
| neighbourhood               | VARCHAR(255)   |               | Target neighbourhood for the search. |
| min_price                   | DECIMAL(12, 2) |               | Minimum desired price.              |
| max_price                   | DECIMAL(12, 2) |               | Maximum desired price.              |
| min_number_of_rooms         | INTEGER        |               | Minimum number of rooms.            |
| max_number_of_rooms         | INTEGER        |               | Maximum number of rooms.            |
| min_number_of_parking_spaces| INTEGER        |               | Minimum number of parking spaces.   |
| max_number_of_parking_spaces| INTEGER        |               | Maximum number of parking spaces.   |

---

### email_list
A simple table to hold all email addresses that should receive notifications.

| Column | Data Type    | Constraints   | Description                    |
|--------|--------------|---------------|--------------------------------|
| email  | VARCHAR(255) | PRIMARY KEY   | The email address to be notified. |

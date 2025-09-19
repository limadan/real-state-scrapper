# Real Estate Scraper & AI-Powered Analyzer

## 1. Overview
This project is an intelligent real estate scraping tool designed to automate the search for properties based on user-defined criteria. The system will send a weekly email digest summarizing all new properties that match the user's search.

Furthermore, all discovered properties will be aggregated and displayed on an interactive dashboard. This dashboard will not only allow users to track their findings but will also feature an AI-powered analysis to provide deeper insights into each property, such as market value comparison, investment potential, and neighborhood analysis.

## 2. Problem Statement
The process of searching for a new property to rent or buy is often tedious, repetitive, and time-consuming. Users have to manually check multiple websites daily, apply the same filters, and keep track of interesting listings, many of which are quickly taken off the market. It is also challenging for non-experts to accurately assess the true value and potential of a property based solely on its listing.

This tool aims to solve these problems by:
- Automating the repetitive search process.
- Providing regular, consolidated notifications so users can review new properties at their convenience.
- Centralizing all findings in a single, easy-to-use interface.
- Offering data-driven insights through AI to empower users to make better-informed decisions.

## 3. Core Features
### 3.1. User-Defined Search Criteria

The user will be able to configure and save his specific criteria, including but not limited to:
- Location: Neighborhood, city, or zip code.
- Price Range: Minimum and maximum cost (for rent or purchase).
- Property Type: Apartment, house, condo, etc.
- Number of Bedrooms & Bathrooms.
- Amenities: Parking, pet-friendly, swimming pool, etc.
- Target Websites: A selection of real estate portals to be scraped.

### 3.2. Web Scraping Engine
A robust and scalable scraping module responsible for:
- Periodically fetching data from the target real estate websites.
- Parsing HTML to extract relevant property information (price, address, features, photos, description).
- Handling anti-scraping mechanisms like CAPTCHAs and dynamic JavaScript-loaded content.
- Storing the structured data into a centralized database.

### 3.3. Weekly Email Notification System
The system will send a weekly summary email to users.
This email will contain a digest of all new properties found during the week that match their saved criteria, with key details and direct links to the original listings.

### 3.4. Interactive Dashboard

A user-friendly web interface where users can:
- **View all matched properties:** Displayed in a card or list format, with key information and images.
- **Filter and Sort:** Easily filter the found properties by price, date found, location, etc.
- **Visualize on a Map:** Plot all properties on an interactive map to understand their geographical distribution.
- **Manage Search:** Create, edit, or delete their search criteria.
- **Mark Favorites:** Users can "favorite" or "discard" properties to keep their dashboard organized.

## 3.5. AI-Powered Property Analysis

For each property found, the system will leverage an AI model (e.g., a Large Language Model - LLM) to generate a concise analysis. This analysis will appear on the dashboard and could include:

- Price Analysis: Compare the listing price with the average for the area, considering its features. Is it a good deal?
- Summary of Highlights: Extract the best features from the property's description (e.g., "recently renovated," "great natural light," "quiet street").
- Potential Red Flags: Identify potential issues mentioned in the description (e.g., "needs repairs," "low-floor apartment," "shared laundry").

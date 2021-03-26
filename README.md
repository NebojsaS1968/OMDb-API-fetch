# OMDb-API-fetch

Full stack app that fetches data from external public [OMDb API](http://www.omdbapi.com).

## Table of contents

- [Description](#description)
- [Example](#example)
- [Technologies](#technologies)
- [Setup](#setup)

## Description

- Enables the users on client side to search for any movie in the OMDb database
- It displays basic data about the film upon serach (title, imdb grade, number of reviews, poster, ...) and styles it
- Provides IMDb link to any movie that is searched
- Supports autocomplete functionality (only for films that are in IMDb top 250 list)

## Example

![Example](./images/example.png)

## Technologies

- Node.js (Express)
- node-fetch
- Pug (Jade) template engine
- CSS

## Setup

To run the development server (nodemon):

```
$npm run dev
```

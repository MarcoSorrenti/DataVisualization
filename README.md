# [Netflix Analytics and Data Visualization](https://marcosorrenti.github.io/DataVisualization/)

Data Visualization project for the Scientific and Large Data Visualization exam, at the University of Pisa (2021/2022).

The website contains different data visualization made with [D3js](https://d3js.org/) and [matplotlib](https://matplotlib.org/) which allows to have an overview of the Netflix Dataset available on [Kaggle](https://www.kaggle.com/datasets/shivamb/netflix-shows).

Live demo available [here](https://marcosorrenti.github.io/DataVisualization/).


# Data
Every single information used for this analysis and visualization have been provided by [Kaggle](https://www.kaggle.com/datasets/shivamb/netflix-shows). This dataset is made up by 8807 entries with 12 features each:
- `show_id`: Netflix ID of the media.
- `type`: Movie or TV Show.
- `title`: Title of the media.
- `director`: Director of the media.
- `cast`: Cast of the media.
- `country`: Country in which the movie was made.
- `date_added`: Date in which the media was added.
- `release_year`: Year in which the media was released.
- `rating`: Age rating of the media.
- `duration`: Duration of the media.
- `listen_in`: Classification given by Netflix.
- `description`: A short description of the media.

There are 6 features with missing values. However, since 3 of this have more than 9% of missing values I decided to handle them. The others records with missing values have been dropped. For more information on data preparation, please visit this [notebook](https://github.com/MarcoSorrenti/DataVisualization/blob/master/netflix_analysis/src/data/data_preparation.ipynb).


# How to use
If you want to run this project locally, first of all you have to install [Node.js](https://nodejs.org/en/).
Now you can clone this repository:
```
git clone https://github.com/MarcoSorrenti/DataVisualization.git
```
Run the project:
```
npm start
```

### Overview
![gif](https://github.com/MarcoSorrenti/DataVisualization/blob/master/src/Dashboard/Components/data/overview.gif?raw=true)

## Project built with
![Jupyter Notebook](https://img.shields.io/badge/jupyter-%23FA0F00.svg?style=for-the-badge&logo=jupyter&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
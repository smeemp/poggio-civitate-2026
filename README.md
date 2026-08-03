# Hello! Welcome to my repo :-)
This is a repository of all my coding projects from my time at the Poggio Civitate Archaeological Project 2026! It contains five projects made over the course of five weeks, most of which were data science programs requested by staff for a specified purpose. 

# Content Descriptions

**Projects:**
1. *Incorrect Locus Bounds Lister*

2. *Improving Custom Search Website*

3. *Locus Coordinate Converter*

4. *Object Finder Images and Map*

5. *URI Population*

## 1. Incorrect Locus Bounds Lister

> *(aka [for auto matic wrong locatin detection](https://github.com/smeemp/poggio-civitate-2026/tree/4f97bc592f6048dff1168cbee267abaea2045dea/for%20auto%20matic%20wrong%20locatin%20detection))*

**Languages:** Python (Jupyter)

**Summary:** Uses an Open Context API to list trenches whose locus corner points are likely incorrectly located.

This project collects every trench locus that is likely to have at least one incorrect coordinate point, utilizing an API provided by *[Open Context](https://opencontext.org). It gathers relevant information on each outlier from their OpenContext data: 

- The locus entry's PC number
- URL
- Longitude
- Latitude
- Which is an outlier (longitude, latitude, or both)

Each of these is added to a list, then exported as a .json.

## 2. Improving Custom Search Website

> *(aka [for improving search on .net](https://github.com/smeemp/poggio-civitate-2026/tree/4f97bc592f6048dff1168cbee267abaea2045dea/for%20auto%20matic%20wrong%20locatin%20detection))*

**Languages:** HTML, JavaScript, CSS

**Summary:** Makes improvements to a previous student's website, consisting of updating search options and user experience, as well as improving code readability and modularity.

A previous student of the program made a website for [poggiocivitate.net](https://poggiocivitate.net/) (a collection of student- and faculty-created websites) to construct a filtered search in OpenContext without having to go on the database. I added several features to make the search more efficient, modular, and expandable, as well as to improve user experience:

- A text box displaying the search path you have constructed, updating automatically when a change is detected
- The ability to go further than two choices deep (required refactoring a lot of the JavaScript)
- Functions for repeated code, or code that had the potential to be repeated should the website be expanded
- Thorough comments and function annotations for all custom functions (mostly in JS)
- Making the style consistent with language-specific guidelines (overall improving readability)
- Visual hover effects for sub-filters
- Clear button also clears selection for all dropdowns, so no choices will linger and disallow repeated selection
- Modifying the code to follow better coding practices

My work will be uploaded to the [Github](https://github.com/CalebUmass/static-web-showing) repo for the website. Most website functionality is their work, I just helped improve it!

## 3. Locus Coordinate Converter

> *(aka [for json info on incorrect coord loci](https://github.com/smeemp/poggio-civitate-2026/blob/4f97bc592f6048dff1168cbee267abaea2045dea/for%20json%20info%20on%20incorrect%20coord%20loci/locus_info.ipynb))*

**Languages:** Python (Jupyter)

**Summary:** Lists user-inputted locus corner points as a .json.

This is a hastily put together program that allows you to enter the coordinates (longitude and latitude) and converted coordinates (WGS 84) of locus corner points to compile into a .json. You can enter as many corners as necessary (to accommodate many trench shapes). Coordinated should be entered clockwise beginning in the northwest corner.

It kind of sucks! I did it quickly, and in the future I would add a built-in coordinate converter so you don't have convert them yourself. Not my best work, but work nonetheless.

## 4. Object Finder Images and Map
> *(aka [for nuking the api again](https://github.com/smeemp/poggio-civitate-2026/tree/4f97bc592f6048dff1168cbee267abaea2045dea/for%20nuking%20the%20api%20again))*

**Languages:** Python (Jupyter), HTML, JavaScript, CSS, Google Apps Script

**Summary:** Adds object image links to internal inventory spreadsheets, and modifies a website to display these images and a map of our inventory.

This was the project I spent the longest amount of time on, as it encompassed many different kinds of programming (data science, web dev, UI/UX, etc). It was very difficult, but very rewarding to finish!

The general gist: My professor made a [website](https://poggiocivitate.net/mag-search/) which, given an object's identifying number (a.k.a. PC number), tells you where in our storage it is (which shelf and box). The website queries the Google Sheets API to update the information. My task was to add the capability to display an image of an object when it is searched, as well as display a map of each of our shelves in case the person is unfamiliar with our storage layout.

### Python: Object URLs --> Image Links
Using a Jupyter notebook, the program iterates through a given list of Excel spreadsheets (downloaded from the Poggio Drive), each of which contains objects' PC numbers, physical locations, and OpenContext URLs. All of this information is then condensed into a single pandas DataFrame, which is iterated through and populated with corresponding image links (which are retrieved using the .json API provided by OpenContext). The resulting CSV is later converted to a Google Sheet and used to construct a map for populating the original sheets in Drive (see the Apps Script section).

### HTML & CSS: Updating the Website

After this program was finished, I went to the website's code and added a box for the object's image to appear, along with four placeholder images ([Imgur](https://imgur.com/a/mrJDdik)) – drawn by me in Procreate – that would appear should an object have no image or a broken image link. I also implemented the JavaScript logic to accommodate the image displaying/fallbacks (with much help from my professor!), and also updated the HTML and CSS.

In addition to the object images, I added a map – also drawn by me! – called the Mag Map ([Imgur](https://imgur.com/a/TbSVbzm)), which is a top-down map representing the location of each numbered storage shelf. I put a button with the other buttons that appear in output that will toggle the visibility of the map. I also added a lighter frame around it for easier reading. The map and its frame get resized with the screen, so it's always legible!

### Apps Script: Populating Original Sheets
After the website was updated to support images, it became a question of updating the spreadsheets to include images for every inventory object. This way, the website would be able to display the correct images as links were updated, added, or removed by catalogers. Originally, my plan was to replace the sheets with my own, but this would come at the cost of comments, formatting, and recent changes that were important not to overwrite. Instead, I made a script using Google's Apps Script which does the following:

- Reads the data from a spreadsheet of objects' PC numbers and their corresponding image URLs (result from my Python code)
- Creates a map with the PC numbers as keys and the URLs as values
- Adds a column at the 3rd position for image links in every sheet of every spreadsheet
- For every row's PC number, sets the image link to the corresponding value from the map

The program was later rewritten by my professor, but the core functionality was based on my code!

## 5. URI Population
> *(aka [for populating uid in spreadsheet](https://github.com/smeemp/poggio-civitate-2026/tree/9d8d1daaae9758f2262933e2681785b613a80ec2/for%20populating%20uid%20in%20spreadsheet))*

**Languages:** Python (Jupyter)

**Summary:** Adds database links to trench representations for QGIS.

We have a QGIS project for creating maps of many aspects of the Poggio Civitate site, including trench locations and bounds. These trenches are represented as geometric shapes on the map, and contain much of the data about them (that would be available on Open Context) as attributes. This data didn't include their Open Context URIs, however, so my task was to populate the spreadsheet containing all of the trenches' QGIS data with their links.

This was my process:

- Import the QGIS CSV data as a pandas DataFrame
- Import a second CSV containing all trench entries and their information, including their URIs (which I downloaded from Open Context)
- Parse the OC sheet's location (Context) data to match the format of the QGIS sheet (abbreviated names)
- Match the location and year, then populate until a new trench is reached

It was fairly efficient and accurate, and while some data wasn't able to be matched due to inconsistencies, it was few enough that I fixed it by hand afterward.

# Usage
You probably do not need to use any of this!!! Probably don't!! But if you are a CS/data science person/whatever from Poggio and you need one of my programs for some reason/want to use pieces of it just download it! I annotate (fairly) well so everything should be understandable(ish), but if you have any questions feel free to email me at ejblalock17@gmail.com. :)

# Acknowledgements
THANK YOU SO MUCH TO MY PROFESSOR COLE ADAM REILLY! I wouldn't have been able to complete a lot of these projects without them, let alone know this program even existed!

Thank you to my fellow student Flint who listened to me/tolerated me losing my mind when my stuff didn't work (many times)! And also helped me see when I was being a big stupid!

Thank you to the 5 billion Stack Overflow/Reddit pages that answered my incredibly specific niche questions.... Some of them are credited in the comments of my code but I used so unfathomably many I couldn't possibly list them all......

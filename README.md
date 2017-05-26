# Bloomingdale's Product Selection Demo
*A code challenge for Bloomingdales*

## About
This is a product details page. The user has selected a dress to buy, which launches a page with the following details:

1. Product Image
2. Size
3. Color
4. Quantity
5. Price (2 Levels - original and sale prices with labels and different price values)

After selecting attributes, the customer enters a shipping address. Then the user clicks a finish button to show the summary of the selected data.

## Tech
  * Backbone.js
  * jQuery
  * Bootstrap
  * SCSS
  * Jasmine Karma

## UI Design Choices
For a selection method, I decided to stick with radio buttons for two reasons:
1. A user can see all selection options as soon as the page loads.
2. Because a user can see all selection options, there is a shorter user experience between deciding what they want and making a purchase.

For buttons, I looked at product selection pages on Bloomingdales.com and noticed the website uses black "Add to Brown Bag" buttons as well as a white "Add to Wish List" buttons.

Following this color scheme, I chose to emphasize the button choices that move the user "forward," in terms of getting closer to making a purchase, by making their background colors black, while buttons that allow user to edit information are rendered white.

I added inverse animations to each type of button so that upon hovering over white buttons the background color will darken, while black button backgrounds will lighten.

## What I'm proud of
Some of the features that were most challenging about this project are actually what I enjoyed the most. For instance, my goal was to write code that could be reusable for any product model on sale. Creating the logic of how to have different color choices point to image urls and then access those values based on user interactions took me a while to figure out, especially given that different products could have a different number of color options or sizes.

With my first foray into programming with Backbone.js, I'm proud of creating reusable code that could in theory be used to handle a large collection of product data.

## What I'd improve
One thing I'd like to work with are how my radio buttons are rendered. I like how on Bloomingdales.com the selection options for colors offer swatches, and while I've done some research on how to manipulate radio inputs, I'd want to study how to truly customize them. I'd also take more time to write tests for each functionality of my project--though this was my first experience with Jasmine, it works similarly to RSPEC, and I enjoyed how it straightforward it was to install and begin working. 

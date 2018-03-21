/*eslint-disable*/
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Second Test - loop through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* Third Test - loop through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    /* A new test suite named "The menu" */
    describe('The menu', function() {

        let bodyElement = document.querySelector('body');
        let menuIconElement = document.querySelector('.menu-icon-link');

        /* Forth Test - ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect(bodyElement.className).toContain('menu-hidden');
        });

         /* Fifth Test - ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when the menu icon is clicked', function() {
            menuIconElement.click();
            expect(bodyElement.className).not.toContain('menu-hidden');
            menuIconElement.click();
            expect(bodyElement.className).toContain('menu-hidden');
        });
    });

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* Sixth Test - A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        let feedContainerElement = document.querySelector('.feed');

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('contains at least a single entry within the feed area',function() {
            let entriesElements = feedContainerElement.getElementsByClassName('entry-link');
            //Contain at least one entry ie >0
            expect(entriesElements.length).toBeGreaterThan(0);
        });
    });

    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){

        /*Seventh Test - Write a test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * Remember, loadFeed() is asynchronous.*/
        let feedContainerElement = document.querySelector('.feed');
        let intialfeedContainer;

        beforeEach(function(done) {
            loadFeed(0, function() {
                intialfeedContainer = feedContainerElement.innerHTML;
                loadFeed(1, function() {
                    done();
                });
            });
        });

        it('changes the content in the feed area',function() {
            let latestfeedContainer = feedContainerElement.innerHTML;
            expect(intialfeedContainer).not.toBe(latestfeedContainer);
         });
    });

}());
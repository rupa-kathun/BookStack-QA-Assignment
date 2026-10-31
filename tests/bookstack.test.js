require("dotenv").config();

const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

describe("BookStack Automation Testing", function () {
    this.timeout(30000);

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser("chrome").build();
    });

    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    // Reusable Login Function
    async function login() {
        await driver.get(`${process.env.BOOKSTACK_URL}/login`);

        const emailField = await driver.findElement(By.id("email"));
        await emailField.clear();
        await emailField.sendKeys(process.env.BOOKSTACK_EMAIL);

        const passwordField = await driver.findElement(By.id("password"));
        await passwordField.clear();
        await passwordField.sendKeys(process.env.BOOKSTACK_PASSWORD);

        await driver.findElement(By.css("button.button")).click();

        await driver.wait(
            until.urlIs(process.env.BOOKSTACK_URL + "/"),
            15000
        );
    }

    // TC-AUTO-01: Valid Login
    it("TC-AUTO-01: Login with valid credentials", async function () {
        await login();

        const currentUrl = await driver.getCurrentUrl();

        assert(
            !currentUrl.includes("/login"),
            "Login failed."
        );

        console.log("Login successful!");
    });

    // TC-AUTO-02: Create Book
    it("TC-AUTO-02: Create a book with valid data", async function () {
    const bookName = "QA Automation Book 2026";

        // Open Create Book page
        await driver.get(
            `${process.env.BOOKSTACK_URL}/create-book`
        );

        // Enter Book Name
        const nameField = await driver.findElement(By.id("name"));
        await nameField.clear();
        await nameField.sendKeys(bookName);

        // Enter Description
        const description = await driver.wait(
    until.elementLocated(
        By.css('div[contenteditable="true"][data-lexical-editor="true"]')
    ),
    15000
);
await description.click();
        await description.sendKeys(
            "Book created using Selenium automation."
        );
console.log("Before Save URL:", await driver.getCurrentUrl());

console.log(
    "Submit Buttons:",
    await driver.findElements(By.css('button[type="submit"]'))
        .then(async buttons => Promise.all(
            buttons.map(button => button.getText())
        ))
);

console.log(
    "Book Name:",
    await driver.findElement(By.id("name")).getAttribute("value")
);

console.log(
    "Description:",
    await description.getText()
);
        // Click Save Book
        await driver.findElement(
    By.xpath("//button[normalize-space()='Save Book']")
).click();

        await driver.sleep(2000);

console.log("After Save URL:", await driver.getCurrentUrl());

console.log(
    "After Save Page:",
    (await driver.findElement(By.tagName("body")).getText()).slice(0, 2000)
);

        // Verify Book Creation
        await driver.wait(
            until.elementLocated(
                By.xpath(`//*[contains(text(), "${bookName}")]`)
            ),
            15000
        );

        const pageText = await driver.findElement(
            By.tagName("body")
        ).getText();

        assert(
            pageText.includes(bookName),
            "Book creation failed."
        );

        console.log("Book created successfully!");
    });
        // TC-AUTO-03: Search Book
    it("TC-AUTO-03: Search for an existing book", async function () {
        const bookName = "QA Automation Book 2026";

        // Search for the created book
        await driver.get(
            `${process.env.BOOKSTACK_URL}/search?term=${encodeURIComponent(bookName)}`
        );

        // Verify Search Result
        await driver.wait(async function () {
            const pageText = await driver.findElement(
                By.tagName("body")
            ).getText();

            return pageText.includes(bookName);
        }, 15000);

        const pageText = await driver.findElement(
            By.tagName("body")
        ).getText();

        assert(
            pageText.includes(bookName),
            "Book was not found in search results."
        );

        console.log("Book found successfully in search results!");
    });
});

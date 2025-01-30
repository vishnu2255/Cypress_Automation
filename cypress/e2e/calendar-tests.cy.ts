import { dateParamToISO } from "../support/helper";
import { isDateInRange } from "../support/pageFunctions/calendar";
import { dateGenerator } from "../support/selectorsRepo/calendar";

describe("Validate Random Date Generator", () => {
  beforeEach(() => {
    cy.visit("https://www.random.org/calendar-dates/");
  });

  // we can move this to fixtures if we plan to scale the testData or use it in multiple tests
  const testCases = [
    {
      numOfDates: "4",
      startDate: { day: "5", month: "January", year: "2024" },
      endDate: { day: "25", month: "November", year: "2025" }
    },
    {
      numOfDates: "4",
      startDate: { day: "1", month: "March", year: "2024" },
      endDate: { day: "31", month: "October", year: "2024" }
    },
    {
      numOfDates: "4",
      startDate: { day: "1", month: "February", year: "2024" },
      endDate: { day: "29", month: "February", year: "2024" }
    },
    {
      numOfDates: "4",
      startDate: { day: "20", month: "December", year: "2024" },
      endDate: { day: "15", month: "January", year: "2025" }
    },
    {
      numOfDates: "4",
      startDate: { day: "20", month: "November", year: "2025" },
      endDate: { day: "25", month: "November", year: "2025" }
    },
    {
      numOfDates: "4",
      startDate: { day: "5", month: "January", year: "2024" },
      endDate: { day: "11", month: "January", year: "2024" }
    },
    {
      numOfDates: "2",
      startDate: { day: "5", month: "January", year: "2024" },
      endDate: { day: "11", month: "November", year: "2025" }
    },
    {
      numOfDates: "1",
      startDate: { day: "5", month: "January", year: "2024" },
      endDate: { day: "11", month: "January", year: "2024" }
    },
  ];

  testCases.forEach(({ numOfDates, startDate, endDate }) => {
    it(`Validates ${numOfDates} random dates between ${startDate.month} ${startDate.day} ${startDate.year} and ${endDate.month} ${endDate.day} ${endDate.year}`, () => {
      
      const range = {
        start: dateParamToISO(startDate),
        end: dateParamToISO(endDate),
      };
      
      cy.get(dateGenerator.inputNum).clear().type(numOfDates);
      cy.get(dateGenerator.selectStartDay).select(startDate.day, {
        force: true,
      });
      cy.get(dateGenerator.selectStartMonth).select(startDate.month);
      cy.get(dateGenerator.selectStartYear).select(startDate.year);

      cy.get(dateGenerator.selectEndDay).select(endDate.day, { force: true });
      cy.get(dateGenerator.selectEndMonth).select(endDate.month);
      cy.get(dateGenerator.selectEndYear).select(endDate.year);

      cy.get(dateGenerator.btnSubmit).click();

      const resultText =
          numOfDates === "1"
            ? "Here is your calendar date"
            : `Here are your ${numOfDates} calendar dates:`;
      cy.get("p").contains(resultText).should("be.visible");

      cy.get(dateGenerator.datesListParagraph)
        .invoke("text")
        .then(($lines) => {
          const dates: string[] = [];
          $lines.split("\n").forEach((line) => {
            const trimLine = line.trim();
            if (trimLine.length > 0) {
              dates.push(trimLine);
            }
          });

          // Assert the number of dates
          expect(dates).to.have.length(parseInt(numOfDates));

          // Assert each date is within given range
          dates.forEach((date) => {
            expect(isDateInRange(date, range.start, range.end)).to.be.true;
          });
        });

       // Asserting the dates in the text
       const queryText = numOfDates === "1" ? "It was picked randomly out of" : "They were picked randomly out of" ;      
        cy.get("p")
        .contains(queryText)
        .invoke("text")
        .then((displayedText) => {
          const regex = /between (\d{4}-\d{2}-\d{2}) and (\d{4}-\d{2}-\d{2})/;
          const match = displayedText.match(regex);
          if (match) {
            const displayedStart = match[1];
            const displayedEnd = match[2];

            expect(displayedStart).to.equal(range.start);
            expect(displayedEnd).to.equal(range.end);
          } else {
            throw new Error("Date Range Text not found in expected format.");
          }
        });
    });
  });
});

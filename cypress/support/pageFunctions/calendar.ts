export function isDateInRange(date: string, startDate: string, endDate: string) {
    const currentDate = new Date(date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    cy.log(`Validating date: ${currentDate}`);
    cy.log(`Start date: ${start}`);
    cy.log(`End date: ${end}`);
    return currentDate >= start && currentDate <= end;
}
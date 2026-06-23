const { test,expect} = require('@playwright/test');

test.only('First Assignment', async({page})=>{

    await page.goto("https://eventhub.rahulshettyacademy.com/login/admin/events")
    await page.getByPlaceholder('you@email.com').fill('greeshmabiju@gmail.com');
    await page.getByLabel('Password').fill('Amma*123');
    await page.locator("#login-btn").click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
    await page.getByRole('button',{name:'+ Add New Event'}).click();
    const eventTitle=`Test Event ${Date.now()}`;
    await page.locator("#event-title-input").fill(eventTitle);
    await page.locator("#admin-event-form textarea").fill("Test Automation");
    await page.getByText('City').fill('Kottayam');
    await page.getByText('Venue').fill('Test');
    await page.getByLabel('Event Date & Time').fill('2027-10-23T10:00');

  await page.getByLabel('Price ($)').fill('100');
  await page.getByLabel('Total Seats').fill('50');
  await page.locator("#add-event-btn").click();
  await expect(page.getByText('Event created!')).toBeVisible();
  console.log(`Created event: "${eventTitle}"`);
  await page.getByRole('button',{name:'Events'}).click();
   const eventCards = page.getByTestId('event-card');
  await expect(eventCards.first()).toBeVisible();
  
});
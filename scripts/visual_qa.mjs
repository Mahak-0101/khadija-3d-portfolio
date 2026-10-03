import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

async function runQA() {
  console.log('--- STARTING VISUAL QA AUDIT ---');

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
    headless: true,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
  });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Wait 2.2 seconds for preloader to complete
  await new Promise((r) => setTimeout(r, 2200));

  console.log('Capturing Hero Section...');
  await page.screenshot({ path: 'qa_01_hero.png' });

  console.log('Scrolling to 3D Experience Section...');
  await page.evaluate(() => {
    document.getElementById('experience')?.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: 'qa_02_3d_experience.png' });

  console.log('Scrolling to Featured Work Section...');
  await page.evaluate(() => {
    document.getElementById('work')?.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: 'qa_03_featured_work.png' });

  console.log('Scrolling to Motion Video Section...');
  await page.evaluate(() => {
    document.getElementById('motion')?.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: 'qa_04_motion_films.png' });

  console.log('Scrolling to Visual Gallery Section...');
  await page.evaluate(() => {
    document.getElementById('gallery')?.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: 'qa_05_gallery.png' });

  console.log('Testing Lightbox Modal interaction...');
  // Click on the first gallery card
  const card = await page.$('#gallery [data-cursor="VIEW"]');
  if (card) {
    await card.click();
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: 'qa_06_lightbox_open.png' });
    console.log('Closing lightbox with Escape key...');
    await page.keyboard.press('Escape');
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log('Scrolling to About & Specifications Section...');
  await page.evaluate(() => {
    document.getElementById('about')?.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: 'qa_07_about_details.png' });

  console.log('Scrolling to Contact Section...');
  await page.evaluate(() => {
    document.getElementById('contact')?.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: 'qa_08_contact.png' });

  // Mobile testing (viewport 390x844 iPhone)
  console.log('Testing Mobile Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: 'qa_09_mobile_hero.png' });

  console.log('Testing Mobile Navigation Drawer...');
  const menuButton = await page.$('button[aria-label="Toggle Navigation Menu"]');
  if (menuButton) {
    await menuButton.click();
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: 'qa_10_mobile_menu.png' });
  }

  await browser.close();

  console.log('--- VISUAL QA AUDIT COMPLETE ---');
  console.log('Console Errors Detected:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Error logs:', consoleErrors);
  }
}

runQA().catch((err) => {
  console.error('QA script error:', err);
  process.exit(1);
});

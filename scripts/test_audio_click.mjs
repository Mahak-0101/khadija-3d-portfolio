import puppeteer from 'puppeteer-core';

async function testAudioClick() {
  console.log('Testing audio click interaction in headless Chrome...');

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--autoplay-policy=no-user-gesture-required'],
    headless: true,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 2200)); // Wait for preloader

  // Click the sound button in navigation
  console.log('Clicking top navigation sound toggle button...');
  const navSoundButton = await page.$('header button[aria-label*="Soundtrack"]');
  if (navSoundButton) {
    await navSoundButton.click();
    console.log('Clicked nav sound button. Waiting 800ms for audio fade-in & state update...');
    await new Promise((r) => setTimeout(r, 800));
  } else {
    console.log('Nav sound button not found, clicking floating widget...');
    const widgetButton = await page.$('button[data-cursor="SOUND"]');
    if (widgetButton) {
      await widgetButton.click();
      await new Promise((r) => setTimeout(r, 800));
    }
  }

  console.log('Capturing screenshot with SOUND ON...');
  await page.screenshot({ path: 'qa_sound_active.png' });

  // Check state in both top nav and floating widget
  const states = await page.evaluate(() => {
    const navText = document.querySelector('header button[aria-label*="Soundtrack"]')?.textContent?.trim();
    const widgetText = document.querySelector('button[data-cursor="SOUND"]')?.textContent?.trim();
    const isAudioPlaying = !document.querySelector('audio')?.paused;
    const audioVolume = document.querySelector('audio')?.volume;
    return { navText, widgetText, isAudioPlaying, audioVolume };
  });

  console.log('Audio verification details:', states);

  await browser.close();
}

testAudioClick().catch((err) => {
  console.error('Audio test failed:', err);
  process.exit(1);
});

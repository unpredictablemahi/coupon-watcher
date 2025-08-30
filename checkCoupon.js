const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Go to the JioMart page
  await page.goto('https://relianceretail.com/JioMart/?jiocpn=7980945615', {
    waitUntil: 'domcontentloaded'
  });

  console.log('Watching for #couponcode...');

  // Wait for coupon code to appear
  try {
    const couponCode = await page.evaluate(() => {
      return new Promise(resolve => {
        const observer = new MutationObserver(() => {
          const el = document.querySelector('#couponcode');
          if (el) {
            resolve(el.innerText.trim());
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
      });
    });

    console.log('Coupon code found:', couponCode);
  } catch (err) {
    console.error('Error:', err);
  }

  await browser.close();
})();

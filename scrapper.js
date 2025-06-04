// import express from 'express';
// import puppeteer from 'puppeteer';
// import Product from "./model/productModel.js"
// import connectionDB from "./db/connectiondb.js";

// const app = express();
// const PORT = 3000;
// connectionDB();

// app.use(express.json());

// app.post('/scrape', async (req, res) => {
//   const { url } = req.body;

//   if (!url) {
//     return res.status(400).json({ error: 'URL is required' });
//   }

//   try {
//     const browser = await puppeteer.launch({
//       headless: true,
//       args: ['--no-sandbox', '--disable-setuid-sandbox'],
//     });

//     const page = await browser.newPage();
//     await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

//     // Scroll to load all products
//     await page.evaluate(async () => {
//       await new Promise((resolve) => {
//         let totalHeight = 0;
//         const distance = 300;
//         const timer = setInterval(() => {
//           window.scrollBy(0, distance);
//           totalHeight += distance;
//           if (totalHeight >= document.body.scrollHeight) {
//             clearInterval(timer);
//             resolve();
//           }
//         }, 200);
//       });
//     });

//     await page.waitForSelector('.Ms6aG', { timeout: 20000 });

//     const products = await page.evaluate(() => {
//       const items = [];
//       const cards = document.querySelectorAll('.Ms6aG');

//       cards.forEach(card => {
//         const title = card.querySelector('.RfADt a')?.getAttribute('title') || '';
//         const price = card.querySelector('.ooOxS')?.innerText || '';
//         const image = card.querySelector('img')?.src || '';
//         const link = card.querySelector('a[href]')?.getAttribute('href') || '';
//         const fullLink = link.startsWith('//') ? 'https:' + link : link;
//         const sold = card.querySelector('._1cEkb > span')?.innerText || '';
//         const reviews = card.querySelector('.qzqFw')?.innerText || '';
//         const ratingStars = card.querySelectorAll('.Dy1nx').length;

//         if (title && price) {
//           items.push({
//             title,
//             price,
//             image,
//             link: fullLink,
//             sold,
//             reviews,
//             rating: ratingStars
//           });
//         }
//       });

//       return items;
//     });

//     await browser.close();
//     res.json({ success: true, products });
//   } catch (error) {
//     console.error('Scraping error:', error.message);
//     res.status(500).json({ error: error.message || 'Failed to scrape the website.' });
//   }
// });


// app.listen(PORT, () => {
//   console.log(`🚀 Server is running at http://localhost:${PORT}`);
// });

import express from 'express';
import puppeteer from 'puppeteer';
import Product from "./model/productModel.js";
import connectionDB from "./db/connectiondb.js";

const app = express();
const PORT = 3000;
connectionDB();

app.use(express.json());

app.post('/scrape', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

    // Scroll to load all products
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 300;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= document.body.scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 200);
      });
    });

    await page.waitForSelector('.Ms6aG', { timeout: 20000 });

    const products = await page.evaluate(() => {
      const items = [];
      const cards = document.querySelectorAll('.Ms6aG');

      cards.forEach(card => {
        const title = card.querySelector('.RfADt a')?.getAttribute('title') || '';
        const price = card.querySelector('.ooOxS')?.innerText || '';
        const image = card.querySelector('img')?.src || '';
        const link = card.querySelector('a[href]')?.getAttribute('href') || '';
        const fullLink = link.startsWith('//') ? 'https:' + link : link;
        const sold = card.querySelector('._1cEkb > span')?.innerText || '';
        const reviews = card.querySelector('.qzqFw')?.innerText || '';
        const ratingStars = card.querySelectorAll('.Dy1nx').length;

        if (title && price) {
          items.push({
            title,
            price,
            image,
            link: fullLink,
            sold,
            reviews,
            rating: ratingStars
          });
        }
      });

      return items;
    });

    await browser.close();

    // Save scraped products to MongoDB
    const savedProducts = [];

    for (const product of products) {
      // Check if product already exists
      const exists = await Product.findOne({ title: product.title, price: product.price });

      if (!exists) {
        const newProduct = new Product(product);
        await newProduct.save();
        savedProducts.push(newProduct);
      } else {
        // If already exists, push the existing product to savedProducts
        savedProducts.push(exists);
      }
    }

    res.json({ success: true, products: savedProducts });
  } catch (error) {
    console.error('Scraping error:', error.message);
    res.status(500).json({ error: error.message || 'Failed to scrape the website.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

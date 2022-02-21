import { get as fetcher_get } from 'src/functions/fetcher';

const CACHE = 3600;

export default async function handler(req, res) {
  try {
    let url_extra = '%26campaignId%3D326988';
    let html = await fetcher_get(`http://api.scraperapi.com/?api_key=af23cd46cbdaf2c052f2580d5523e4bc&render=true&url=https%3A%2F%2Fsedo.com%2Fsearch%2F%3Fkeyword%3D${req.query.str}%26price_end%3D1000%26price_start%3D10%26len_max%3D7${url_extra}`, { ttl: CACHE });
    let results = html.match(/<main(.+?)\/main>/s);
    if (results && results[1]) {
      html = `<main${results[1]}/main>`;
    }
    res.status(200).json(html);
  } catch (e) {
    res.status(200).json({ error: e });
  }
}



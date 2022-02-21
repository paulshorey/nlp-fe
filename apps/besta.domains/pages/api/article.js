// http://api.scraperapi.com/?api_key=af23cd46cbdaf2c052f2580d5523e4bc&render=true&url=https%3A%2F%2Fsedo.com%2Fsearch%2F%3Fkeyword%3Dwhattodo.today%26price_end%3D1000%26price_start%3D10%26len_max%3D7

import axios from 'axios';

export default async function handler(req, res) {
  try {
    let URL = 'https://www.spiral.us/blog/how-much-charity-is-tax-deductible';
    let response = await axios.get(URL);
    let data = response.data;
    // console.log('\n\ndata\n', data, '\n\n');
    let results = data.match(/<article(.+?)\/article>/s);
    console.log('\n\n\n\n',results,'results\n\n\n')
    if (results && results[1]) {
      data = `<article${results[1]}/article>`;
    }
    res.status(200).json(data);
    // {data: {}}
  } catch (e) {
    res.status(200).json({ error: e });
    // {error: {}}
  }
}



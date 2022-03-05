// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from 'fs';

export default async function handler(req, res) {
  // console.log(res);  // It won'tt be printed on the console but on the terminal as its a backend part
  // http://localhost:3000/api/blogs
  let data = await fs.promises.readdir('blogdata')
  let allBlogs = []
  let myFile;
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    myFile = await fs.promises.readFile(('blogdata/' + item), 'utf-8')
    allBlogs.push(JSON.parse(myFile))
  }
  res.status(200).json(allBlogs)
}
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from 'fs';

export default function handler(req, res) {
  // console.log(res);  // It won'tt be printed on the console but on the terminal as its a backend part
  // http://localhost:3000/api/blogs
  fs.readdir('blogdata', (err, data)=>{
    res.status(200).json(data)
  })
}

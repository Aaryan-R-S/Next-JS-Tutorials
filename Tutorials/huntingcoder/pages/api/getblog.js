// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from 'fs';

export default function handler(req, res) {
  // console.log(res);  // It won't be printed on the console but on the terminal as its a backend part
    //   http://localhost:3000/api/getblog?slug=how-to-learn-next-js
  fs.readFile(`blogdata/${req.query.slug}.json`, 'utf-8', (err, data)=>{
      if(err){
          res.status(200).json({error:"No such blog found!"})
      }
    res.status(200).json(JSON.parse(data))
  })
}

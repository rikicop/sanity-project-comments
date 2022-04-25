import client from "../../lib/sanity";

export default async function createComment(req, res) {
  const { name, text, _id } = JSON.parse(req.body);
  await client
    .config({
      token: process.env.SANITY_API_TOKEN,
    })
    .create({
      _type: "comment",
      name,
      text,
      post: {
        _type: "reference",
        _ref: _id,
      },
    })
    .then((res) => {
      console.log(`Comment was created, document ID is ${res._id}`);
    });
  res.status(200);
}

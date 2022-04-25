import styles from "../../styles/Post.module.css";
import imageUrlBuilder from "@sanity/image-url";
import SanityBlockContent from "@sanity/block-content-to-react";
import { useState, useEffect } from "react";
import { Toolbar } from "../../components/toolbar";
import { Form } from "../../components/Form";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api";
//import { imageBuilder } from "../lib/sanity";

/* const Post = ({ title, body, image, _id}) => { */
const Post = ({ post }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const imgBuilder = imageUrlBuilder({
      projectId: "pxz77rs4",
      dataset: "production",
    });

    setImageUrl(imgBuilder.image(post.coverImage));
  }, [post.coverImage]);
  console.log("image: ", post.coverImage);
  console.log("imageUrl: ", imageUrl);
  return (
    <div>
      <Toolbar />
      <div className={styles.main}>
        <h1>{post.title}</h1>
        {imageUrl && (
          <img className={styles.mainImage} src={imageUrl} alt={post.title} />
        )}
        <div className={styles.body}>
          <SanityBlockContent
            blocks={post.body}
            imageOptions={{ w: 320, h: 240, fit: "max" }}
            projectId="pxz77rs4"
            dataset="production"
          ></SanityBlockContent>
        </div>
        <div>
          {/* <h1>{_id}</h1> */}
          <Form _id={post._id} />
          {JSON.stringify(post.comments)}
          {post.comments.map((comment) => (
            <div>
              <h3>{comment.name}</h3>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;

  if (!pageSlug) {
    return {
      notFound: true,
    };
  }
  const query = encodeURIComponent(
    `*[ _type == "post" && slug.current == "${pageSlug}" ]`
  );
  const url = `https://pxz77rs4.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then((res) => res.json());
  const post = result.result[0];

  if (!post) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        _id: post._id,
        body: post.body,
        title: post.title,
        image: post.mainImage,
      },
    };
  }
}; */

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview);
  return {
    props: {
      preview,
      post: data?.post || null,
      morePosts: data?.morePosts || null,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths:
      allPosts?.map((post) => ({
        params: {
          slug: post.slug,
        },
      })) || [],
    fallback: true,
  };
}

export default Post;

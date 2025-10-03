import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from '../config/api';
import img1 from "../assets/10.jpeg";
import img2 from "../assets/17.jpg";
import img3 from "../assets/11.jpeg";
import img4 from "../assets/12.jpeg";
import img5 from "../assets/13.jpeg";
import img6 from "../assets/14.jpg";
import img7 from "../assets/15.jpg";
import img8 from "../assets/16.jpg";
import img9 from "../assets/2.jpeg";
import img10 from "../assets/3.jpeg";
import img11 from "../assets/4.jpeg";
import img12 from "../assets/5.jpeg";
import img13 from "../assets/6.jpeg";
import img14 from "../assets/7.jpeg";
import img15 from "../assets/8.jpeg";


interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Array of imported images
  const blogImages = [
    img1, img2, img3, img4, img5, img6, img7, img8, 
    img9, img10, img11, img12, img13, img14, img15
  ];

  useEffect(() => {
    axios
      .get(getApiUrl("api/blogs"))
      .then((res) => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch blogs");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-gray-500 text-center">Loading blogs...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className=" max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-10 text-center">
        ✍️ Blog
      </h1>

      {/* Responsive Grid Layout */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            {/* Blog Image */}
            <img
              src={blogImages[index % blogImages.length]}
              alt={`Blog post ${blog.title}`}
              className="w-48 ml-20 h-48 object-cover"
            />

            <div className="p-5">
              {/* Category */}
              {blog.category && (
                <span className="inline-block mb-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs px-3 py-1 rounded-full">
                  {blog.category}
                </span>
              )}

              {/* Title */}
              <h2 className="text-xl font-bold mb-2 hover:text-blue-600 cursor-pointer">
                {blog.title}
              </h2>

              {/* Author & Date */}
              <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                <span>👤 {blog.author}</span>
                <span>{new Date(blog.createdAt).toLocaleDateString("en-US")}</span>
              </div>

              {/* Content Preview */}
              <p className="text-gray-700 mb-3 line-clamp-3">
                {blog.content}
              </p>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;

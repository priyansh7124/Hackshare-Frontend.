import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Loader from "../common/Loader";
import Image from "next/image";

const PostList = ({ search, searchTags }: any) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [limit] = useState(10); 

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}community/get-all?tags=${searchTags}&page=${page}&limit=${limit}`,
          {
            withCredentials: true,
          },
        )
        .catch((e) => {
          console.log(e);
        });
      console.log(response?.data.data);
      setPosts(response?.data.data.posts); // The posts for the current page
      setTotalPages(response?.data.data.pagination.totalPages); // Set total pages for pagination
      setLoading(false);
    };

    fetchPosts();
  }, [searchTags, page, limit]); // Depend on page and limit for re-fetching posts

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : posts.length > 0 ? (
        <div>
          <h2 className="px-4">Community Posts</h2>
          <div>
            {posts
              .filter((post: any) => {
                return post?.title.toLowerCase().includes(search.toLowerCase());
              })
              .map((post: any) => (
                <div
                  key={post._id}
                  className="my-4 rounded-lg bg-white px-3 py-6 shadow-md dark:bg-black dark:text-white md:mx-3 md:px-10"
                >
                  <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                    <span className="text-gray-600 font-light">
                      {new Date(post.createdAt).toLocaleString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <div className="bg-gray-600 text-gray-100 hover:bg-gray-500 flex flex-wrap gap-1 rounded py-1 font-bold">
                      {post.tags.map((i: string, idx: any) => {
                        return (
                          <div
                            className=" dark:text-primary-400  dark:border-primary-400 rounded-md border border-meta-3 px-2 py-1 text-meta-3"
                            key={idx}
                          >
                            {i}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mt-2">
                    <a
                      className="text-gray-700 hover:text-gray-600 text-2xl font-bold"
                      href="#"
                    >
                      {post.title}
                    </a>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.content.substr(0, 50),
                      }}
                      className="text-gray-600 mt-2"
                    ></p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      className="text-blue-600 hover:underline"
                      href={`/community/${post._id}`}
                    >
                      Read more
                    </Link>
                    <div>
                      <a className="flex items-center" href="#">
                        <img
                          className="mx-4 hidden h-10 w-10 rounded-full object-cover sm:block"
                          src={post.user.profilePicture || `/blackprofile.png`}
                          alt="avatar"
                        />
                        <h1 className="text-gray-700 font-bold">
                          {post.user.username}
                        </h1>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              {
                page==1?"":<svg
                fill="currentColor"
                viewBox="0 0  16 16"
                height="2em"
                width="2em"
              >
                <path d="M16 14a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2h12a2 2 0 012 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 10-.708-.708l-3 3a.5.5 0 000 .708l3 3a.5.5 0 00.708-.708L5.707 8.5H11.5a.5.5 0 000-1z" />
              </svg>
              }
            </button>
            <span className="px-4 py-2">{`Page ${page} of ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              {page == totalPages ? (
                ""
              ) : (
                <svg
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  height="2em"
                  width="2em"
                >
                  <path d="M0 14a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2a2 2 0 00-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.293 8.5H4.5a.5.5 0 010-1z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex w-[100%] flex-col items-center justify-center gap-1">
          <Image width={400} height={400} src={"/noitem.png"} alt="error pic" />
          <h1 className="text-2xl font-bold">No Results Found</h1>
        </div>
      )}
    </>
  );
};

export default PostList;

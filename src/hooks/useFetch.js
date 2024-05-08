"use client";
import { useEffect, useState } from "react";

export default function useFetch(baseUrl = "", options = {}) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const request = {
    post: async (url, body) => {
      return await sendRequest(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    },
    patch: async (url, body) => {
      await sendRequest(url, {
        method: "patch",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    },
    delete: async (url, body) => {
      await sendRequest(url, {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    },
    get: async (url) => {
      await sendRequest(url);
    },
  };

  const sendRequest = async (
    url,
    options = {},
    abortController = new AbortController()
  ) => {
    setLoading(true);
    setData(null);
    return await fetch(baseUrl + url, {
      ...options,
      signal: abortController.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("can't fetch data!");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        setError(null);
        if (data.success && !data.success) {
          setError(data.message);
        }
        return data;
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
          console.log(err);
        } else {
          setLoading(false);
          setError(err.message);
        }
      });
  };

  useEffect(() => {
    const abortController = new AbortController();
    // if (baseUrl !== null && baseUrl !== "") {
    //   console.log("effect");
    //   sendRequest(baseUrl, options);
    // }
    return () => abortController.abort();
  }, [baseUrl]);

  return { data, loading, error, request };
}

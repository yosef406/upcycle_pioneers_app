"use client";
import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import AiIdea from "@/components/AiIdea";
import { useRouter } from "next/navigation";
export default function Review() {
  const { data, loading, error, request } = useFetch(
    "https://upcycle.onrender.com"
  );
  const [localData, setLocalData] = useState(null);
  const [displayIdeas, setDisplayIdeas] = useState(false);
  const router = useRouter();
  // run when the page first starts
  useEffect(() => {
    if (!localData) {
      const storedData = localStorage.getItem("apiData");
      if (storedData) {
        setLocalData(JSON.parse(storedData));
      } else {
        console.log(`lone 18: ${storedData}`);
        router.push("/camera");
      }
    }
  });

  // run when the localData is retrieved
  useEffect(() => {
    if (!data && localData) {
      request.post("/upcycle_for_image", localData);
    }
  }, [localData]);

  // run when the server responds
  useEffect(() => {
    if (!loading && !error && data) {
      if (data.aiResponse.status) {
        setDisplayIdeas(true);
        localStorage.removeItem("apiData");
      }
    } else if (error && error.split(" ")[0] != "Window.fetch:") {
      console.log(`lone 39: ${error}`);
      router.push("/camera");
    }
  }, [data, loading, error]);
  return (
    <>
      <h1>Review Ideas</h1>
      {displayIdeas ? (
        data.aiResponse.list.map((element) => {
          return (
            <>
              <AiIdea key={element.number} idea={element} />
            </>
          );
        })
      ) : (
        <>
          <h1>Loading ...</h1>
        </>
      )}
    </>
  );
}

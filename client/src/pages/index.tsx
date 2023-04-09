import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const IndexPage = () => {
  const router = useRouter();
  const [content, setContent] = useState("");

  const handleSave = async () => {
    const res = await fetch("http://localhost:3001/api/documents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (res.ok) {
      const { id } = await res.json();
      router.push(`/${id}`);
    }
  };

  return (
    <Layout>
      <h1>Welcome to Hastebin!</h1>
      <p>Paste your content below:</p>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleSave}>Save</button>
    </Layout>
  );
};

export default IndexPage;

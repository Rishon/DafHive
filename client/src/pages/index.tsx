import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const IndexPage = () => {
  const router = useRouter();
  const [content, setContent] = useState("");

  const handleSave = async () => {
    const res = await fetch(`${process.env.API_URL}/api/documents`, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",    
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

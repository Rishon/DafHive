import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import axios from "axios";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL;

const IndexPage = () => {
  const router = useRouter();
  const [content, setContent] = useState("");

  const handleSave = async () => {
    await axios
      .post(`${API_URL}/api/documents`, JSON.stringify({ content }), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status !== 200) {
          router.push("/");
          return;
        }

        try {
          const { id } = res.data;
          router.push(`/${id}`);
        } catch (error) {
          console.log(error.message);
          router.push("/");
          return;
        }
      })
      .catch((error) => {
        console.log(error.message);
        router.push("/");
      });
  };

  return (
    <Layout>
      <h1>Welcome!</h1>
      <p>Paste your content below:</p>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleSave}>Save</button>
    </Layout>
  );
};

export default IndexPage;

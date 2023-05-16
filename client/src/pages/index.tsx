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

  const renderLineNumbers = () => {
    const lines = content.split("\n");
    return lines.map((_, index) => (
      <div key={index} className="line-number">
        {index + 1}
      </div>
    ));
  };

  return (
    <Layout>
      <div className="styled-box">
        <div className="box-shadow"></div>
        <div className="buttons">
          <button onClick={handleSave}>Save</button>
        </div>
      </div>

      <div className="code-editor">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your content here"
        />
      </div>
    </Layout>
  );
};

export default IndexPage;

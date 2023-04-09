import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

type Document = {
  code: string;
  createdAt: string;
};

const DocumentPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [document, setDocument] = useState<Document>();

  useEffect(() => {
    const fetchDocument = async () => {
      const res = await fetch(`${process.env.API_ROUTE}/api/documents/${id}`, {
        method: "GET",
        mode: 'no-cors',
      });

      if (res.ok) {
        const data = await res.json();
        setDocument(data);
      } else {
        router.push("/");
      }
    };

    if (id) {
      fetchDocument();
    }
  }, [id]);

  return (
    <Layout>
      <h1>Document {id}</h1>
      {document ? (
        <>
          <p>Created at: {document.createdAt}</p>
          <textarea value={document.code} readOnly />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
};

export default DocumentPage;

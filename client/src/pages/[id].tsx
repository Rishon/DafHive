import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import axios from "axios";

type Document = {
  content: string;
  createdAt: number;
};

const API_URL: string = process.env.NEXT_PUBLIC_API_URL;

const DocumentPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [document, setDocument] = useState<Document>();

  const formatDate = (dateString: number) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return date
      .toLocaleString(undefined, options)
      .replace(/(\d+)(th|nd|rd|st)/, "$1");
  };

  useEffect(() => {
    const fetchDocument = async () => {
      await axios
        .get(`${API_URL}/api/documents/${id}`)
        .then((res) => {
          if (res.status !== 200) {
            router.push("/");
            return;
          }

          try {
            const data = res.data;
            setDocument(data);
          } catch (error) {
            router.push("/");
            console.log(error.message);
            return;
          }
        })
        .catch((error) => {
          console.log(error.message);
          router.push("/");
          return;
        });
    };

    if (id) {
      fetchDocument();
    }
  }, [id]);

  return (
    <Layout>
      {document ? (
        <>
          <p className="document-date">{formatDate(document.createdAt)}</p>
          <textarea value={document.content} readOnly />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
};

export default DocumentPage;

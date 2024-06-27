"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      // cleanup
    };
  }, []);
  return <pre>{JSON.stringify(properties, null, 2)}</pre>;
};

export default SearchResultsPage;

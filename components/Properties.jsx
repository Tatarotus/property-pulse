"use client";
import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import PropertySearch from "@/components/PropertySearch";
import Spinner from "@/components/Spinner";
import Pagination from "./Pagination";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [totalItems, setTotalItens] = useState(0);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setProperties(data.properties);
        setTotalItens(data.total);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [page, pageSize, totalItems]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <div className=" bg-blue-700 px-4 py-6">
        <PropertySearch />
      </div>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
          {totalItems > pageSize && (
            <Pagination
              page={page}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              totalItems={totalItems}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Properties;

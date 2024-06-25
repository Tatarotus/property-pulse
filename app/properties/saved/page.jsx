"use client";
import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";

const SavedPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/bookmarks`, {
          method: "GET",
        });

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
          // Sort the properties by create date
          properties.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        } else {
          console.error(`Failed to fetch saved properties: ${res.statusText}`);
          toast.error("Failed to fetch saved properties");
        }
      } catch (error) {
        console.error(
          `An error occurred while fetching saved properties: ${error}`
        );
        toast.error("An error occurred while fetching saved properties");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <PropertyCard property={property} key={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;

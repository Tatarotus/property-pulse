'use client'
import { useRouter } from "next/navigation";

const Property = () => {
  const router = useRouter();
  console.log(router)
  return <div>show one property</div>;
};

export default Property;

import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios.js";

const number = (value) => Number(value || 0);

export function useMarketplace(user) {
  const [listings, setListings] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [notice, setNotice] = useState("");
  const [purchasing, setPurchasing] = useState("");
  const [filterCity, setFilterCity] = useState("all");

  const load = () => api.get("/listings?sort=price_asc").then(({ data }) => setListings(data));

  useEffect(() => {
    load().catch(() => setNotice("Could not load marketplace right now."));
  }, []);

  const buy = async (listing) => {
    setPurchasing(listing._id);
    setNotice("");
    try {
      const { data } = await api.post("/transactions/purchase", {
        listingId: listing._id,
        kwh: Number(quantity[listing._id] || 1),
      });

      if (user) {
        const cacheKey = `solarshare_consumer_orders_${user._id || user.email || "user"}`;
        const existing = JSON.parse(localStorage.getItem(cacheKey) || "[]");
        const newOrder = {
          ...data,
          seller: listing.seller || { name: "Rooftop Solar Owner" },
          buyer: { _id: user._id, name: user.name, email: user.email },
        };
        localStorage.setItem(cacheKey, JSON.stringify([newOrder, ...existing]));
      }

      setNotice(`Purchase complete: ${data.kwh} kWh for ₹${number(data.totalAmount).toFixed(2)}.`);
      load();
    } catch (err) {
      setNotice(err.response?.data?.message || "Purchase could not be completed.");
    } finally {
      setPurchasing("");
    }
  };

  const cheapestPrice = useMemo(
    () => (listings.length ? Math.min(...listings.map((item) => number(item.pricePerKwh))) : null),
    [listings]
  );

  const cities = useMemo(() => {
    const set = new Set();
    listings.forEach((item) => {
      const city = item.location?.city || item.seller?.address?.city;
      if (city) set.add(city);
    });
    return Array.from(set);
  }, [listings]);

  const filteredListings = useMemo(() => {
    if (filterCity === "all") return listings;
    return listings.filter(
      (item) => (item.location?.city || item.seller?.address?.city) === filterCity
    );
  }, [listings, filterCity]);

  return {
    listings, quantity, setQuantity, notice, purchasing, filterCity, setFilterCity,
    buy, cheapestPrice, cities, filteredListings
  };
}

import { useState } from "react";

const initialPanels = [
  { id: 1, name: "Main Rooftop Array A", brand: "Tata Power Solar Monocrystalline", capacityKw: 6.0, panelsCount: 16, installDate: "2023-09-15", status: "Optimal (100% Efficiency)" },
  { id: 2, name: "Carport Array B", brand: "Adani Solar Bifacial", capacityKw: 3.5, panelsCount: 8, installDate: "2024-02-10", status: "Active (96% Efficiency)" },
];

export function useProsumerPanels() {
  const [panels, setPanels] = useState(initialPanels);
  const [showAddModal, setShowAddModal] = useState(false);
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({ name: "", brand: "Tata Power Solar Monocrystalline", capacityKw: "3.0", panelsCount: "8", installDate: "2024-06-01" });

  const handleAddPanel = (e) => {
    e.preventDefault();
    const newPanel = {
      id: Date.now(),
      name: form.name || `Rooftop Array ${panels.length + 1}`,
      brand: form.brand,
      capacityKw: Number(form.capacityKw),
      panelsCount: Number(form.panelsCount),
      installDate: form.installDate,
      status: "Active (Optimal)",
    };
    setPanels([...panels, newPanel]);
    setShowAddModal(false);
    setNotice("New solar array added successfully to your profile!");
    setTimeout(() => setNotice(""), 3500);
    setForm({ name: "", brand: "Tata Power Solar Monocrystalline", capacityKw: "3.0", panelsCount: "8", installDate: "2024-06-01" });
  };

  const handleDeletePanel = (id) => {
    if (confirm("Are you sure you want to remove this solar array from your account?")) {
      setPanels(panels.filter((p) => p.id !== id));
      setNotice("Solar array removed.");
      setTimeout(() => setNotice(""), 3000);
    }
  };

  const totalCapacity = panels.reduce((acc, p) => acc + p.capacityKw, 0);
  const totalPanelsCount = panels.reduce((acc, p) => acc + p.panelsCount, 0);

  return { panels, showAddModal, setShowAddModal, notice, form, setForm, handleAddPanel, handleDeletePanel, totalCapacity, totalPanelsCount };
}

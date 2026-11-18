"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Search,
  Filter,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ArrowLeft,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.success && data.orders) {
        setOrders(data.orders);
        setFilteredOrders(data.orders);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = orders;

    if (selectedStatus !== "ALL") {
      result = result.filter((o) => {
        if (selectedStatus === "PAID") return o.payment?.status === "paid";
        if (selectedStatus === "COD") return o.payment?.method === "cod";
        return o.status === selectedStatus;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customer.fullName.toLowerCase().includes(q) ||
          o.customer.mobile.includes(q) ||
          o.customer.city.toLowerCase().includes(q)
      );
    }

    setFilteredOrders(result);
  }, [orders, selectedStatus, searchQuery]);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? data.order : o))
        );
      }
    } catch (err) {
      console.error("Status update failed:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const paidCount = orders.filter((o) => o.payment?.status === "paid").length;
  const inTransitCount = orders.filter((o) => o.status === "In Transit").length;

  return (
    <div className="bg-[#FCF8F3] text-[#1C1C1C] min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8DFC9] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans text-[#87967E] mb-1">
              <Link href="/" className="hover:text-[#103B27] flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
              </Link>
              <span>/</span>
              <span className="text-[#103B27] font-semibold">Fulfillment Backend</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#103B27] tracking-tight">
              Order Dispatch &amp; Payments Manager
            </h1>
            <p className="text-xs font-sans text-[#87967E]">
              Real-time synchronization with courier logistics and payment verifications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              className="px-4 py-2 bg-[#FFFFFF] border border-[#E8DFC9] hover:border-[#103B27] text-xs font-sans font-medium rounded-lg flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#103B27] ${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh Data</span>
            </button>
            <Link
              href="/checkout"
              className="px-4 py-2 bg-[#103B27] text-[#F5F1E8] text-xs font-sans font-bold tracking-wider uppercase rounded-lg hover:bg-[#09291C] transition-colors"
            >
              Test New Order
            </Link>
          </div>
        </div>

        {/* Executive Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 my-6">
          <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8DFC9] shadow-xs space-y-1">
            <span className="text-[10px] uppercase font-sans tracking-wider text-[#87967E] font-semibold">
              TOTAL ORDER VOLUME
            </span>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#103B27]">
              {orders.length} Orders
            </p>
            <span className="text-[11px] font-sans text-[#2E7D32]">100% recorded in backend DB</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8DFC9] shadow-xs space-y-1">
            <span className="text-[10px] uppercase font-sans tracking-wider text-[#87967E] font-semibold">
              ACCUMULATED GROSS VALUE
            </span>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#103B27]">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </p>
            <span className="text-[11px] font-sans text-[#87967E]">Average ₹{orders.length ? Math.round(totalRevenue / orders.length) : 0} per order</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8DFC9] shadow-xs space-y-1">
            <span className="text-[10px] uppercase font-sans tracking-wider text-[#87967E] font-semibold">
              PREPAID VERIFIED
            </span>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#2E7D32]">
              {paidCount} Paid
            </p>
            <span className="text-[11px] font-sans text-[#87967E]">Instant UPI &amp; Cards</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8DFC9] shadow-xs space-y-1">
            <span className="text-[10px] uppercase font-sans tracking-wider text-[#87967E] font-semibold">
              ACTIVE AIR FREIGHT
            </span>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#B28A58]">
              {inTransitCount} In Transit
            </p>
            <span className="text-[11px] font-sans text-[#87967E]">BlueDart / Delhivery Air</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8DFC9] p-4 shadow-xs mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#87967E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ID, Customer Name, Phone, City..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#FCF8F3] border border-[#E8DFC9] rounded-lg text-xs font-sans focus:outline-none focus:border-[#103B27]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto text-xs font-sans">
            <span className="text-[11px] text-[#87967E] mr-1 uppercase font-semibold">Status:</span>
            {[
              { id: "ALL", label: "All Orders" },
              { id: "PAID", label: "Prepaid / Paid" },
              { id: "COD", label: "Cash on Delivery" },
              { id: "In Transit", label: "In Transit" },
              { id: "Packed", label: "Packed" },
              { id: "Delivered", label: "Delivered" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedStatus(f.id)}
                className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  selectedStatus === f.id
                    ? "bg-[#103B27] text-white border-[#103B27] font-semibold"
                    : "bg-[#FCF8F3] text-[#1C1C1C] border-[#E8DFC9] hover:border-[#103B27]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8DFC9] shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="py-20 text-center text-xs font-sans text-[#87967E]">
              Loading orders from database...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-20 text-center space-y-2">
              <Package className="w-10 h-10 text-[#87967E] mx-auto stroke-[1.25]" />
              <p className="font-serif text-lg font-bold text-[#1C1C1C]">No orders found</p>
              <p className="text-xs text-[#87967E] font-sans">
                Try modifying your search or filter settings.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans divide-y divide-[#E8DFC9]">
                <thead className="bg-[#FCF8F3] text-[#87967E] font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Order ID &amp; Date</th>
                    <th className="py-3.5 px-4">Customer Details</th>
                    <th className="py-3.5 px-4">Items</th>
                    <th className="py-3.5 px-4">Amount &amp; Payment</th>
                    <th className="py-3.5 px-4">Courier &amp; Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DFC9]">
                  {filteredOrders.map((order) => {
                    const isPaid = order.payment?.status === "paid";
                    return (
                      <tr key={order.id} className="hover:bg-[#FCF8F3]/60 transition-colors">
                        {/* ID & Date */}
                        <td className="py-4 px-4 align-top">
                          <Link
                            href={`/track-order?id=${order.id}`}
                            className="font-mono text-xs font-bold text-[#103B27] hover:underline flex items-center gap-1"
                          >
                            <span>{order.id}</span>
                            <ExternalLink className="w-3 h-3 text-[#87967E]" />
                          </Link>
                          <p className="text-[11px] text-[#87967E] mt-0.5">
                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </td>

                        {/* Customer */}
                        <td className="py-4 px-4 align-top max-w-[200px]">
                          <p className="font-semibold text-[#1C1C1C]">{order.customer?.fullName}</p>
                          <p className="text-[11px] text-[#87967E] font-mono">{order.customer?.mobile}</p>
                          <p className="text-[11px] text-[#87967E] truncate mt-0.5">
                            {order.customer?.city}, {order.customer?.state} ({order.customer?.pincode})
                          </p>
                        </td>

                        {/* Items */}
                        <td className="py-4 px-4 align-top">
                          <div className="space-y-1">
                            {order.items?.map((it: any, i: number) => (
                              <div key={i} className="flex items-center gap-2">
                                <span className="font-semibold text-[#103B27]">{it.quantity}×</span>
                                <span className="text-[#1C1C1C] truncate max-w-[160px]">{it.name}</span>
                              </div>
                            ))}
                          </div>
                        </td>

                        {/* Amount & Payment */}
                        <td className="py-4 px-4 align-top">
                          <p className="font-serif text-sm font-bold text-[#103B27]">
                            ₹{order.total?.toLocaleString("en-IN")}
                          </p>
                          <div className="mt-1 flex items-center gap-1.5">
                            <span
                              className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                isPaid
                                  ? "bg-[#2E7D32]/10 text-[#2E7D32]"
                                  : "bg-[#B28A58]/15 text-[#B28A58]"
                              }`}
                            >
                              {isPaid ? "PAID" : order.payment?.method?.toUpperCase() || "PENDING"}
                            </span>
                            <span className="text-[10px] text-[#87967E] uppercase">
                              {order.payment?.provider || order.payment?.method}
                            </span>
                          </div>
                        </td>

                        {/* Courier & Status */}
                        <td className="py-4 px-4 align-top">
                          <div className="space-y-1">
                            <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#103B27]/10 text-[#103B27]">
                              {order.status}
                            </span>
                            <p className="text-[11px] text-[#87967E]">
                              {order.courier}: <span className="font-mono text-[#103B27]">{order.awb}</span>
                            </p>
                          </div>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-4 px-4 align-top text-right">
                          <div className="flex flex-col items-end gap-1.5">
                            {/* Update Status Dropdown / Quick Button */}
                            <select
                              value={order.status}
                              disabled={updatingId === order.id}
                              onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                              className="px-2 py-1 bg-[#FCF8F3] border border-[#E8DFC9] rounded text-[11px] font-sans text-[#103B27] focus:outline-none cursor-pointer"
                            >
                              <option value="Order Placed">Order Placed</option>
                              <option value="Payment Received">Payment Received</option>
                              <option value="Packed">Packed</option>
                              <option value="Dispatched">Dispatched</option>
                              <option value="In Transit">In Transit</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>

                            {/* WhatsApp Direct Chat */}
                            <a
                              href={`https://wa.me/91${order.customer?.mobile.replace(/\D/g, "")}?text=Hello%20${encodeURIComponent(
                                order.customer?.fullName
                              )}%2C%20this%20is%20Rugby%20White%20Skincare%20regarding%20your%20order%20${order.id}.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-[#25D366] hover:underline"
                            >
                              <WhatsAppIcon className="w-3 h-3 fill-[#25D366]" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

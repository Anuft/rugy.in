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
  Lock,
  LogOut,
  AlertCircle,
  Eye,
  Edit2,
  Save,
  Check,
  X,
  Layers,
  UserCheck,
  Phone,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";

export default function AdminDashboardPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [adminToken, setAdminToken] = useState<string>("");

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<"logins" | "orders" | "inventory">("logins");

  // Customer Logins State
  const [customerLogins, setCustomerLogins] = useState<any[]>([]);
  const [filteredLogins, setFilteredLogins] = useState<any[]>([]);
  const [isLoadingLogins, setIsLoadingLogins] = useState(false);
  const [loginSearchQuery, setLoginSearchQuery] = useState("");

  // Orders State
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>("ALL");
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [activeModalOrder, setActiveModalOrder] = useState<any | null>(null);
  const [editingAwb, setEditingAwb] = useState<string>("");
  const [statusUpdateMessage, setStatusUpdateMessage] = useState<string | null>(null);

  // Inventory State
  const [inventory, setInventory] = useState<any[]>([]);
  const [isLoadingInventory, setIsLoadingInventory] = useState(false);
  const [savingProductId, setSavingProductId] = useState<string | null>(null);
  const [inventorySuccessMessage, setInventorySuccessMessage] = useState<string | null>(null);

  const fetchCustomerLogins = async () => {
    setIsLoadingLogins(true);
    try {
      const res = await fetch("/api/customer-logins");
      const data = await res.json();
      if (data.success) {
        setCustomerLogins(data.logins);
        setFilteredLogins(data.logins);
      }
    } catch (err) {
      console.error("Error fetching logins:", err);
    } finally {
      setIsLoadingLogins(false);
    }
  };

  useEffect(() => {
    if (!loginSearchQuery.trim()) {
      setFilteredLogins(customerLogins);
      return;
    }
    const q = loginSearchQuery.toLowerCase();
    setFilteredLogins(
      customerLogins.filter(
        (item) =>
          item.mobileNumber.toLowerCase().includes(q) ||
          item.formattedNumber?.toLowerCase().includes(q) ||
          item.fullName?.toLowerCase().includes(q) ||
          item.firstSignInFormatted?.toLowerCase().includes(q)
      )
    );
  }, [loginSearchQuery, customerLogins]);

  // 1. Check existing authentication on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("rugby_admin_token") || "";
    if (savedToken) {
      setAdminToken(savedToken);
      verifySavedToken(savedToken);
    } else {
      setAuthChecking(false);
    }
  }, []);

  const verifySavedToken = async (token: string) => {
    try {
      const res = await fetch("/api/admin/auth", {
        headers: { "x-admin-key": token },
      });
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        fetchCustomerLogins();
        fetchOrders(token);
        fetchInventory(token);
      } else {
        localStorage.removeItem("rugby_admin_token");
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setAuthChecking(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();

      if (data.success && data.token) {
        localStorage.setItem("rugby_admin_token", data.token);
        setAdminToken(data.token);
        setIsAuthenticated(true);
        fetchCustomerLogins();
        fetchOrders(data.token);
        fetchInventory(data.token);
      } else {
        setLoginError(data.error || "Incorrect admin password.");
      }
    } catch {
      setLoginError("Failed to authenticate. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("rugby_admin_token");
    setAdminToken("");
    setIsAuthenticated(false);
  };

  // 2. Fetch Orders
  const fetchOrders = async (token?: string) => {
    const key = token || adminToken;
    setIsLoadingOrders(true);
    try {
      const res = await fetch("/api/orders", {
        headers: { "x-admin-key": key },
      });
      const data = await res.json();
      if (data.success && data.orders) {
        setOrders(data.orders);
        setFilteredOrders(data.orders);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  // 3. Fetch Inventory
  const fetchInventory = async (token?: string) => {
    const key = token || adminToken;
    setIsLoadingInventory(true);
    try {
      const res = await fetch("/api/admin/inventory", {
        headers: { "x-admin-key": key },
      });
      const data = await res.json();
      if (data.success && data.items) {
        setInventory(data.items);
      }
    } catch (err) {
      console.error("Failed to fetch inventory:", err);
    } finally {
      setIsLoadingInventory(false);
    }
  };

  // 4. Filter logic
  useEffect(() => {
    let result = orders;

    if (selectedStatus !== "ALL") {
      result = result.filter((o) => o.status === selectedStatus);
    }

    if (selectedPaymentStatus !== "ALL") {
      if (selectedPaymentStatus === "PAID") {
        result = result.filter((o) => o.payment?.status === "paid");
      } else if (selectedPaymentStatus === "PENDING") {
        result = result.filter((o) => o.payment?.status !== "paid");
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customer?.fullName?.toLowerCase().includes(q) ||
          o.customer?.mobile?.includes(q) ||
          o.customer?.city?.toLowerCase().includes(q) ||
          (o.awb && o.awb.toLowerCase().includes(q)) ||
          (o.payment?.razorpayPaymentId && o.payment.razorpayPaymentId.toLowerCase().includes(q))
      );
    }

    setFilteredOrders(result);
  }, [orders, selectedStatus, selectedPaymentStatus, searchQuery]);

  // 5. Update order status
  const handleUpdateStatus = async (orderId: string, newStatus: string, awbCode?: string) => {
    setUpdatingOrderId(orderId);
    setStatusUpdateMessage(null);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminToken,
        },
        body: JSON.stringify({
          status: newStatus,
          awb: awbCode || undefined,
        }),
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? data.order : o)));
        if (activeModalOrder && activeModalOrder.id === orderId) {
          setActiveModalOrder(data.order);
        }
        setStatusUpdateMessage(`Order #${orderId} updated to ${newStatus}`);
        setTimeout(() => setStatusUpdateMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // 6. Update inventory
  const handleUpdateInventoryItem = async (item: any) => {
    setSavingProductId(item.id);
    setInventorySuccessMessage(null);
    try {
      const res = await fetch("/api/admin/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminToken,
        },
        body: JSON.stringify({
          id: item.id,
          stock: item.stock,
          inStock: item.inStock,
          price: item.price,
        }),
      });
      const data = await res.json();
      if (data.success && data.item) {
        setInventory((prev) =>
          prev.map((i) => (i.id === item.id ? data.item : i))
        );
        try {
          localStorage.setItem("rugby_live_price", String(item.price));
          localStorage.setItem("rugby_live_instock", String(Boolean(item.inStock && item.stock > 0)));
          localStorage.setItem("rugby_live_stock", String(item.stock));
          window.dispatchEvent(new Event("storage"));
        } catch {}
        const statusText = item.inStock && item.stock > 0 ? "IN STOCK" : "OUT OF STOCK";
        setInventorySuccessMessage(`Saved changes for ${item.name} (${statusText} · ₹${item.price})`);
        setTimeout(() => setInventorySuccessMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to update inventory item:", err);
    } finally {
      setSavingProductId(null);
    }
  };

  // Metrics calculation
  const totalRevenue = orders
    .filter((o) => o.payment?.status === "paid")
    .reduce((sum, o) => sum + (o.total || 0), 0);
  const paidCount = orders.filter((o) => o.payment?.status === "paid").length;
  const pendingCount = orders.filter((o) => o.payment?.status !== "paid").length;
  const processingCount = orders.filter((o) => o.status === "Processing").length;

  // -------------------------------------------------------------
  // Screen: Loading Auth
  // -------------------------------------------------------------
  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#FEF7FB] flex items-center justify-center p-6 text-center">
        <RefreshCw className="w-8 h-8 text-[#581527] animate-spin mb-4" />
        <p className="font-serif text-lg text-[#581527]">Verifying Administrator Session...</p>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Screen: Admin Login
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FEF7FB] flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#F4CEDF] p-8 sm:p-10 shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-[#581527] text-white flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-8 h-8 stroke-[1.5]" />
            </div>
            <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#AE3E64] font-bold block pt-2">
              RUGBY WHITE CONTROL PANEL
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#581527]">
              Admin Authentication
            </h1>
            <p className="font-sans text-xs text-[#8A304C]">
              Enter your master secret key to access order fulfillment and stock control.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-sans flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-bold text-[#581527] uppercase tracking-wider block">
                Master Admin Password
              </label>
              <input
                type="password"
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-[#FEF7FB] border border-[#F4CEDF] rounded-xl text-sm font-sans focus:outline-none focus:border-[#581527]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-4 rounded-xl bg-[#581527] hover:bg-[#3F0E1B] text-white text-xs font-sans tracking-[0.2em] uppercase font-bold transition-all shadow-md cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#EA90B5]" />
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#EA90B5]" />
                  <span>UNLOCK DASHBOARD</span>
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-xs font-sans text-[#8A304C] hover:text-[#581527] underline"
            >
              ← Back to Rugby White Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Screen: Authenticated Dashboard
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#FEF7FB] text-[#1C1C1C] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#F4CEDF] gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#AE3E64] font-bold">
                STORE BACKOFFICE
              </span>
              <span className="text-[10px] font-sans font-bold bg-[#059669]/10 text-[#059669] px-2 py-0.5 rounded-full">
                LIVE PRODUCTION
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#581527] font-bold mt-1">
              Fulfillment &amp; Inventory Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                fetchCustomerLogins();
                fetchOrders();
                fetchInventory();
              }}
              className="px-4 py-2.5 rounded-xl border border-[#F4CEDF] bg-white text-[#581527] hover:bg-[#FEF7FB] text-xs font-sans font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingOrders || isLoadingLogins ? "animate-spin" : ""}`} />
              <span>Sync</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-white border border-[#F4CEDF] text-[#AE3E64] hover:bg-red-50 text-xs font-sans font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Status Toast Alert */}
        {statusUpdateMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{statusUpdateMessage}</span>
          </div>
        )}

        {inventorySuccessMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{inventorySuccessMessage}</span>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#F4CEDF] shadow-xs space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#8A304C] font-semibold block">Client Sign-Ins</span>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#581527]">
              {customerLogins.length}
            </p>
            <p className="text-[11px] text-[#059669] font-medium flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5" />
              <span>First Sign Records Saved</span>
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#F4CEDF] shadow-xs space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#8A304C] font-semibold block">Latest Sign-In</span>
            <p className="font-serif text-base sm:text-lg font-bold text-[#059669] truncate">
              {customerLogins[0]?.formattedNumber || "No Sign-ins"}
            </p>
            <p className="text-[11px] text-[#8A304C] truncate">
              {customerLogins[0]?.firstSignInFormatted || "Awaiting first login"}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#F4CEDF] shadow-xs space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#8A304C] font-semibold block">Total Revenue</span>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#581527]">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </p>
            <p className="text-[11px] text-[#059669] font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Razorpay Verified</span>
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#F4CEDF] shadow-xs space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#8A304C] font-semibold block">Total Inquiries</span>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#581527]">
              {orders.length}
            </p>
            <p className="text-[11px] text-[#8A304C]">{pendingCount} pending payment</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#F4CEDF] gap-6 sm:gap-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("logins")}
            className={`pb-3 text-sm font-sans font-bold uppercase tracking-wider cursor-pointer border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "logins"
                ? "border-[#581527] text-[#581527]"
                : "border-transparent text-[#8A304C] hover:text-[#581527]"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Customer Sign-In Records ({customerLogins.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 text-sm font-sans font-bold uppercase tracking-wider cursor-pointer border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "orders"
                ? "border-[#581527] text-[#581527]"
                : "border-transparent text-[#8A304C] hover:text-[#581527]"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Customer Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("inventory")}
            className={`pb-3 text-sm font-sans font-bold uppercase tracking-wider cursor-pointer border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "inventory"
                ? "border-[#581527] text-[#581527]"
                : "border-transparent text-[#8A304C] hover:text-[#581527]"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Product Inventory &amp; Stock</span>
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB: CUSTOMER SIGN-IN RECORDS (FIRST SIGN TIME RECORD) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "logins" && (
          <div className="space-y-6">
            {/* Search and Quick Info */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#F4CEDF] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#8A304C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by customer mobile number, name, or first sign date..."
                  value={loginSearchQuery}
                  onChange={(e) => setLoginSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FEF7FB] border border-[#F4CEDF] rounded-xl text-xs font-sans focus:outline-none focus:border-[#581527]"
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-sans text-[#8A304C]">
                <ShieldCheck className="w-4 h-4 text-[#059669]" />
                <span>Showing {filteredLogins.length} of {customerLogins.length} verified sign-in records</span>
              </div>
            </div>

            {/* Logins Table */}
            <div className="bg-white rounded-2xl border border-[#F4CEDF] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FEF7FB] border-b border-[#F4CEDF] text-[#8A304C] uppercase tracking-wider text-[11px] font-sans">
                      <th className="py-3.5 px-4 sm:px-6 font-semibold">Customer / Mobile</th>
                      <th className="py-3.5 px-4 font-semibold">First Sign-In Time (Record)</th>
                      <th className="py-3.5 px-4 font-semibold">Last Active</th>
                      <th className="py-3.5 px-4 font-semibold text-center">Logins</th>
                      <th className="py-3.5 px-4 font-semibold">Auth Method</th>
                      <th className="py-3.5 px-4 sm:px-6 font-semibold text-right">WhatsApp Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4CEDF]/60 text-xs font-sans">
                    {isLoadingLogins ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-[#8A304C]">
                          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#581527]" />
                          <span>Loading sign-in records...</span>
                        </td>
                      </tr>
                    ) : filteredLogins.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-[#8A304C]">
                          <UserCheck className="w-8 h-8 mx-auto mb-2 text-[#AE3E64]" />
                          <p className="font-semibold text-sm text-[#581527]">No customer sign-in records found</p>
                          <p className="text-xs text-gray-500 mt-1">When customers sign in with their mobile number and OTP, their first sign-in timestamp will be recorded here.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredLogins.map((record) => (
                        <tr key={record.id} className="hover:bg-[#FEF7FB]/50 transition-colors">
                          <td className="py-4 px-4 sm:px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-[#581527] text-white flex items-center justify-center font-bold text-xs shrink-0">
                                {record.fullName ? record.fullName.charAt(0).toUpperCase() : "M"}
                              </div>
                              <div>
                                <span className="font-bold text-[#581527] block">
                                  {record.fullName || "Verified Client"}
                                </span>
                                <span className="text-[#8A304C] font-mono text-[11px] flex items-center gap-1">
                                  <Phone className="w-3 h-3 text-[#AE3E64]" />
                                  {record.formattedNumber || record.mobileNumber}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* First Sign-in Record */}
                          <td className="py-4 px-4">
                            <div className="space-y-0.5">
                              <span className="font-bold text-[#581527] flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-[#059669]" />
                                {record.firstSignInFormatted || "First Sign Recorded"}
                              </span>
                              <span className="inline-block text-[9px] font-sans font-bold uppercase tracking-wider text-[#059669] bg-[#059669]/10 px-2 py-0.5 rounded-full">
                                First Sign Saved
                              </span>
                            </div>
                          </td>

                          {/* Last Active */}
                          <td className="py-4 px-4 text-[#8A304C]">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-gray-400" />
                              {record.lastSignInFormatted || record.firstSignInFormatted}
                            </span>
                          </td>

                          {/* Login Count */}
                          <td className="py-4 px-4 text-center">
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#FDEAF3] text-[#581527] font-bold text-xs">
                              {record.loginCount || 1}
                            </span>
                          </td>

                          {/* Verification */}
                          <td className="py-4 px-4">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#059669] bg-[#059669]/10 px-2.5 py-1 rounded-full">
                              <CheckCircle2 className="w-3 h-3" />
                              {record.method || "OTP Verified"}
                            </span>
                          </td>

                          {/* Action */}
                          <td className="py-4 px-4 sm:px-6 text-right">
                            <a
                              href={`https://wa.me/91${record.mobileNumber.replace(/\D/g, "").slice(-10)}?text=${encodeURIComponent(
                                `Hello ${record.fullName || "Client"}! 🌿 Thank you for signing in at Rugby White. How can our concierge assist with your night skincare ritual today?`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-[11px] uppercase tracking-wider transition-all shadow-xs"
                            >
                              <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                              <span>Chat on WhatsApp</span>
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: CUSTOMER ORDERS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            
            {/* Search and Filters Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#F4CEDF] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              
              {/* Search */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#8A304C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by Order ID, Name, Mobile, City, AWB, or Payment ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FEF7FB] border border-[#F4CEDF] rounded-xl text-xs font-sans focus:outline-none focus:border-[#581527]"
                />
              </div>

              {/* Status Filter Dropdown */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs font-sans text-[#8A304C]">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Status:</span>
                </div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 bg-[#FEF7FB] border border-[#F4CEDF] rounded-xl text-xs font-sans text-[#581527] font-semibold cursor-pointer focus:outline-none"
                >
                  <option value="ALL">All Order Statuses</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <select
                  value={selectedPaymentStatus}
                  onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                  className="px-3 py-2 bg-[#FEF7FB] border border-[#F4CEDF] rounded-xl text-xs font-sans text-[#581527] font-semibold cursor-pointer focus:outline-none"
                >
                  <option value="ALL">All Payments</option>
                  <option value="PAID">Paid Only</option>
                  <option value="PENDING">Pending Only</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-[#F4CEDF] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans border-collapse">
                  <thead>
                    <tr className="bg-[#FEF7FB] border-b border-[#F4CEDF] text-[#8A304C] uppercase tracking-wider text-[11px]">
                      <th className="py-3.5 px-4 font-bold">Order ID</th>
                      <th className="py-3.5 px-4 font-bold">Customer</th>
                      <th className="py-3.5 px-4 font-bold">Items &amp; Total</th>
                      <th className="py-3.5 px-4 font-bold">Payment</th>
                      <th className="py-3.5 px-4 font-bold">Fulfillment Status</th>
                      <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4CEDF]">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-[#8A304C]">
                          No orders matched your search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => {
                        const isPaid = order.payment?.status === "paid";
                        return (
                          <tr key={order.id} className="hover:bg-[#FEF7FB]/50 transition-colors">
                            {/* Order ID & Date */}
                            <td className="py-4 px-4 align-top">
                              <span className="font-mono font-bold text-sm text-[#581527] block">
                                #{order.id}
                              </span>
                              <span className="text-[10px] text-[#8A304C] block mt-0.5">
                                {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "N/A"}
                              </span>
                            </td>

                            {/* Customer Details */}
                            <td className="py-4 px-4 align-top space-y-0.5">
                              <p className="font-semibold text-[#1C1C1C] text-sm">
                                {order.customer?.fullName || "Guest Customer"}
                              </p>
                              <a
                                href={`tel:+91${order.customer?.mobile}`}
                                className="text-[11px] text-[#581527] hover:underline block font-mono"
                              >
                                +91 {order.customer?.mobile}
                              </a>
                              <p className="text-[11px] text-[#777]">
                                {order.customer?.city}, {order.customer?.state} - {order.customer?.pincode}
                              </p>
                            </td>

                            {/* Items & Total */}
                            <td className="py-4 px-4 align-top">
                              <span className="font-bold text-sm text-[#581527] block">
                                ₹{order.total?.toLocaleString("en-IN")}
                              </span>
                              <span className="text-[11px] text-[#8A304C] block mt-0.5">
                                {order.items?.length || 0} items ({order.items?.reduce((s: number, i: any) => s + (i.quantity || 1), 0)} units)
                              </span>
                            </td>

                            {/* Payment Status */}
                            <td className="py-4 px-4 align-top">
                              {isPaid ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#059669]/10 text-[#059669] uppercase tracking-wider">
                                  <Check className="w-3 h-3" />
                                  <span>PAID (RAZORPAY)</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wider">
                                  <Clock className="w-3 h-3" />
                                  <span>PENDING</span>
                                </span>
                              )}
                              {order.payment?.razorpayPaymentId && (
                                <span className="font-mono text-[10px] text-[#8A304C] block mt-1">
                                  {order.payment.razorpayPaymentId}
                                </span>
                              )}
                            </td>

                            {/* Order Status Dropdown */}
                            <td className="py-4 px-4 align-top">
                              <select
                                value={order.status}
                                disabled={updatingOrderId === order.id}
                                onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                className="px-3 py-1.5 bg-[#FEF7FB] border border-[#F4CEDF] rounded-lg text-xs font-semibold text-[#581527] cursor-pointer focus:outline-none"
                              >
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                              {order.awb && (
                                <span className="font-mono text-[10px] text-[#8A304C] block mt-1">
                                  AWB: {order.awb}
                                </span>
                              )}
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-4 align-top text-right">
                              <button
                                onClick={() => {
                                  setActiveModalOrder(order);
                                  setEditingAwb(order.awb || "");
                                }}
                                className="px-3 py-1.5 rounded-lg border border-[#581527] text-[#581527] hover:bg-[#581527] hover:text-white transition-colors text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Details</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: PRODUCT INVENTORY & STOCK MANAGEMENT */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "inventory" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#F4CEDF] p-6 shadow-xs space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#581527]">
                  Live Store Catalog &amp; Stock Levels
                </h3>
                <p className="text-xs font-sans text-[#8A304C] mt-1">
                  Adjust current warehouse stock numbers or toggle in-stock availability instantly across the website.
                </p>
              </div>

              <div className="divide-y divide-[#F4CEDF]">
                {inventory.map((item) => {
                  const isSaving = savingProductId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="py-5 first:pt-0 last:pb-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-sans text-xs"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-[#FEF7FB] rounded-xl border border-[#F4CEDF] p-1 relative flex-shrink-0">
                          <Image
                            src="/images/rugby-skin-revival-jar.png"
                            alt={item.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-serif text-base font-bold text-[#581527]">{item.name}</p>
                          <p className="text-[11px] text-[#8A304C]">Product ID: <span className="font-mono font-semibold">{item.id}</span></p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        {/* Price */}
                        <div>
                          <label className="text-[10px] uppercase font-bold text-[#8A304C] block mb-1">
                            Price (₹)
                          </label>
                          <input
                            type="number"
                            value={item.price}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              setInventory((prev) =>
                                prev.map((i) => (i.id === item.id ? { ...i, price: val } : i))
                              );
                            }}
                            className="w-24 px-3 py-1.5 bg-[#FEF7FB] border border-[#F4CEDF] rounded-lg font-bold text-[#581527] focus:outline-none"
                          />
                        </div>

                        {/* Stock Units */}
                        <div>
                          <label className="text-[10px] uppercase font-bold text-[#8A304C] block mb-1">
                            Stock Units
                          </label>
                          <input
                            type="number"
                            value={item.stock}
                            onChange={(e) => {
                              const val = parseInt(e.target.value, 10) || 0;
                              setInventory((prev) =>
                                prev.map((i) => (i.id === item.id ? { ...i, stock: val } : i))
                              );
                            }}
                            className="w-24 px-3 py-1.5 bg-[#FEF7FB] border border-[#F4CEDF] rounded-lg font-bold text-[#581527] focus:outline-none"
                          />
                        </div>

                        {/* Availability Toggle */}
                        <div>
                          <label className="text-[10px] uppercase font-bold text-[#8A304C] block mb-1">
                            Status
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setInventory((prev) =>
                                prev.map((i) =>
                                  i.id === item.id ? { ...i, inStock: !i.inStock } : i
                                )
                              );
                            }}
                            className={`px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider cursor-pointer border ${
                              item.inStock
                                ? "bg-[#059669]/10 text-[#059669] border-[#059669]/20"
                                : "bg-red-50 text-red-700 border-red-200"
                            }`}
                          >
                            {item.inStock ? "IN STOCK" : "OUT OF STOCK"}
                          </button>
                        </div>

                        {/* Save Button */}
                        <div className="pt-4 md:pt-0">
                          <button
                            onClick={() => handleUpdateInventoryItem(item)}
                            disabled={isSaving}
                            className="px-4 py-2 rounded-lg bg-[#581527] hover:bg-[#3F0E1B] text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60"
                          >
                            {isSaving ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#EA90B5]" />
                            ) : (
                              <Save className="w-3.5 h-3.5 text-[#EA90B5]" />
                            )}
                            <span>Save</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ------------------------------------------------------------- */}
      {/* ORDER DETAILS MODAL */}
      {/* ------------------------------------------------------------- */}
      {activeModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl border border-[#F4CEDF] shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#F4CEDF]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#AE3E64] tracking-widest block">ORDER INSPECTION</span>
                <h3 className="font-serif text-2xl font-bold text-[#581527]">#{activeModalOrder.id}</h3>
              </div>
              <button
                onClick={() => setActiveModalOrder(null)}
                className="p-2 text-[#8A304C] hover:text-[#581527] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Shipping Details */}
            <div className="bg-[#FEF7FB] p-4 rounded-xl border border-[#F4CEDF] text-xs font-sans space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-[#581527] text-[11px]">Customer &amp; Delivery Destination</h4>
              <p><strong>Name:</strong> {activeModalOrder.customer?.fullName}</p>
              <p><strong>Mobile:</strong> <a href={`tel:+91${activeModalOrder.customer?.mobile}`} className="text-[#581527] underline">+91 {activeModalOrder.customer?.mobile}</a></p>
              <p><strong>Email:</strong> <a href={`mailto:${activeModalOrder.customer?.email}`} className="text-[#581527] underline">{activeModalOrder.customer?.email}</a></p>
              <p><strong>Address:</strong> {activeModalOrder.customer?.address}, {activeModalOrder.customer?.city}, {activeModalOrder.customer?.state} - {activeModalOrder.customer?.pincode}</p>
              {activeModalOrder.customer?.orderNotes && (
                <p><strong>Special Instructions:</strong> {activeModalOrder.customer.orderNotes}</p>
              )}
            </div>

            {/* Products Table */}
            <div>
              <h4 className="font-bold uppercase tracking-wider text-[#581527] text-xs font-sans mb-3">Items Ordered</h4>
              <div className="space-y-3 divide-y divide-[#F4CEDF] text-xs font-sans">
                {activeModalOrder.items?.map((item: any) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between">
                    <div>
                      <p className="font-serif font-bold text-[#581527] text-sm">{item.name}</p>
                      <p className="text-[#8A304C]">Qty: {item.quantity} {item.netWeight ? `• ${item.netWeight}` : ""}</p>
                    </div>
                    <span className="font-bold text-[#581527]">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 mt-3 border-t border-[#F4CEDF] flex justify-between font-bold text-base text-[#581527] font-serif">
                <span>Total Amount Paid</span>
                <span>₹{activeModalOrder.total?.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Payment Verification Data */}
            <div className="p-4 rounded-xl bg-[#FDEAF3] text-xs font-sans space-y-1 text-[#581527]">
              <h4 className="font-bold uppercase tracking-wider text-[11px]">Payment Gateway Record</h4>
              <p><strong>Provider:</strong> Razorpay</p>
              <p><strong>Status:</strong> {activeModalOrder.payment?.status?.toUpperCase() || "PENDING"}</p>
              <p><strong>Razorpay Order ID:</strong> <span className="font-mono">{activeModalOrder.razorpay_order_id || activeModalOrder.payment?.razorpayOrderId || "N/A"}</span></p>
              <p><strong>Razorpay Payment ID:</strong> <span className="font-mono">{activeModalOrder.razorpay_payment_id || activeModalOrder.payment?.razorpayPaymentId || activeModalOrder.payment?.transactionId || "N/A"}</span></p>
            </div>

            {/* AWB & Fulfillment Controls */}
            <div className="space-y-3 pt-2 border-t border-[#F4CEDF] text-xs font-sans">
              <h4 className="font-bold uppercase tracking-wider text-[#581527] text-[11px]">Courier Tracking &amp; Status</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#8A304C] mb-1">Fulfillment Status</label>
                  <select
                    value={activeModalOrder.status}
                    onChange={(e) => handleUpdateStatus(activeModalOrder.id, e.target.value, editingAwb)}
                    className="w-full px-3 py-2 bg-[#FEF7FB] border border-[#F4CEDF] rounded-lg font-bold text-[#581527]"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#8A304C] mb-1">AWB Tracking Number</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingAwb}
                      onChange={(e) => setEditingAwb(e.target.value)}
                      placeholder="e.g. BD982736412IN"
                      className="w-full px-3 py-2 bg-[#FEF7FB] border border-[#F4CEDF] rounded-lg font-mono font-bold text-[#581527]"
                    />
                    <button
                      onClick={() => handleUpdateStatus(activeModalOrder.id, activeModalOrder.status, editingAwb)}
                      className="px-3 py-2 bg-[#581527] text-white rounded-lg font-bold text-xs"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#F4CEDF]">
              <button
                onClick={() => setActiveModalOrder(null)}
                className="px-6 py-2.5 rounded-full bg-[#581527] text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

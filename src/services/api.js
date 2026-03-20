// ====================== CONFIG ======================
export const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:3000";


console.log("🌐 Using API base:", API_BASE);



// ====================== SESSION HANDLING ======================
function getSession() {
  try {
    const raw = sessionStorage.getItem("awa-ss");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getCurrentUser() {
  return getSession()?.user || null;
}

export function getToken() {
  return getSession()?.token || null;
}

export function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}


export async function loginL({ email, password }) {
  const res = await fetch(`${API_BASE}/local/system/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    alert(data.message);
  }
  const ONE_HOUR_MS = 60 * 60 * 1000;
  const expiresAt = Date.now() + ONE_HOUR_MS;
  sessionStorage.setItem(
    "awa-ss",
    JSON.stringify({ user: data.data, token: data.token, expiresAt })
  );
  return data;
}

export function logoutUser() {
  sessionStorage.removeItem("awa-ss");
}

export async function signupL({ name, email, password, role }) {
  const res = await fetch(`${API_BASE}/local/system/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  });
  const data = await res.json();
  if (!res.ok || !data.success)
    throw new Error(data.message || "Register failed");
  return data;
}

export async function getItems() {
  const res = await fetch(`${API_BASE}/local/user/get-items`);
  if (!res.ok) throw new Error(data.message || "Get products failed");
  const data = await res.json();
  return data;
}

export async function submitNewItem(item) {
  const res = await fetch(`${API_BASE}/local/user/create-new-item`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error(data.message || "Submit new item failed");
  const data = await res.json();
  return data;
}



// ====================== FILE UPLOAD ======================

/**
 * Upload một file lên Supabase thông qua backend
 * @param {File} file - File cần upload (từ input type="file")
 * @returns {Promise<string>} URL public của file
 */
export async function upFileToStorage(file) {
  if (!file) throw new Error("No file provided");
  console.log("API_BASE =", API_BASE);

  // FormData chứa file
  const formData = new FormData();
  formData.append("file", file);

  // Gọi API upload
  const res = await fetch(`${API_BASE}/local/system/upload`, {
    method: "POST",
    headers: {
      ...authHeaders(), // nếu cần xác thực token
      // ❌ KHÔNG thêm Content-Type, fetch sẽ tự set multipart boundary
    },
    body: formData,
  });

  const data = await res.json();
  console.log(data);
  if (!res.ok || !data.success) {
    console.error("❌ Upload failed:", data);
    throw new Error(data.message || "Failed to upload file");
  }

  // Backend nên trả về: { success: true, file_url: "https://..." }
  return data.publicUrl;
}

export async function deleteItem(id) {
  const res = await fetch(`${API_BASE}/local/user/delete-item-by-id/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Delete item failed");
  return data;
}

export async function updateItem(id, item) {
  const res = await fetch(`${API_BASE}/local/user/update-item-by-id/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Update item failed");
  return data;
}
export async function getItemById(id) {
  const res = await fetch(`${API_BASE}/local/user/get-item-by-id/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Get item failed");
  return data;
}

// ====================== CONTACTS ======================

export async function submitContact(contactData) {
  const res = await fetch(`${API_BASE}/local/user/send-contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contactData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Gửi liên hệ thất bại");
  return data;
}

export async function getContacts() {
  const res = await fetch(`${API_BASE}/local/user/get-contacts`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Lấy danh sách liên hệ thất bại");
  return data;
}

export async function updateContactStatus(id, status) {
  const res = await fetch(`${API_BASE}/local/user/update-contact-status/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Cập nhật trạng thái thất bại");
  return data;
}

export async function deleteContact(id) {
  const res = await fetch(`${API_BASE}/local/user/delete-contact/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Xóa liên hệ thất bại");
  return data;
}

export async function updateProfile(id, profileData) {
  const res = await fetch(`${API_BASE}/local/system/update-profile/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profileData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Cập nhật hồ sơ thất bại");
  return data;
}

export async function submitOrder(orderData) {
  const res = await fetch(`${API_BASE}/local/user/submit-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Gửi đơn hàng thất bại");
  return data;
}
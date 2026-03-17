const User = require("../../model/local/user.model");

const { logLogin } = require("../../utils/authLogger");
const { writeFile, readFile } = require("../../utils/fileStore.js");
// const bcrypt = require("bcrypt");


// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * REGISTER NEW USER
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const existed = User.findByEmail(email);
    console.log("Checking existing user for email:", email, "Found:", !!existed);
    if (existed) {
      return res.status(400).json({
        success: false,
        message: "Email đã tồn tại",
      });
    }
    console.log("Creating user with:", { name, email, password });
    const user = new User({
      name,
      email,
      password,
      role: "admin",
      status: "Active",
      credit: 0
    });

    user.save();
    console.log("User registered:", { id: user._id, email: user.email, role: user.role });
    const { password: _, ...safeUser } = user;

    res.json({
      success: true,
      message: "Đăng ký thành công",
      user: safeUser
    });
    console.log("Registration successful for:", { email: user.email });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = User.findByEmail(email);

    if (!user || user.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Email hoặc mật khẩu không đúng",
      });
    }

    if (user.status !== "Active") {
      return res.status(403).json({
        success: false,
        message:
          user.status === "Pending"
            ? "Tài khoản đang chờ phê duyệt"
            : "Tài khoản đã bị từ chối",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "1d" }
    );

    const { password: _, ...safeUser } = user;

    logLogin({
      userId: user._id,
      email: user.email,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    res.json({
      success: true,
      user: { ...safeUser, token },
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = User.find();
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


const { supabase } = require('../../configs/supabase');
const bucketName = 'alowork-files';
const bucketName1 = 'alowork-partner';

const fsPromises = require('fs').promises;

const uploadFile = async (req, res) => {
  try {
    console.log("Upload request received");
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No file uploaded" });
    }

    // Support memory or disk: prefer buffer when available
    let fileBuffer;
    if (req.file.buffer) {
      fileBuffer = req.file.buffer;
    } else if (req.file.path) {
      fileBuffer = await fsPromises.readFile(req.file.path);
    } else {
      return res.status(400).json({ success: false, error: "Uploaded file missing buffer/path" });
    }

    const originalName = req.file.originalname || 'file';
    const contentType = req.file.mimetype || 'application/octet-stream';

    // 🧼 Làm sạch tên file
    function sanitizeFileName(name) {
      return name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9._-]/g, "_");
    }

    const safeName = sanitizeFileName(originalName);
    const fileNameOnSupabase = `jd_${Date.now()}_${safeName}`;

    // Log basic info
    console.log('Upload request:', { originalName, contentType, bufferIsBuffer: Buffer.isBuffer(fileBuffer), size: fileBuffer.length });

    // 🟢 Upload file lên Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileNameOnSupabase, fileBuffer, {
        contentType,
        upsert: true,
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return res.status(500).json({ success: false, error: uploadError.message, detail: uploadError });
    }

    // Verify we can download it back and check size
    const { data: downloaded, error: downloadError } = await supabase.storage.from(bucketName).download(fileNameOnSupabase);

    if (downloadError) {
      console.error('Supabase download after upload failed:', downloadError);
      return res.status(500).json({ success: false, error: 'Upload succeeded but download verification failed', detail: downloadError });
    }

    // Compute downloaded size
    let downloadedSize = null;
    try {
      if (Buffer.isBuffer(downloaded)) {
        downloadedSize = downloaded.length;
      } else if (downloaded.arrayBuffer) {
        const ab = await downloaded.arrayBuffer();
        downloadedSize = ab.byteLength;
      } else if (downloaded.stream) {
        // Node Readable stream - accumulate
        const chunks = [];
        for await (const chunk of downloaded) chunks.push(chunk);
        downloadedSize = Buffer.concat(chunks).length;
      }
    } catch (e) {
      console.warn('Could not compute downloaded size:', e);
    }

    // Get public URL
    const { data: publicData } = supabase.storage.from(bucketName).getPublicUrl(fileNameOnSupabase);
    const publicUrl = publicData?.publicUrl;

    // Clean up temporary disk copy if exists
    if (req.file.path) {
      try {
        await fsPromises.unlink(req.file.path);
      } catch (e) {
        console.warn('Failed to unlink temp file:', e.message);
      }
    }

    // Return detailed info for debugging
    return res.status(200).json({
      success: true,
      file: uploadData,
      publicUrl,
      uploadedSize: fileBuffer.length,
      downloadedSize,
    });

  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

const uploadFile1 = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No file uploaded" });
    }

    // Support memory or disk
    let fileBuffer1;
    if (req.file.buffer) {
      fileBuffer1 = req.file.buffer;
    } else if (req.file.path) {
      fileBuffer1 = await fsPromises.readFile(req.file.path);
    } else {
      return res.status(400).json({ success: false, error: "Uploaded file missing buffer/path" });
    }

    const originalName = req.file.originalname || 'file';
    const contentType = req.file.mimetype || 'application/octet-stream';

    function sanitizeFileName(name) {
      return name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9._-]/g, "_");
    }

    const safeName = sanitizeFileName(originalName);
    const fileNameOnSupabase = `jd_${Date.now()}_${safeName}`;

    console.log('Upload (bucket1) request:', { originalName, contentType, bufferIsBuffer: Buffer.isBuffer(fileBuffer1), size: fileBuffer1.length });

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName1)
      .upload(fileNameOnSupabase, fileBuffer1, {
        contentType,
        upsert: true,
      });

    if (uploadError) {
      console.error('Supabase upload error (bucket1):', uploadError);
      return res.status(500).json({ success: false, error: uploadError.message, detail: uploadError });
    }

    // verify by downloading back
    const { data: downloaded, error: downloadError } = await supabase.storage.from(bucketName1).download(fileNameOnSupabase);
    if (downloadError) {
      console.error('Supabase download after upload failed (bucket1):', downloadError);
      return res.status(500).json({ success: false, error: 'Upload succeeded but download verification failed', detail: downloadError });
    }

    let downloadedSize = null;
    try {
      if (Buffer.isBuffer(downloaded)) {
        downloadedSize = downloaded.length;
      } else if (downloaded.arrayBuffer) {
        const ab = await downloaded.arrayBuffer();
        downloadedSize = ab.byteLength;
      } else if (downloaded.stream) {
        const chunks = [];
        for await (const chunk of downloaded) chunks.push(chunk);
        downloadedSize = Buffer.concat(chunks).length;
      }
    } catch (e) {
      console.warn('Could not compute downloaded size (bucket1):', e);
    }

    const { data: publicData } = supabase.storage.from(bucketName1).getPublicUrl(fileNameOnSupabase);
    const publicUrl = publicData?.publicUrl;

    if (req.file.path) {
      try {
        await fsPromises.unlink(req.file.path);
      } catch (e) {
        console.warn('Failed to unlink temp file (bucket1):', e.message);
      }
    }

    return res.status(200).json({
      success: true,
      file: uploadData,
      publicUrl,
      uploadedSize: fileBuffer1.length,
      downloadedSize,
    });

  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// Debug endpoint: check downloadable size and existence of a file
const checkFile = async (req, res) => {
  try {
    const path = req.query.path;
    if (!path) return res.status(400).json({ success: false, error: 'Missing query param `path`' });

    // Try listing files in bucket (prefix search) to find metadata-like info
    const { data: files, error: listError } = await supabase.storage.from(bucketName).list('', { limit: 1000 });
    const fileMeta = Array.isArray(files) ? files.find(f => f.name === path) : null;

    // Try download to verify content bytes
    const { data: downloaded, error: downloadError } = await supabase.storage.from(bucketName).download(path);

    let downloadedSize = null;
    if (downloadError) {
      console.warn('Download error while checking file:', downloadError);
    } else {
      try {
        if (Buffer.isBuffer(downloaded)) downloadedSize = downloaded.length;
        else if (downloaded.arrayBuffer) { const ab = await downloaded.arrayBuffer(); downloadedSize = ab.byteLength; }
        else if (downloaded.stream) { const chunks = []; for await (const c of downloaded) chunks.push(c); downloadedSize = Buffer.concat(chunks).length; }
      } catch (e) {
        console.warn('Could not compute downloaded size:', e);
      }
    }

    const { data: publicData } = supabase.storage.from(bucketName).getPublicUrl(path);

    return res.json({
      success: true,
      path,
      fileMeta,
      publicUrl: publicData?.publicUrl,
      downloadedSize,
      downloadError: downloadError || null,
      listError: listError || null,
    });
  } catch (err) {
    console.error('checkFile error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}

const deleteFile = async (req, res) => {

  try {
    const { filename } = req.params;
    console.log('Request params:', filename);
    if (!filename) return res.status(400).json({ error: 'Filename is required' });

    const { data, error } = await supabase.storage.from(bucketName).remove([filename]);
    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json({ success: true, message: "File deleted", data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
const deleteFileFromSupabase = async (filename) => {
  try {
    if (!filename) return;

    const { error } = await supabase.storage
      .from(bucketName)
      .remove([filename]);

    if (error) {
      console.error("Delete file error:", error.message);
    } else {
      console.log("Deleted file:", filename);
    }
  } catch (err) {
    console.error("Delete file exception:", err.message);
  }
};
const uploadFileToSupabase = async (filename) => {
  try {
    if (!filename) return;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filename, fileBuffer, {
        contentType,
        upsert: true,
      });

    if (error) {
      console.error("Upload file error:", error.message);
    } else {
      console.log("Uploaded file:", filename);
    }
  } catch (err) {
    console.error("Upload file exception:", err.message);
  }
}
const listFiles = async (req, res) => {

  const { data, error } = await supabase.storage.from(bucketName).list('', {
    limit: 100,
    sortBy: { column: 'created_at', order: 'desc' }
  });

  if (error) return res.status(500).json({ error: error.message });
  res.json({ files: data });
}

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, credit } = req.body;

    const updated = User.updateById(id, { name, credit });
    const { password: _, ...safeUser } = updated;

    return res.json({
      success: true,
      message: "Cập nhật hồ sơ thành công",
      data: safeUser
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


module.exports = {
  register,
  login,
  getUsers,
  uploadFile,
  uploadFile1,
  checkFile,
  deleteFile,
  deleteFileFromSupabase,
  listFiles,
  uploadFileToSupabase,
  updateProfile
};
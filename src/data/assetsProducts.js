// Create "product-like" objects from every file in src/assets.
// Auto detect category theo prefix filename (hỗ trợ cả "_" và "-")

const ASSET_MODULES = import.meta.glob('../assets/*.{webp,png,jpg,jpeg,jfif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

function filenameToTitle(filename) {
  const nameNoExt = filename.replace(/\.[^.]+$/, '');
  return nameNoExt
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getPrefix(filename) {
  const nameNoExt = filename.replace(/\.[^.]+$/, '').toLowerCase();

  if (nameNoExt.includes('_')) {
    return nameNoExt.split('_')[0];
  }

  if (nameNoExt.includes('-')) {
    return nameNoExt.split('-')[0];
  }

  return 'misc';
}

function filenameToCategoryKey(filename) {
  return getPrefix(filename);
}

function filenameToCategory(filename) {
  const key = getPrefix(filename);

  const MAP = {
    bulong: 'Bu Lông',
    ocvit: 'Ốc Vít',
    khoa: 'Khóa & Chốt',
    dungcu: 'Dụng Cụ',
    dungcucokhi: 'Dụng Cụ Cơ Khí',
    vatlieu: 'Vật Liệu',
  };

  return MAP[key] || key.charAt(0).toUpperCase() + key.slice(1);
}

function filenameToCategoryEn(filename) {
  const key = getPrefix(filename);
  const MAP = {
    bulong: 'Bolts',
    ocvit: 'Screws & Nuts',
    khoa: 'Locks & Latches',
    dungcu: 'Tools',
    dungcucokhi: 'Mechanical Tools',
    vatlieu: 'Materials',
  };
  return MAP[key] || key.charAt(0).toUpperCase() + key.slice(1);
}

function getSuffix(filename) {
  const nameNoExt = filename.replace(/\.[^.]+$/, '').toLowerCase();
  if (nameNoExt.includes('_')) {
    return nameNoExt.split('_').slice(1).join('_');
  }
  if (nameNoExt.includes('-')) {
    return nameNoExt.split('-').slice(1).join('-');
  }
  return '';
}

const VI_COMBO = {
  botuocnovit: 'Bộ Tuốc Nơ Vít',
  dinhruttanrutchotchechotpin: 'Đinh rút, tán rút, chốt chẻ, chốt pin',
  longdendemphangvenh: 'Lông đền đệm phẳng vênh',
  thanhrenmongcumuno: 'Thanh ren, cùm u, bu lông nở',
  bovitinoxhopnhua: 'Bộ vít inox hộp nhựa',
  tandong: 'Tán đồng',
  bokhau: 'Bộ Khẩu',
  buacaosu: 'Búa Cao Su',
  maykhoan: 'Máy Khoan',
  thuocthang: 'Thước thẳng inox',
  thuoccuon: 'Thước Cuộn',
  thuocdo: 'Thước cặp',
  lucgiacdanang: 'Lục Giác Đa Năng',
  lucgiacchim: 'Lục Giác Chìm',
  daioc: 'Đai Ốc',
  daioclucgiac: 'Đai Ốc Lục Giác',
  longden: 'Long Đền',
  demphang: 'Đệm Phẳng',
  venh: 'Vênh',
  vitcacloai: 'Vít Các Loại',
  vit: 'Vít',
  lienphang: 'Liên Phẳng',
  bulongrensuot: 'Bulong Ren Suốt',
  bulonglucgiac: 'Bulong Lục Giác',
  matmoccau: 'Mắt Móc Cầu',
  lienketchiuluccao: 'Liên Kết Chịu Lực Cao',
  daubake: 'Đầu Bake',
  nhua: 'Ốc vít nhựa',
  inox: 'Ốc vít inox',
  occhup: 'Ốc Chụp',
  daiocchupinox: 'Đai Ốc Chụp Inox',
  daiocchupinoxbong: 'Đai Ốc Chụp Inox Bóng',
  dautroncovuong: 'Đầu Tròn Cổ Vuông',
  dinhghimkimloai: 'Đinh ghim kim loại',
  lienlongden: 'Liên Long Đền',
  dinhrut: 'Đinh Rút',
  tanrut: 'Tán Rút',
  chotche: 'Chốt Chẻ',
  chotpin: 'Chốt Pin',
  thanhren: 'Thanh Ren',
  mong: 'Mỏng',
  cumu: 'Cùm U',
  no: 'Nở',
  chot: 'Khóa móc treo',
  chot1: 'Chốt cửa ngang',
  chot2: 'Then trượt đôi',
  va: 'Và',
  chotinox: 'Khóa Gài Lò Xo',
  chotinox1: 'Khóa gài kẹp',
  kepchotkimloai: 'Khóa kẹp nhanh',
  vachot3: 'Khóa tay gạt âm cửa',
  vachot4: 'Then cài cửa có tai khóa',
  phoithep: 'Phôi Thép',
  thanhthepvuong: 'Thanh Thép Vuông',
  thanhtheptrondac: 'Thanh Thép Tròn Đặc',
  thanhthepdet: 'Thanh Thép Dẹt',
  thepgocv: 'Thép Góc V',
  thepi: 'Thép I',
  thepu: 'Thép U',
  thepcayxaydung: 'Thép Cây Xây Dựng',
  theptrondac: 'Thép Tròn Đặc',
  ongtheptron: 'Ống Thép Tròn',
  octhepchunhat: 'Ống Thép Chữ Nhật',
  theptamtron: 'Thép Tấm Tròn',
  theptamcannguoi: 'Thép Tấm Cán Nguội',
  theptamcannong: 'Thép Tấm Cán Nóng',
  ocvitdacbiet: 'Ốc Vít Đặc Biệt',
  boocvithogiadinh: 'Bộ Ốc Vít Hộ Gia Đình',
  vitlienphangvenh: 'Vít Liên Phẳng Vênh',
  bulonggiadinh: 'Bulong Gia Đình',
  bulong: 'Bulong',
  ocvit: 'Ốc Vít',
  khoa: 'Ổ khóa móc',
  cole: 'Cờ Lê',
  kim: 'Kìm',
  bua: 'Búa',
  ov: 'Ốc vít',
};

const EN_COMBO = {
  lienketchiuluccao:'High-Strength Fastener',boocvithogiadinh:'Household Screw Set',lienlongden:'Bonded Washer',nhua:'Plastic Screw',ocvitdacbiet:'Special Purpose Screw',vitlienphangvenh:'Screw with Flat & Spring Washer',bulonggiadinh:'General Purpose Bolt',daiocchupinoxbong:'Polished Stainless Steel Cap Nut',ocvit:'Screw',
  dinhghimkimloai:'Metal Staple Pin',thepcayxaydung:'Reinforcing Steel Bar (Rebar)',theptamcannguoi:'Cold Rolled Steel Sheet',theptamcannong:'Hot Rolled Steel Sheet',theptrondac:'Solid Round Steel Bar',
  botuocnovit: 'Screwdriver Set',vachot3:'Mortise Lever Lock',vachot4:'Barrel Bolt with Padlock Staple',
  dinhruttanrutchotchechotpin: 'Blind Rivet, Rivet Nut, Cotter Pin, Dowel Pin',
  longdendemphangvenh: 'Flat Washer & Spring Washer',
  thanhrenmongcumuno: 'Threaded Rod, U-Bolt, Expansion Anchor',
  bovitinoxhopnhua: 'Stainless Screw Set (Box)',
  tandong: 'Brass Drop-in Anchor',
  bokhau: 'Socket Set',
  buacaosu: 'Rubber Hammer',
  maykhoan: 'Drill Machine',
  thuocthang: 'Steel Ruler',
  thuoccuon: 'Measuring Tape',
  thuocdo: 'Vernier Caliper',
  lucgiacdanang: 'Multi Hex Key',
  lucgiacchim: 'Allen Key',
  daioc: 'Nut',
  daioclucgiac: 'Hex Nut',
  longden: 'Washer',
  demphang: 'Flat Washer',
  venh: 'Spring Washer',
  vitcacloai: 'Various Screws',
  vit: 'Screw',
  bulongrensuot: 'Fully Threaded Bolt',
  bulonglucgiac: 'Hex Bolt',
  matmoccau: 'Eye Bolt',
  daubake: 'Phillips Head',
  inox: 'Stainless Steel Screw',
  occhup: 'Cap Nut',
  daiocchupinox: 'Stainless Cap Nut',
  dautroncovuong: 'Carriage Bolt',
  dinhrut: 'Blind Rivet',
  tanrut: 'Rivet Nut',
  chotche: 'Cotter Pin',
  chotpin: 'Dowel Pin',
  thanhren: 'Threaded Rod',
  cumu: 'U-Bolt',
  no: 'Expansion Anchor',
  chot: 'Padlock',
  chot1: 'Barrel Bolt',
  chot2: 'Sliding Bolt',
  chotinox: 'Spring Toggle Latch',
  kepchotkimloai: 'Toggle Clamp',
  phoithep: 'Steel Billet',
  thanhthepvuong: 'Square Steel Bar',
  thanhtheptrondac: 'Solid Round Bar',
  thanhthepdet: 'Flat Bar',
  thepgocv: 'Angle Bar (V)',
  thepi: 'I Beam',
  thepu: 'U Channel',
  ongtheptron: 'Round Steel Pipe',
  octhepchunhat: 'Rectangular Steel Tube',
  theptamtron: 'Round Steel Plate',
  bulong: 'Bolt',
  khoa: 'Padlock',
  bua: 'Hammer',
  kim: 'Pliers',
  cole: 'Wrench',
};

function viNameFromSuffix(suffix) {
  if (!suffix) return '';
  const parts = suffix.split('_');
  const phraseParts = [];
  for (const part of parts) {
    const m = part.match(/^([a-z]+)(\d+)$/);
    if (VI_COMBO[part]) {
      phraseParts.push(VI_COMBO[part]);
      continue;
    }
    if (m) {
      const base = m[1];
      const num = m[2];
      if (VI_COMBO[base]) {
        phraseParts.push(`${VI_COMBO[base]} ${num}`);
      } else {
        phraseParts.push(`${base.charAt(0).toUpperCase()}${base.slice(1)} ${num}`);
      }
      continue;
    }
    if (part.includes('-')) {
      phraseParts.push(part.toUpperCase());
      continue;
    }
    phraseParts.push(VI_COMBO[part] || part.charAt(0).toUpperCase() + part.slice(1));
  }
  return phraseParts.join(' ');
}

function tokensFromSuffix(suffix) {
  if (!suffix) return [];
  return suffix.split('_');
}

function materialFromTokens(tokens) {
  if (tokens.includes('inox')) return { vi: 'Thép không gỉ (Inox)', en: 'Stainless steel' };
  if (tokens.includes('nhua')) return { vi: 'Nhựa', en: 'Plastic' };
  if (tokens.includes('tandong')) return { vi: 'Đồng', en: 'Brass' };
  return { vi: 'Thép cacbon', en: 'Carbon steel' };
}

function sizeFromSuffix(suffix) {
  if (!suffix) return '';
  const range = suffix.match(/m(\d+)\s*-\s*m(\d+)/i);
  if (range) return `M${range[1]}–M${range[2]}`;
  const singles = Array.from(new Set((suffix.match(/m(\d+)/gi) || []).map(s => `M${s.replace(/[^0-9]/g, '')}`)));
  return singles.join(', ');
}

function pickFeatures(tokens, dict) {
  const blocked = new Set(['inox', 'nhua', 'tandong']);
  const feats = [];
  for (const tk of tokens) {
    if (blocked.has(tk)) continue;
    if (/^m\d+$/i.test(tk)) continue;
    if (dict[tk]) feats.push(dict[tk]);
    if (feats.length >= 3) break;
  }
  return feats.join(', ');
}

function buildDescriptionVi(nameVi, categoryVi, suffix, categoryKey) {
  const tokens = tokensFromSuffix(suffix);
  const mat = materialFromTokens(tokens).vi;
  const size = sizeFromSuffix(suffix);
  const feats = pickFeatures(tokens, VI_COMBO);
  const parts = [];
  parts.push(`${nameVi} thuộc danh mục ${categoryVi}.`);
  if (feats) parts.push(`Đặc tính: ${feats}.`);
  parts.push(`Chất liệu: ${mat}.`);
  if (size) parts.push(`Kích cỡ tham chiếu: ${size}.`);
  const byCat = {
    bulong: 'Phù hợp lắp ghép cơ khí, kết cấu và nội thất.',
    ocvit: 'Thích hợp bắt giữ với gỗ, kim loại và nhựa.',
    khoa: 'Dùng cho cửa, tủ và các vị trí cần chốt/khóa an toàn.',
    dungcu: 'Hữu dụng cho sửa chữa, lắp đặt và gia công.',
    dungcucokhi: 'Hữu dụng cho sửa chữa, lắp đặt và gia công.',
    vatlieu: 'Vật liệu đầu vào cho gia công và xây dựng.',
  };
  const catKey = categoryKey || 'misc';
  parts.push(byCat[catKey] || 'Ứng dụng rộng rãi trong kỹ thuật.');
  return parts.join(' ');
}

function buildDescriptionEn(nameEn, categoryEn, suffix, categoryKey) {
  const tokens = tokensFromSuffix(suffix);
  const mat = materialFromTokens(tokens).en;
  const size = sizeFromSuffix(suffix);
  const feats = pickFeatures(tokens, EN_COMBO);
  const parts = [];
  parts.push(`${nameEn} belongs to ${categoryEn}.`);
  if (feats) parts.push(`Key features: ${feats}.`);
  parts.push(`Material: ${mat}.`);
  if (size) parts.push(`Reference sizes: ${size}.`);
  const byCat = {
    bulong: 'Suitable for mechanical joints, structures and fixtures.',
    ocvit: 'Ideal for fastening wood, metal and plastics.',
    khoa: 'For doors, cabinets and safety latching.',
    dungcu: 'Great for repair, installation and workshop tasks.',
    dungcucokhi: 'Great for repair, installation and workshop tasks.',
    vatlieu: 'Base materials for fabrication and construction.',
  };
  const catKey = categoryKey || 'misc';
  parts.push(byCat[catKey] || 'Applicable to various engineering tasks.');
  return parts.join(' ');
}

function enNameFromSuffix(suffix) {
  if (!suffix) return '';
  const parts = suffix.split('_');
  const phraseParts = [];

  for (const part of parts) {
    const m = part.match(/^([a-z]+)(\d+)$/);

    if (EN_COMBO[part]) {
      phraseParts.push(EN_COMBO[part]);
      continue;
    }

    if (m) {
      const base = m[1];
      const num = m[2];
      if (EN_COMBO[base]) {
        phraseParts.push(`${EN_COMBO[base]} ${num}`);
      } else {
        phraseParts.push(`${base.toUpperCase()} ${num}`);
      }
      continue;
    }

    phraseParts.push(EN_COMBO[part] || part.toUpperCase());
  }

  return phraseParts.join(' ');
}

export function getAssetProducts() {
  return Object.keys(ASSET_MODULES)
    .map((p) => {
      const url = ASSET_MODULES[p];
      const filename = p.split('/').pop() || '';

      const suffix = getSuffix(filename);
      const titleEn = enNameFromSuffix(suffix) || filenameToTitle(suffix || filename);
      const titleVi = viNameFromSuffix(suffix) || filenameToTitle(suffix || filename);
      const categoryKey = filenameToCategoryKey(filename);
      const category = filenameToCategoryEn(filename);
      const category_vi = filenameToCategory(filename);
      const descEn = buildDescriptionEn(titleEn, category, suffix, categoryKey);
      const descVi = buildDescriptionVi(titleVi, category_vi, suffix, categoryKey);

      return {
        id: filename.replace(/\.[^.]+$/, ''),
        name: titleEn,
        name_vi: titleVi,
        categoryKey,
        category,
        category_vi,
        price: 0,
        image: url,
        description: descEn,
        description_vi: descVi,
        quantity: 9999,
      };
    })
    .sort((a, b) => String(a.id).localeCompare(String(b.id)));
}

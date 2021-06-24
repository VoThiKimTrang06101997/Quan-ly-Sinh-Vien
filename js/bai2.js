if (localStorage.getItem("danhSachSinhVien")) {
  var danhSachSV = JSON.parse(localStorage.getItem("danhSachSinhVien"));
} else {
  var danhSachSV = [];
}

// Định nghĩa ra lớp đối tượng
function SinhVien(txtMaSV, txtTenSV, txtEmail, txtPass, txtNgaySinh, khSV, txtDiemToan, txtDiemLy, txtDiemHoa) {
  // Property
  this.maSV = txtMaSV;
  this.tenSV = txtTenSV;
  this.email = txtEmail;
  this.pass = txtPass;
  this.ngaySinh = txtNgaySinh;
  this.khSV = khSV;
  this.diemToan = txtDiemToan;
  this.diemLy = txtDiemLy;
  this.diemHoa = txtDiemHoa;
  // Method
  this.dtb = (this.diemToan + this.diemHoa + this.diemLy) / 3;

  /**
   * Cách 2: Tính điểm Trung Bình bằng Function:
   *    => Do lấy từ localStorage thì nó bị mất Parent Prototype nên không xài được Method đã truyền qua Constructor (hay còn hiểu là trong không xài được Method trong Prototype Constructor đã khai báo).
   */
  // this.tinhDTB = function () {
  //   return (this.diemToan + this.diemHoa + this.diemLy) / 3;
  };


// Hiển thị ra màn hình
function renderDSSV(listStudent) {
  // Hiển thị danh sách sinh viên ra màn hình
  var tbodyContent = "";
  listStudent.forEach(function (sinhVien, index) {
    // console.log("sinhVien : ", sinhVien);
    tbodyContent += `
    <tr>
      <td>${sinhVien.maSV}</td>
      <td>${sinhVien.tenSV}</td>
      <td>${sinhVien.email}</td>
      <td>${sinhVien.ngaySinh}</td>
      <td>${sinhVien.khSV}</td>
      <td>${sinhVien.dtb}</td>
      <td>
        <button class="btn btn-danger" onclick="handleDelete(${sinhVien.maSV})"> Xóa </button>
        <button class="btn btn-info" onclick="handleEdit(${sinhVien.maSV})"> Sửa </button>
      </td>
    </tr>
  `;
  });
  document.getElementById("tbodySinhVien").innerHTML = tbodyContent;
}
renderDSSV(danhSachSV);

function handleEdit(maSV) {
  console.log("handleEdit : ", maSV);
  // Tìm chỉ mục của Mảng
  var index = danhSachSV.findIndex(function (sv) {
    return sv.maSV == maSV;
  });
  if (index === -1) {
    alert("Không tìm thấy phần tử cần edit");
  } else {
    var svEdit = danhSachSV[index];
    console.log("svEdit : ", svEdit);
    // Hiển thị lên form
    document.getElementById("txtMaSV").value = svEdit.maSV;
    document.getElementById("txtTenSV").value = svEdit.tenSV;
    document.getElementById("txtEmail").value = svEdit.email;
    document.getElementById("txtPass").value = svEdit.pass;
    document.getElementById("txtNgaySinh").value = svEdit.ngaySinh;
    document.getElementById("khSV").value = svEdit.khSV;
    document.getElementById("txtDiemToan").value = svEdit.diemToan;
    document.getElementById("txtDiemLy").value = svEdit.diemLy;
    document.getElementById("txtDiemHoa").value = svEdit.diemHoa;
  }
}

document.getElementById("btnThemSV").addEventListener("click", function () {
  // Lấy value của input
  var txtMaSV = document.getElementById("txtMaSV").value;
  var txtTenSV = document.getElementById("txtTenSV").value;
  var txtEmail = document.getElementById("txtEmail").value;
  var txtPass = document.getElementById("txtPass").value;
  var txtNgaySinh = document.getElementById("txtNgaySinh").value;
  var khSV = document.getElementById("khSV").value;
  var txtDiemToan = +document.getElementById("txtDiemToan").value;
  var txtDiemLy = +document.getElementById("txtDiemLy").value;
  var txtDiemHoa = +document.getElementById("txtDiemHoa").value;

  // Tạo đối tượng sinh viên từ lớp đối tượng sinh viên
  let sv = new SinhVien(txtMaSV, txtTenSV, txtEmail, txtPass, txtNgaySinh, khSV, txtDiemToan, txtDiemLy, txtDiemHoa);
  // console.log("sv : ", sv);
  danhSachSV.push(sv);
  console.log("danhSachSV : ", danhSachSV);

  // Hiển thị danh sách sinh viên ra màn hình
  renderDSSV(danhSachSV);

  // Lưu data vào localStorage
  localStorage.setItem("danhSachSinhVien", JSON.stringify(danhSachSV));
});

function handleDelete(maSV) {
  console.log("handleDelete ", maSV);
  // tìm index trong Mảng
  // c1
  // var index = -1;
  // danhSachSV.forEach(function (sv, i) {
  //   if (sv.maSV == maSV) {
  //     index = i;
  //   }
  // });
  // c2
  var index = danhSachSV.findIndex(function (sv) {
    return sv.maSV == maSV;
  });

  if (index === -1) {
    alert("Khổng tìm thấy phần tử cần xóa");
  } else {
    // Xóa data trong Mảng
    danhSachSV.splice(index, 1);
    // Hiển thị danh sách sinh viên ra màn hình
    renderDSSV(danhSachSV);
    // Lưu local
    localStorage.setItem("danhSachSinhVien", JSON.stringify(danhSachSV));
  }
}

// Xử lý reset form
function resetForm() {
  console.log("resetForm");
  // Dọn dẹp các input ( value = "" )
  document.getElementById("txtMaSV").value = "";
  document.getElementById("txtTenSV").value = "";
  document.getElementById("txtEmail").value = "";
  document.getElementById("txtPass").value = "";
  document.getElementById("txtNgaySinh").value = "";
  document.getElementById("khSV").value = "";
  document.getElementById("txtDiemToan").value = "";
  document.getElementById("txtDiemLy").value = "";
  document.getElementById("txtDiemHoa").value = "";
}

// Xử lý cập nhật
function handleUpdate() {
  console.log("handleUpdate");

  // Lấy value của input
  var txtMaSV = document.getElementById("txtMaSV").value;
  var txtTenSV = document.getElementById("txtTenSV").value;
  var txtEmail = document.getElementById("txtEmail").value;
  var txtPass = document.getElementById("txtPass").value;
  var txtNgaySinh = document.getElementById("txtNgaySinh").value;
  var khSV = document.getElementById("khSV").value;
  var txtDiemToan = +document.getElementById("txtDiemToan").value;
  var txtDiemLy = +document.getElementById("txtDiemLy").value;
  var txtDiemHoa = +document.getElementById("txtDiemHoa").value;

  // debugger;

  // Tìm index cần cập nhật
  var index = danhSachSV.findIndex(function (sv) {
    return sv.maSV == txtMaSV;
  });

  if (index === -1) {
    alert("không tìm thấy index cần cập nhật");
  } else {
    // Cập nhật lại Mảng
    var svUpdate = new SinhVien(
      txtMaSV,
      txtTenSV,
      txtEmail,
      txtPass,
      txtNgaySinh,
      khSV,
      txtDiemToan,
      txtDiemLy,
      txtDiemHoa
    );
    danhSachSV[index] = svUpdate;

    // hiển thị ra màn hình
    renderDSSV(danhSachSV);
    // lưu local
    localStorage.setItem("danhSachSinhVien", JSON.stringify(danhSachSV));
  }
}

// xử lý tính năng search
document.getElementById("btnSearch").addEventListener("click", function () {
  var txtSearch = document.getElementById("txtSearch").value;
  // Tìm kiếm sv theo tên
  var danhSachSVFilter = danhSachSV.filter(function (sv) {
    return sv.tenSV.toLowerCase().includes(txtSearch.toLowerCase());
  });

  console.log("danhSachSVFilter : ", danhSachSVFilter);

  renderDSSV(danhSachSVFilter);
});

// demo filter
// var danhSachDiem = [4, 6, 9, 3, 2, 7, 8];
// // yêu cầu lấy ra các điểm lớn hơn 5
// var result = danhSachDiem.filter(function (diem) {
//   return diem >= 5;
// });

// console.log("danhSachDiem : ", danhSachDiem);
// console.log("result : ", result);

// var keyWork = "z";
// var tenSV = "hào";
// var isExist = tenSV.includes(keyWork);
// console.log("isExist : ", isExist);

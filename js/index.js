/**
 * 1) Bắt sự kiện nút hiển thị thông tin.
 * 2) Lấy input dữ liệu người dùng nhập vào.
 * 3) Hiển thị thông tin cần thiết
 */

// Bắt sự kiện nút hiển thị thông tin
function handleCLick() {
    console.log("run");
    // Lấy Value của Input
    var maSV = document.getElementById("txtMaSV").value;
    var tenSV = document.getElementById("txtTenSV").value;
    var loaiSV = document.getElementById("loaiSV").value;
    var diemToan = +document.getElementById("txtDiemToan").value;
    var diemVan = +document.getElementById("txtDiemVan").value;

    // dừng chương trình để kiểm tra kết quả
    // debugger;

    var sinhVien = {
        // property
        maSV: maSV,
        tenSV: tenSV,
        loaiSV: loaiSV,
        diemToan: diemToan,
        diemVan: diemVan,

        // method
        // tinhDtb: function () {
        //     var dtb = (sinhVien.diemToan + sinhVien.diemVan) / 2;
        //     return dtb;
        // },

        // this: Được hiểu là Object Sinh viên, thay cho Key "Sinh Viên" <==> sinhVien.diemToan và sinhVien.diemVan
        tinhDtb: function () {
            var dtb = (this.diemToan + this.diemVan) / 2;
            return dtb;
        },
        xepLoai: function (diemTrungBinh) {
            if(diemTrungBinh >=5 && diemTrungBinh <=10) {
                return "Qua môn";
            } else {
                return "Rớt môn";
            }
        },
    };

    var diemTrungBinh = sinhVien.tinhDtb();
    var ketQua = sinhVien.xepLoai(diemTrungBinh);
    // hiển thị ra màn hình
    document.getElementById("spanTenSV").innerHTML =sinhVien.tenSV;
    document.getElementById("spanMaSV").innerHTML =sinhVien.maSV;
    document.getElementById("spanLoaiSV").innerHTML =sinhVien.loaiSV;
    document.getElementById("spanDTB").innerHTML = diemTrungBinh;
    document.getElementById("spanXepLoai").innerHTML = ketQua;
}




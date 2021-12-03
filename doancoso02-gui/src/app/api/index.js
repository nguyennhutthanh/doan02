import axios from "axios";

const BASE_URL = 'https://localhost:44336/api/';

export const ENDPIONTS = {
    DANHMUC: 'DanhMucSp',
    CHATLIEU: 'ChatLieuSp',
    THUONGHIEU: 'ThuongHieuSp',
    CTSANPHAM: 'ChiTietSp',
    KHUYENMAI: 'KhuyenMai',
    ADMIN: 'Admin',
    DONDATHANG: 'DonHang',
    LIENHE: 'LienHe',
    BINHLUAN: 'BinhLuan',
    THONGKE: 'ThongKe',
    LOGIN: 'Login',
    ROOMS: 'Rooms',
    CUSTOMER: 'KhachHang',
    CONFIG: 'ConFig',
}

export const createAPIEndpoint = endpoint => {

    let url = BASE_URL + endpoint + '/';

    return {
        fetchAll: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        create: newRecord => axios.post(url, newRecord),
        update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id)
    }
}
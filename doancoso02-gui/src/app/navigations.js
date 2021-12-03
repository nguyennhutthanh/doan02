export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'dashboard',
    },
    {
        label: 'Bảo Mật',
        type: 'label',
    },
    {
        name: 'Tài Khoản',
        icon: 'security',
        children: [
            {
                name: 'Admin',
                iconText: 'AD',
                path: '/admin',
            },
            {
                name: 'User',
                iconText: 'US',
                path: '/khachhang',
            },
        ],
    },
    {
        label: 'Hàng Hóa',
        type: 'label',
    },
    {
        name: 'Sản phẩm',
        path: '/chitietsanpham',
        icon: 'shopping_basket',
    },
    {
        name: 'Đơn hàng',
        path: '/danhmucdonhang',
        icon: 'category',
    },
    {
        label: 'Tương tác',
        type: 'label',
    },
    {
        name: 'Tương tác',
        icon: 'comment',
        children: [
            {
                name: 'Liên hệ',
                iconText: 'LH',
                path: '/danhmuclienhe',
            },
            {
                name: 'Bình luận',
                iconText: 'BL',
                path: '/danhmucbinhluan',
            },
        ],
    },
    // Chủ Dề Table
    {
        label: 'Dữ Liệu',
        type: 'label',
    },
    // danh mục
    {
        name: 'Danh Mục',
        icon: 'table',
        children: [
            {
                name: 'Danh mục thể loại',
                path: '/danhmucsanpham',
                iconText: 'DM',
            },
            {
                name: 'Danh sách chất liệu',
                path: '/danhmucchatlieu',
                iconText: 'CL',
            },
            {
                name: 'Danh mục thương hiệu',
                path: '/danhmucthuonghieu',
                iconText: 'TH',
            },
            {
                name: 'Danh mục khuyễn mãi',
                path: '/danhmuckhuyenmai',
                iconText: 'KM',
            },
            {
                name: 'Danh mục Phòng',
                path: '/danhmucrooms',
                iconText: 'KM',
            },
        ],
    }

]

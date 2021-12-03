using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DoAnCoSo02.Web.ViewModel
{
	public class CheckoutViewModel
	{
        public string HoTen { get; set; }
        public string Email { get; set; }
        public string SDT { get; set; }
        public string DiaChi { get; set; }
        public string GhiChu { get; set; }
        public int TongHoaDon { get; set; }
        public int TongLuongSanPham { get; set; }
        public List<int> ThanhTien { get; set; }
        public List<int> IdSanPham { get; set; }
        public List<int> SoLuong { get; set; }
        public List<String> checkoutProduct { get; set; }
        public string Tinh { get; set; }
        public string Huyen { get; set; }
    }
}

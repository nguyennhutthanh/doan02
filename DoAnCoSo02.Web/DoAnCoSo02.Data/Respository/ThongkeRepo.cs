using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DoAnCoSo02.DTOs;

namespace DoAnCoSo02.Data.Respository
{
	public class ThongkeRepo : RepositoryBase
	{
		public ThongkeRepo() : base() { }
		public ThongkeRepo(DoAnCoSo2DbContext _db) : base(_db) { }

		public async Task<int> CountDonHang()
		{
			return await db.CheckoutProducts.CountAsync();
		}
		public async Task<int> CountChiTietDonHang()
		{
			return await db.DetailCheckouts.CountAsync();
		}
		public async Task<int> CountSanPham()
		{
			return await db.DetailProducts.CountAsync();
		}
		public async Task<int> CountLienHe()
		{
			return await db.Contacts.CountAsync();
		}
		public async Task<int> CountBinhLuan()
		{
			return await db.Comments.CountAsync();
		}
		public async Task<int> CountDanhMuc()
		{
			return await db.DanhMucProducts.CountAsync();
		}
		public async Task<int> CountThuongHieu()
		{
			return await db.ThuongHieuProducts.CountAsync();
		}
		public async Task<int> CountKhachHang()
		{
			return await db.CusTomers.CountAsync();
		}
		public async Task<int> CountSanPhamKM()
		{
			List<KhuyenMaiProductDTO> khuyenmai = await db.KhuyenMaiProducts.ToListAsync();
			var count = 0;
			if (khuyenmai != null)
			{
				foreach (var item in khuyenmai)
				{
					var con = await db.DetailProducts.Where(s => s.IdDiscount == item.id).CountAsync();
					count += con;
				}
			}
			return count;
		}
		public async Task<int> CountSoLuongSpNhapKho()
		{
			List<DetailProductDTO> sanpham = await db.DetailProducts.ToListAsync();
			var count = 0;
			if (sanpham != null)
			{
				foreach (var item in sanpham)
				{
					var con = await db.DetailProducts.Where(s => s.Id == item.Id)
						.Select(s => new { soluong = s.Soluong }).ToListAsync();
					count += con.Sum(s => s.soluong);
				}
			}
			return count;
		}
		public async Task<int> SumSoLuongSanPhamDaBan()
		{
			List<DetailCheckoutDTO> detailcheck = await db.DetailCheckouts.ToListAsync();
			var sumdetail = 0;
			if(detailcheck != null)
			{
				foreach(var item in detailcheck)
				{
					var sluong =  item.SoLuong;
					sumdetail += sluong;
				}
			}
			return sumdetail;
		}
	}
}

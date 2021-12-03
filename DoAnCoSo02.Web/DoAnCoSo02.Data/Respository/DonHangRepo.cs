using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DoAnCoSo02.DTOs;
using Microsoft.EntityFrameworkCore;

namespace DoAnCoSo02.Data.Respository
{
	public class DonHangRepo : RepositoryBase
	{
		public DonHangRepo() : base() { }
		public DonHangRepo(DoAnCoSo2DbContext _db) : base(_db) { }

		public async Task<List<CheckoutProductDTO>> ShowListCheckout()
		{
			var list = await db.CheckoutProducts
				.Include(x => x.DetailCheckoutNavigation)
				.ThenInclude(x => x.CheckoutProduct)
				.Where(s => s.DaGiao == false)
				.Select(s => new CheckoutProductDTO()
				{
					Id = s.Id,
					SDT = s.SDT,
					DiaChi = s.DiaChi,
					Email = s.Email,
					GhiChu = s.GhiChu,
					HoTen = s.HoTen,
					NgayDat = s.NgayDat,
					TrangThai = s.TrangThai,
					TongHoaDon = s.TongHoaDon,
					DaGiao = s.DaGiao,
					DetailCheckoutNavigation = s.DetailCheckoutNavigation
				})
				.OrderByDescending(s => s.Id).ToListAsync();
			return list;
		}
		public async Task<List<CheckoutProductDTO>> ShowListDonDaGiao()
		{
			var list = await db.CheckoutProducts
				.Include(x => x.DetailCheckoutNavigation)
				.ThenInclude(x => x.CheckoutProduct)
				.Where(s => s.DaGiao == true)
				.Select(s => new CheckoutProductDTO()
				{
					Id = s.Id,
					SDT = s.SDT,
					DiaChi = s.DiaChi,
					Email = s.Email,
					GhiChu = s.GhiChu,
					HoTen = s.HoTen,
					NgayDat = s.NgayDat,
					TrangThai = s.TrangThai,
					TongHoaDon = s.TongHoaDon,
					DaGiao = s.DaGiao,
					DetailCheckoutNavigation = s.DetailCheckoutNavigation
				})
				.OrderByDescending(s => s.Id).ToListAsync();
			return list;
		}
		public async Task<CheckoutProductDTO> SetDaGiaoHang(int id)
		{
			var find = await db.CheckoutProducts.Where(s => s.Id == id).SingleOrDefaultAsync();
			if (find != null)
			{
				find.DaGiao = true;
			}
			await db.SaveChangesAsync();
			return find;
		}
		public void DeleteCheckout(int id)
		{
			List<DetailCheckoutDTO> detailcheck = db.DetailCheckouts
				.Where(s => s.IdCheckout == id).ToList();
			foreach (var item in detailcheck)
			{
				item.CheckoutNavigation = null;
				item.CheckoutProduct = null;
			}
			db.CheckoutProducts.Remove(db.CheckoutProducts.Find(id));
			db.SaveChanges();
		}
		public async Task<CheckoutProductDTO> SetTrangThai(int id)
		{
			var find = await db.CheckoutProducts.Where(s => s.Id == id).SingleOrDefaultAsync();
			if(find != null)
			{
				find.TrangThai = true;
			}
			await db.SaveChangesAsync();
			return find;
		}
		public async Task<List<DetailCheckoutDTO>> DetailCheckout(int id)
		{
			var findcheck = await db.DetailCheckouts
				.Include(x => x.CheckoutNavigation)
				.Include(x => x.CheckoutProduct)
				.ThenInclude(x => x.ThuongHieuNavigation)
				.Include(x => x.CheckoutProduct)
				.ThenInclude(x => x.DanhmucNavigation)
				.Where(x => x.IdCheckout == id)
				.Select(s => new DetailCheckoutDTO()
				{
					IdSanPham = s.IdSanPham,
					SoLuong = s.SoLuong,
					IdCheckout = s.IdCheckout,
					ThanhTien = s.ThanhTien,
					TrangThai = s.TrangThai,
					CheckoutNavigation = s.CheckoutNavigation,
					CheckoutProduct = s.CheckoutProduct,
				}).ToListAsync();
			return findcheck;
		}
		public async Task<List<CheckoutProductDTO>> CustommerProduct(int id)
		{
			var findcheck = await db.CheckoutProducts
				.Include(s => s.DetailCheckoutNavigation)
				.Where(s => s.Id == id)
				.Select(s => new CheckoutProductDTO() {
					DetailCheckoutNavigation = s.DetailCheckoutNavigation,
					SDT = s.SDT,
					TongSanPhamMua = s.TongSanPhamMua,
					DaGiao= s.DaGiao,
					DiaChi = s.DiaChi,
					Email= s.Email,
					GhiChu = s.GhiChu,
					Id = s.Id,
					HoTen = s.HoTen,
					NgayDat =s.NgayDat,
					TongHoaDon = s.TongHoaDon,
					TrangThai =s.TrangThai
				})
				.ToListAsync();
			return findcheck;
		}
		public async Task<List<DetailProductDTO>> DetailCheckouts(int id)
		{
			var findcheck = await db.DetailCheckouts.Where(s => s.IdCheckout == id).ToListAsync();
			List<DetailProductDTO> map = new List<DetailProductDTO>();
			foreach (var item in findcheck)
			{
				var list = await db.DetailProducts.Where(s => s.Id == item.IdSanPham)
					.Select(s => new DetailProductDTO() {
						Id = s.Id,
						MaSP = s.MaSP,
						TenSP = s.TenSP,
						AnhSanPham = s.AnhSanPham,
						ListFileAnh = s.ListFileAnh,
						UrlAnhSanPham = s.UrlAnhSanPham,
						Size = s.Size,
						Soluong = s.Soluong,
						NgayThem = s.NgayThem,
						GiaSP = s.GiaSP,
						GiaKhuyenMai = s.GiaKhuyenMai,
						Mota = s.Mota,
						Review = s.Review,
						BaoHanh = s.BaoHanh,
						KichThuoc = s.KichThuoc,
						XuatXu = s.XuatXu,
						TrangThai = s.TrangThai,
						IdChatLieu = s.IdChatLieu,
						IdDanhmuc = s.IdDanhmuc,
						IdDiscount = s.IdDiscount,
						IdThuongHieu = s.IdThuongHieu,
						DanhmucNavigation = s.DanhmucNavigation,
						ChatLieuNavigation = s.ChatLieuNavigation,
						ThuongHieuNavigation = s.ThuongHieuNavigation,
						KhuyenMaiNavigation = s.KhuyenMaiNavigation,
						CommentsNavigation = s.CommentsNavigation,
						DetaiCheckoutNavigation = s.DetaiCheckoutNavigation,
						DanhMucHinhNavigation = s.DanhMucHinhNavigation
					})
					.SingleOrDefaultAsync();
				map.Add(list);
			}
			return map;
		}
		public int GetSoLuongTonKho(int id)
		{
			return db.DetailProducts.Where(x => x.Id == id).SingleOrDefault().Soluong;
		}

	}
}

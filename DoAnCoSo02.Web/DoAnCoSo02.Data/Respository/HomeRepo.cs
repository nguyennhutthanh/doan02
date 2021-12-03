using DoAnCoSo02.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.Data.Respository
{
	public class HomeRepo : RepositoryBase
	{
		public HomeRepo() : base() { }
		public HomeRepo(DoAnCoSo2DbContext _db) : base(_db) { }
		//sản phẩm mới nhất
		public async Task<List<DetailProductDTO>> SanPhamMoiNhat()
		{
			var showList = await db.DetailProducts
				.Include(x => x.ThuongHieuNavigation)
				.Include(x => x.DanhmucNavigation)
				.Include(x => x.ChatLieuNavigation)
				.Include(x => x.DanhMucHinhNavigation)
				.Include(x => x.KhuyenMaiNavigation)
				.OrderByDescending(x => x.Id)
				.Take(10).Select(s => new DetailProductDTO()
				{
					Id = s.Id,
					Soluong = s.Soluong,
					GiaSP = s.GiaSP,
					GiaKhuyenMai = (s.GiaSP - (s.GiaSP * s.KhuyenMaiNavigation.Sale) / 100),
					MaSP = s.MaSP,
					TenSP = s.TenSP,
					UrlAnhSanPham = s.UrlAnhSanPham,
					BaoHanh = s.BaoHanh,
					ChatLieuNavigation = s.ChatLieuNavigation,
					DanhMucHinhNavigation = s.DanhMucHinhNavigation,
					DanhmucNavigation = s.DanhmucNavigation,
					KichThuoc = s.KichThuoc,
					Mota = s.Mota,
					NgayThem = s.NgayThem,
					Review = s.Review,
					TrangThai = s.TrangThai,
					XuatXu = s.XuatXu,
					Size = s.Size,
					ThuongHieuNavigation = s.ThuongHieuNavigation,
					KhuyenMaiNavigation = s.KhuyenMaiNavigation
				}).ToListAsync();
			return showList;
		}
		//sản phẩm có hạn
		public async Task<List<DetailProductDTO>> SanPhamCoHan()
		{
			var list = await db.DetailProducts
				.Include(s => s.DanhmucNavigation)
				.Include(s => s.ThuongHieuNavigation)
				.Include(s => s.ChatLieuNavigation)
				.Include(s => s.DanhMucHinhNavigation)
				.Include(s => s.KhuyenMaiNavigation)
				.Where(s => s.Soluong <= 100)
				.Select(s => new DetailProductDTO()
				{
					Id = s.Id,
					Soluong = s.Soluong,
					GiaSP = s.GiaSP,
					GiaKhuyenMai = (s.GiaSP - (s.GiaSP * s.KhuyenMaiNavigation.Sale) / 100),
					MaSP = s.MaSP,
					TenSP = s.TenSP,
					UrlAnhSanPham = s.UrlAnhSanPham,
					BaoHanh = s.BaoHanh,
					ChatLieuNavigation = s.ChatLieuNavigation,
					DanhMucHinhNavigation = s.DanhMucHinhNavigation,
					DanhmucNavigation = s.DanhmucNavigation,
					KichThuoc = s.KichThuoc,
					Mota = s.Mota,
					NgayThem = s.NgayThem,
					Review = s.Review,
					TrangThai = s.TrangThai,
					XuatXu = s.XuatXu,
					Size = s.Size,
					ThuongHieuNavigation = s.ThuongHieuNavigation,
					KhuyenMaiNavigation = s.KhuyenMaiNavigation
				}).ToListAsync();
			return list;
		}
		//sản phẩm bán nhiều nhất
		public async Task<List<DetailProductDTO>> SanPhamBanChay()
		{
			var query = await db.DetailCheckouts
				.Include(s => s.CheckoutNavigation)
				.Include(s => s.CheckoutProduct)
				.GroupBy(s => s.IdSanPham)
				.OrderBy(s => s.Key)
				.Select(s => s.Key).ToListAsync();
			var list = await db.DetailProducts
				.Include(s => s.KhuyenMaiNavigation)
				.Include(s => s.DanhmucNavigation)
				.Include(s => s.ChatLieuNavigation)
				.Include(s => s.DanhMucHinhNavigation)
				.Include(s => s.ThuongHieuNavigation)
				.Where(s => query.Contains(s.Id))
				.OrderByDescending(s => s.DetaiCheckoutNavigation.Sum(s => s.SoLuong)).Take(10)
				.Select(s => new DetailProductDTO()
				{
					Id = s.Id,
					Soluong = s.Soluong,
					GiaSP = s.GiaSP,
					GiaKhuyenMai = (s.GiaSP - (s.GiaSP * s.KhuyenMaiNavigation.Sale) / 100),
					MaSP = s.MaSP,
					TenSP = s.TenSP,
					UrlAnhSanPham = s.UrlAnhSanPham,
					BaoHanh = s.BaoHanh,
					ChatLieuNavigation = s.ChatLieuNavigation,
					DanhMucHinhNavigation = s.DanhMucHinhNavigation,
					DanhmucNavigation = s.DanhmucNavigation,
					KichThuoc = s.KichThuoc,
					Mota = s.Mota,
					NgayThem = s.NgayThem,
					Review = s.Review,
					TrangThai = s.TrangThai,
					XuatXu = s.XuatXu,
					Size = s.Size,
					ThuongHieuNavigation = s.ThuongHieuNavigation,
					KhuyenMaiNavigation = s.KhuyenMaiNavigation
				}).ToListAsync();
			return list;
		}
		public async Task<List<DanhMucProductDTO>> Getloaisanpham()
		{
			var list = await db.DanhMucProducts
				.Include(s => s.DanhMucSanPham)
				.Select(s => new DanhMucProductDTO()
				{
					Id = s.Id,
					ImageName = s.ImageName,
					MaLoai = s.MaLoai,
					TenLoai = s.TenLoai,
					urlAnhDaiDien = s.urlAnhDaiDien,
					DanhMucSanPham = s.DanhMucSanPham
				}).ToListAsync();

			return list;
		}
		//san pham khuyen mai
		public async Task<List<DetailProductDTO>> SanPhamKhuyenMai()
		{
			var discount = await db.DetailProducts
			.Include(s => s.KhuyenMaiNavigation)
			.Include(s => s.DanhmucNavigation)
			.Include(s => s.ChatLieuNavigation)
			.Include(s => s.DanhMucHinhNavigation)
			.Include(s => s.ThuongHieuNavigation)
			.OrderByDescending(s => s.IdDiscount)
			.Where(s => s.KhuyenMaiNavigation.Sale > 0)
			.Select(s => new DetailProductDTO()
			{
				Id = s.Id,
				Soluong = s.Soluong,
				GiaSP = s.GiaSP,
				GiaKhuyenMai = (s.GiaSP - (s.GiaSP * s.KhuyenMaiNavigation.Sale) / 100),
				MaSP = s.MaSP,
				TenSP = s.TenSP,
				UrlAnhSanPham = s.UrlAnhSanPham,
				BaoHanh = s.BaoHanh,
				ChatLieuNavigation = s.ChatLieuNavigation,
				DanhMucHinhNavigation = s.DanhMucHinhNavigation,
				DanhmucNavigation = s.DanhmucNavigation,
				KichThuoc = s.KichThuoc,
				Mota = s.Mota,
				NgayThem = s.NgayThem,
				Review = s.Review,
				TrangThai = s.TrangThai,
				XuatXu = s.XuatXu,
				Size = s.Size,
				ThuongHieuNavigation = s.ThuongHieuNavigation,
				KhuyenMaiNavigation = s.KhuyenMaiNavigation
			}).ToListAsync();
			return discount;
		}
		public async Task<DetailProductDTO> GetDetailtProduct(int id)
		{
			var findPro = await db.DetailProducts
				.Include(x => x.DanhmucNavigation)
				.Include(x => x.ThuongHieuNavigation)
				.Include(x => x.KhuyenMaiNavigation)
				.Include(x => x.CommentsNavigation)
				.Include(x => x.ChatLieuNavigation)
				.Where(x => x.Id == id)
				.Select(s => new DetailProductDTO()
				{
					Id = s.Id,
					Soluong = s.Soluong,
					GiaSP = s.GiaSP,
					GiaKhuyenMai = (s.GiaSP - (s.GiaSP * s.KhuyenMaiNavigation.Sale) / 100),
					MaSP = s.MaSP,
					TenSP = s.TenSP,
					UrlAnhSanPham = s.UrlAnhSanPham,
					BaoHanh = s.BaoHanh,
					ChatLieuNavigation = s.ChatLieuNavigation,
					DanhMucHinhNavigation = s.DanhMucHinhNavigation,
					DanhmucNavigation = s.DanhmucNavigation,
					KichThuoc = s.KichThuoc,
					Mota = s.Mota,
					NgayThem = s.NgayThem,
					Review = s.Review,
					TrangThai = s.TrangThai,
					XuatXu = s.XuatXu,
					Size = s.Size,
					ThuongHieuNavigation = s.ThuongHieuNavigation,
					KhuyenMaiNavigation = s.KhuyenMaiNavigation,
					CommentsNavigation = s.CommentsNavigation
				})
				.SingleOrDefaultAsync();
			return findPro;
		}
		public async Task<List<DetailProductDTO>> SanPhamTheoLoai(int id)
		{
			var key = await db.DanhMucProducts
				.Include(s => s.DanhMucSanPham).SingleOrDefaultAsync(s => s.Id == id);
			var list = await db.DetailProducts
				.Include(x => x.ThuongHieuNavigation)
				.Include(x => x.DanhmucNavigation)
				.Include(x => x.ChatLieuNavigation)
				.Include(x => x.DanhMucHinhNavigation)
				.Include(x => x.KhuyenMaiNavigation)
				.Where(s => s.IdDanhmuc == key.Id)
				.Select(s => new DetailProductDTO()
				{
					Id = s.Id,
					Soluong = s.Soluong,
					GiaSP = s.GiaSP,
					GiaKhuyenMai = (s.GiaSP - (s.GiaSP * s.KhuyenMaiNavigation.Sale) / 100),
					MaSP = s.MaSP,
					TenSP = s.TenSP,
					UrlAnhSanPham = s.UrlAnhSanPham,
					BaoHanh = s.BaoHanh,
					ChatLieuNavigation = s.ChatLieuNavigation,
					DanhMucHinhNavigation = s.DanhMucHinhNavigation,
					DanhmucNavigation = s.DanhmucNavigation,
					KichThuoc = s.KichThuoc,
					Mota = s.Mota,
					NgayThem = s.NgayThem,
					Review = s.Review,
					TrangThai = s.TrangThai,
					XuatXu = s.XuatXu,
					Size = s.Size,
					ThuongHieuNavigation = s.ThuongHieuNavigation,
					KhuyenMaiNavigation = s.KhuyenMaiNavigation,
					CommentsNavigation = s.CommentsNavigation
				}).ToListAsync();
			return list;
		}
		public async Task<List<DanhMucProductDTO>> ListDanhMuc()
		{
			var list = await db.DanhMucProducts.Include(s => s.DanhMucSanPham)
				.Select(s => new DanhMucProductDTO()
				{
					Id = s.Id,
					DanhMucSanPham = s.DanhMucSanPham,
					ImageName = s.ImageName,
					MaLoai = s.MaLoai,
					TenLoai = s.TenLoai,
					urlAnhDaiDien = s.urlAnhDaiDien
				}).ToListAsync();
			return list;
		}
		public async Task<ICollection<DanhMucProductDTO>> GetListSanPhamLoai()
		{
			var list = await db.DanhMucProducts
				.Include(s => s.DanhMucSanPham)
				.Include(s => s.InterfaceRoomNavigation)
				.Select(s => new DanhMucProductDTO()
				{
					DanhMucSanPham = s.DanhMucSanPham,
					InterfaceRoomNavigation  = s.InterfaceRoomNavigation,
					Id = s.Id,
					ImageName = s.ImageName,
					MaLoai = s.MaLoai,
					urlAnhDaiDien = s.urlAnhDaiDien,
					TenLoai = s.TenLoai
				}).ToListAsync();
			return list;
		}
	}
}

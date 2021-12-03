using DoAnCoSo02.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.Data.Respository
{
	public class ProductsRepo: RepositoryBase
	{
		public ProductsRepo() : base() { }
		public ProductsRepo(DoAnCoSo2DbContext _db) : base(_db) { }
		//sản phẩm
		public async Task<List<DetailProductDTO>> GetAllSanPham()
		{
			var showList = await db.DetailProducts
				.Include(x => x.ThuongHieuNavigation)
				.Include(x => x.DanhmucNavigation)
				.Include(x => x.ChatLieuNavigation)
				.Include(x => x.DanhMucHinhNavigation)
				.Include(x => x.KhuyenMaiNavigation)
				.OrderByDescending(x => x.Id)
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
			return showList;
		}
		public async Task<List<InterfaceRoomDTO>> GetRoomsTypeProduct()
		{
			var data = await db.danhmucRooms
				.Include(s => s.DanhMucRoom)
				.Select(s => new InterfaceRoomDTO()
				{
					DanhMucRoom = s.DanhMucRoom,
					Id = s.Id,
					ImageRoom = s.ImageRoom,
					ImageRoomName = s.ImageRoomName,
					TenRoom = s.TenRoom,
					urlImageRoom = s.urlImageRoom,
				}).ToListAsync();
			return data;
		}
		public async Task<List<ProductMaterialDTO>> GetProductByMaterial()
		{
			var list = await db.ProductMaterials
				.Include(s => s.ChatLieuNavigation)
				.OrderByDescending(s => s.id)
				.Select(s => new ProductMaterialDTO() {
					ChatLieuNavigation = s.ChatLieuNavigation,
					id = s.id,
					TenAnh = s.TenAnh,
					TenChatLieu= s.TenChatLieu,
					urlAnhChatLieu = s.urlAnhChatLieu
				}).ToListAsync();
			return list;
		}

		public async Task<List<ThuongHieuProductDTO>> GetProductByThuongHieu()
		{
			var list = await db.ThuongHieuProducts
				.Include(s => s.ThuongHieuProducts)
				.OrderByDescending(s => s.Id)
				.Select(s => new ThuongHieuProductDTO() {
					ThuongHieuProducts = s.ThuongHieuProducts,
					Id = s.Id,
					TenThuongHieu = s.TenThuongHieu,
					UrlAnhThuongHieu = s.UrlAnhThuongHieu
				}).ToListAsync();
			return list;
		}
		public async Task<List<DetailProductDTO>> GetBestSelling()
		{
			var discount = await db.DetailProducts
			.Include(s => s.KhuyenMaiNavigation)
			.Include(s => s.DanhmucNavigation)
			.Include(s => s.ChatLieuNavigation)
			.Include(s => s.DanhMucHinhNavigation)
			.Include(s => s.ThuongHieuNavigation)
			.OrderByDescending(s => s.KhuyenMaiNavigation.Sale)
			.Where(s => s.KhuyenMaiNavigation.Sale > 40)
			.Take(5)
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
		public async Task<List<DetailProductDTO>> RelatedProducts(int id)
		{
			var product = await db.DetailProducts.FindAsync(id);

			if (product == null)
			{
				throw new Exception("Lỗi product null");
			}
			var list = await db.DetailProducts
				.Include(s => s.KhuyenMaiNavigation)
				.Include(s => s.DanhMucHinhNavigation)
				.Include(s => s.ChatLieuNavigation)
				.Include(s => s.DanhmucNavigation)
				.Include(s => s.ThuongHieuNavigation)
				.OrderByDescending(s => s.Id)
				.Where(s => s.IdDanhmuc == product.IdDanhmuc)
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

	}
}

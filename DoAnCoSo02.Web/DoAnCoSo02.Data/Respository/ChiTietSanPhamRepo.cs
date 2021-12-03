using DoAnCoSo02.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.Data.Respository
{
	public class ChiTietSanPhamRepo:RepositoryBase
	{
		public ChiTietSanPhamRepo() : base() { }
		public ChiTietSanPhamRepo(DoAnCoSo2DbContext _db) : base() { }
		//show
		public async Task<IEnumerable<DetailProductDTO>> ShowList()
		{
			var list = await db.DetailProducts
				.Include(s => s.ThuongHieuNavigation)
				.Include(s => s.DanhmucNavigation)
				.Include(s => s.ChatLieuNavigation)
				.OrderByDescending(s => s.Id)
				.Select( s => new DetailProductDTO() {
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
					Mota = s.Mota,
					Review = s.Review,
					BaoHanh = s.BaoHanh,
					KichThuoc = s.KichThuoc,
					XuatXu = s.XuatXu,
					TrangThai = s.TrangThai,
					DanhmucNavigation = s.DanhmucNavigation,
					ChatLieuNavigation = s.ChatLieuNavigation,
					ThuongHieuNavigation = s.ThuongHieuNavigation,
					KhuyenMaiNavigation = s.KhuyenMaiNavigation,
					CommentsNavigation = s.CommentsNavigation,
					DetaiCheckoutNavigation = s.DetaiCheckoutNavigation,
					DanhMucHinhNavigation = s.DanhMucHinhNavigation
				})
				.ToListAsync();
			return list;
		}
		public IEnumerable<DetailProductDTO> ShowListProduct()
		{
			var list = db.DetailProducts
				.OrderByDescending(s => s.Id).ToList();
			return list;
		}
		public async Task<bool> AddProduct(DetailProductDTO detailProduct)
		{
			try
			{
				var theloai = db.DanhMucProducts.SingleOrDefault(x => x.Id == detailProduct.IdDanhmuc);
				var thuonghieu = db.ThuongHieuProducts.SingleOrDefault(x => x.Id == detailProduct.IdThuongHieu);
				var discount = db.KhuyenMaiProducts.SingleOrDefault(x => x.id == detailProduct.IdDiscount);
				var chatlieu = db.ProductMaterials.SingleOrDefault(x => x.id == detailProduct.IdChatLieu);
				detailProduct.ChatLieuNavigation = chatlieu;
				detailProduct.ThuongHieuNavigation = thuonghieu;
				detailProduct.DanhmucNavigation = theloai;
				detailProduct.KhuyenMaiNavigation = discount;
				detailProduct.NgayThem = DateTime.Now;
				await db.DetailProducts.AddAsync(detailProduct);
				await db.SaveChangesAsync();
				return true;
			}
			catch
			{
				return false;
			}
		}
		//get 
		public DetailProductDTO GetProduct(int key)
		{
			return db.DetailProducts
				.Include(x => x.DanhmucNavigation)
				.Include(x => x.ThuongHieuNavigation)
				.Include(x => x.ChatLieuNavigation)
				.Include(x => x.KhuyenMaiNavigation)
				.SingleOrDefault(s => s.Id == key);
		}
		public async Task<DetailProductDTO> GetSanPham(int id)
		{
			return await db.DetailProducts
				.Where(s => s.Id == id)
				.Select(s => new DetailProductDTO()
				{
					Id = s.Id,
					MaSP = s.MaSP,TenSP = s.TenSP,AnhSanPham = s.AnhSanPham,
					ListFileAnh = s.ListFileAnh,UrlAnhSanPham = s.UrlAnhSanPham,
					Size = s.Size,Soluong = s.Soluong,NgayThem = s.NgayThem,
					GiaSP = s.GiaSP,Mota = s.Mota,Review = s.Review,BaoHanh = s.BaoHanh,KichThuoc = s.KichThuoc,
					XuatXu = s.XuatXu,TrangThai = s.TrangThai,IdChatLieu = s.IdChatLieu,
					IdDanhmuc = s.IdDanhmuc,IdDiscount = s.IdDiscount,IdThuongHieu = s.IdThuongHieu,
					DanhmucNavigation = s.DanhmucNavigation,ChatLieuNavigation = s.ChatLieuNavigation,
					ThuongHieuNavigation = s.ThuongHieuNavigation,KhuyenMaiNavigation = s.KhuyenMaiNavigation,
					CommentsNavigation = s.CommentsNavigation,DetaiCheckoutNavigation = s.DetaiCheckoutNavigation,
					DanhMucHinhNavigation = s.DanhMucHinhNavigation
				}).SingleOrDefaultAsync();
		}
		//sua
		public async Task<DetailProductDTO> UpdateProduct(DetailProductDTO detailProduct)
		{
			try
			{
				var obj = await db.DetailProducts.FindAsync(detailProduct.Id);
				var thuonghieu = db.ThuongHieuProducts.SingleOrDefault(x => x.Id == detailProduct.IdThuongHieu);
				var theloai = db.DanhMucProducts.SingleOrDefault(x => x.Id == detailProduct.IdDanhmuc);
				var discount = db.KhuyenMaiProducts.SingleOrDefault(x => x.id == detailProduct.IdDiscount);
				var chatlieu = db.ProductMaterials.SingleOrDefault(x => x.id == detailProduct.IdChatLieu);
				if (obj != null)
				{
					obj.TenSP = detailProduct.TenSP;
					obj.GiaSP = detailProduct.GiaSP;
					obj.Size = detailProduct.Size;
					obj.DanhMucHinhNavigation = detailProduct.DanhMucHinhNavigation;
					obj.Soluong = detailProduct.Soluong;
					obj.UrlAnhSanPham = detailProduct.UrlAnhSanPham;
					obj.IdThuongHieu = detailProduct.IdThuongHieu;
					obj.DanhmucNavigation = detailProduct.DanhmucNavigation = theloai;
					obj.ThuongHieuNavigation = detailProduct.ThuongHieuNavigation = thuonghieu;
					obj.KhuyenMaiNavigation = detailProduct.KhuyenMaiNavigation = discount;
					obj.ChatLieuNavigation = detailProduct.ChatLieuNavigation = chatlieu;
					obj.Mota = detailProduct.Mota;
					obj.IdDanhmuc = detailProduct.IdDanhmuc;
					obj.Review = detailProduct.Review;
					obj.NgayThem = detailProduct.NgayThem;
					obj.IdDiscount = detailProduct.IdDiscount;
					obj.XuatXu = detailProduct.XuatXu;
					obj.BaoHanh = detailProduct.BaoHanh;
					obj.KichThuoc = detailProduct.KichThuoc;
					obj.TrangThai = detailProduct.TrangThai;
				}
				return detailProduct;
			}
			catch (Exception)
			{
				throw new Exception("Erro Edit Detail Product");
			}	
		}
		public async void DeleteListImage(int id)
		{
			List<DanhMucHinhDTO> danhmuchinh = await db.DanhMucHinhs
				.Where(x => x.IsAnhSanPham.IdDanhMucHinh == id).ToListAsync();
			if (danhmuchinh != null)
			{
				foreach (var item in danhmuchinh)
				{
					item.IsAnhSanPham = null;
					await db.SaveChangesAsync();
				}
			}
		}
		// xóa
		public void DeleteProduct(int id)
		{
			try
			{
				List<DanhMucHinhDTO> danhmuchinh = db.DanhMucHinhs
				.Where(x => x.IsAnhSanPham.Id == id).ToList();
				if (danhmuchinh != null)
				{
					foreach (var item in danhmuchinh)
					{
						item.IsAnhSanPham.IdDanhMucHinh = null;
						var finds = db.DanhMucHinhs.Find(item.Id);
						db.DanhMucHinhs.Remove(finds);
					}
				}
				var find = db.DetailProducts.Find(id);
				db.DetailProducts.Remove(find);
				db.SaveChanges();
			}
			catch (Exception)
			{
				throw new Exception("erro remove !!!");
			}
		}
		//show list
		public List<DanhMucProductDTO> GetListDanhmuc()
		{
			return db.DanhMucProducts.ToList();
		}
		public List<ProductMaterialDTO> GetListChatlieu()
		{
			return db.ProductMaterials.ToList();
		}
		public List<ThuongHieuProductDTO> GetListThuonghieu()
		{
			return db.ThuongHieuProducts.ToList();
		}
		public List<KhuyenMaiProductDTO> GetListKhuyenmai()
		{
			return db.KhuyenMaiProducts.ToList();
		}
		// ------
		public DanhMucProductDTO GetDanhMuc(int id)
		{
			return db.DanhMucProducts.Find(id);
		}
		public ProductMaterialDTO GetChatLieu(int id)
		{
			return db.ProductMaterials.Find(id);
		}
		public ThuongHieuProductDTO GetThuongHieu(int id)
		{
			return db.ThuongHieuProducts.Find(id);
		}

	}
}

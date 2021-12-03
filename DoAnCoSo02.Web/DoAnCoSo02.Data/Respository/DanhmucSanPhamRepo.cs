using DoAnCoSo02.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.Data.Respository
{
	public class DanhmucSanPhamRepo : RepositoryBase
	{
		public DanhmucSanPhamRepo() : base() { }
		public DanhmucSanPhamRepo(DoAnCoSo2DbContext _db) : base(_db) { }
		public void AddDanhMuc(DanhMucProductDTO typeProduct)
		{
			var item = db.DanhMucProducts.OrderByDescending(x => x.Id).Take(1).FirstOrDefault();
			var theloai = db.danhmucRooms.Where(x => x.Id == typeProduct.IdRoomInterface).SingleOrDefault();
			if (item == null)
			{
				var newtype = new DanhMucProductDTO()
				{
					MaLoai = "SP000",
					TenLoai = typeProduct.TenLoai,
					AnhDaiDien = typeProduct.AnhDaiDien,
					urlAnhDaiDien = typeProduct.urlAnhDaiDien,
					ImageName = typeProduct.ImageName,
					IdRoomInterface = typeProduct.IdRoomInterface,
					InterfaceRoomNavigation = theloai,
				};
				db.DanhMucProducts.Add(newtype);
				db.SaveChanges();
			}
			else
			{
				var newtype = new DanhMucProductDTO()
				{
					MaLoai = "SP0" + Convert.ToString(item.Id + 1),
					TenLoai = typeProduct.TenLoai,
					AnhDaiDien = typeProduct.AnhDaiDien,
					urlAnhDaiDien = typeProduct.urlAnhDaiDien,
					ImageName = typeProduct.ImageName,
					IdRoomInterface = typeProduct.IdRoomInterface,
					InterfaceRoomNavigation = theloai,
				};
				db.DanhMucProducts.Add(newtype);
				db.SaveChanges();
			}
		}
		public DanhMucProductDTO GetLoaiSp(int key)
		{
			return db.DanhMucProducts.Find(key);
		}
		public void DeleteLoaiSp(int key)
		{
			var del = db.DanhMucProducts.Find(key);
			db.DanhMucProducts.Remove(del);
		}
		public IEnumerable<DanhMucProductDTO> GetAllLoaiSanPham()
		{
			return db.DanhMucProducts
				.Select(s => new DanhMucProductDTO() { 
					Id = s.Id,
					IdRoomInterface = s.IdRoomInterface,
					ImageName = s.ImageName,
					MaLoai = s.MaLoai,
					TenLoai=s.TenLoai,
					urlAnhDaiDien = s.urlAnhDaiDien
				})
				.ToList();
		}
		public DanhMucProductDTO UpdateDanhMuc(DanhMucProductDTO danhmuc)
		{
			try
			{
				var obj = db.DanhMucProducts.Find(danhmuc.Id);
				var danhmcuroom = db.danhmucRooms.SingleOrDefault(x => x.Id == danhmuc.IdRoomInterface);
				if (obj != null)
				{
					obj.InterfaceRoomNavigation = danhmcuroom;
					obj.IdRoomInterface = danhmuc.IdRoomInterface;
				}
				return danhmuc;
			}
			catch (Exception)
			{
				throw new Exception("Erro Edit Detail Product");
			}
		}
	}
}

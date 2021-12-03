using DoAnCoSo02.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.Data.Respository
{
	public class ChatLieuRepo:RepositoryBase
	{
		public ChatLieuRepo() : base() { }
		public ChatLieuRepo(DoAnCoSo2DbContext _db) : base(_db) { }

		public void AddChatLieu(ProductMaterialDTO chatlieu)
		{
			var item = db.ProductMaterials.OrderByDescending(x => x.id).Take(1).FirstOrDefault();
			if (item == null)
			{
				var newtype = new ProductMaterialDTO()
				{
					TenChatLieu = chatlieu.TenChatLieu,
					TenAnh = chatlieu.TenAnh,
					urlAnhChatLieu = chatlieu.urlAnhChatLieu,
					AnhChatLieu = chatlieu.AnhChatLieu
				};
				db.ProductMaterials.Add(newtype);
				db.SaveChanges();
			}
			else
			{
				var newtype = new ProductMaterialDTO()
				{
					TenChatLieu = chatlieu.TenChatLieu,
					TenAnh = chatlieu.TenAnh,
					urlAnhChatLieu = chatlieu.urlAnhChatLieu,
					AnhChatLieu = chatlieu.AnhChatLieu
				};
				db.ProductMaterials.Add(newtype);
				db.SaveChanges();
			}
		}
		public IEnumerable<ProductMaterialDTO> ShowListChatLieu()
		{
			return db.ProductMaterials
				.OrderByDescending(x => x.id)
				.ToList();
		}
		public ProductMaterialDTO GetChatLieu(int key)
		{
			return db.ProductMaterials.Find(key);
		}

		public void UpdateChatLieu(ProductMaterialDTO chatlieu)
		{
			var obj = db.ProductMaterials.Find(chatlieu.id);
			if (obj != null)
			{
				obj.TenChatLieu = chatlieu.TenChatLieu;
				obj.urlAnhChatLieu = chatlieu.urlAnhChatLieu;
				obj.TenAnh = chatlieu.TenAnh;
				obj.AnhChatLieu = chatlieu.AnhChatLieu;
			}
		}
		public void DeleteChatLieu(int id)
		{
			List<DetailProductDTO> detailProduct = db.DetailProducts
				.Where(x => x.Id == id).ToList();
			foreach (var item in detailProduct)
			{
				item.IdChatLieu = null;
			}
			db.ProductMaterials.Remove(db.ProductMaterials.Find(id));
			db.SaveChanges();
		}
	}
}

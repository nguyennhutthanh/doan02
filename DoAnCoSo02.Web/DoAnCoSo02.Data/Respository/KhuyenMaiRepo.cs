using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DoAnCoSo02.DTOs;
using Microsoft.EntityFrameworkCore;

namespace DoAnCoSo02.Data.Respository
{
	public class KhuyenMaiRepo:RepositoryBase
	{
		public KhuyenMaiRepo() : base() { }
		public KhuyenMaiRepo(DoAnCoSo2DbContext _db) : base(_db) { }
		public async Task<bool> AddProduct(KhuyenMaiProductDTO khuyenMai)
		{
			try
			{
				var add = new KhuyenMaiProductDTO()
				{
					Sale = khuyenMai.Sale,
					Expire = khuyenMai.Expire
				};
				await db.KhuyenMaiProducts.AddAsync(add);
				await db.SaveChangesAsync();
				return true;
			}
			catch
			{
				return false;
			}
		}
		public async Task<IEnumerable<KhuyenMaiProductDTO>> ListKhuyenMai()
		{
			return await db.KhuyenMaiProducts
				.OrderByDescending(x => x.id)
				.Include(s => s.ProductCodeNavigation)
				.Select(x => new KhuyenMaiProductDTO() { 
					id = x.id,
					Expire = x.Expire,
					Sale = x.Sale,
					IdProduct = x.IdProduct,
					ProductCodeNavigation = x.ProductCodeNavigation
				})
				.ToListAsync();
		}
		public void DeleteDiscount(int id)
		{
			List<DetailProductDTO> detailProduct = db.DetailProducts
				.Where(x => x.IdDiscount == id).ToList();
			foreach (var item in detailProduct)
			{
				item.IdDiscount = null;
			}
			db.KhuyenMaiProducts.Remove(db.KhuyenMaiProducts.Find(id));
			db.SaveChanges();
		}
	}
}

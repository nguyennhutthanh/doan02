using DoAnCoSo02.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.Data.Respository
{
	public class CheckoutRepo: RepositoryBase
	{
		public CheckoutRepo() : base() { }
		public CheckoutRepo(DoAnCoSo2DbContext _db) : base(_db) { }
		public void AddCheckout(CheckoutProductDTO checkout)
		{
			db.CheckoutProducts.Add(checkout);
			db.SaveChanges();
		}
		public void SoluongSanPham(int id, int soluong)
		{
			var de = db.DetailProducts.Find(id);
			if(de.Soluong <= 0)
			{
				de.Soluong = 0;
			}
			de.Soluong -= soluong;
			db.SaveChanges();
		}
		public async Task<DetailProductDTO> getProduct(int id)
		{ 
			var data = await db.DetailProducts.SingleOrDefaultAsync(x => x.Id == id);
			return data;
		}
	}
}

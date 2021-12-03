using DoAnCoSo02.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.Data.Respository
{
	public class ThuongHieuRepo:RepositoryBase
	{
        public ThuongHieuRepo() : base() { }
        public ThuongHieuRepo(DoAnCoSo2DbContext _db) : base(_db) { }

        public void AddTrademark(ThuongHieuProductDTO thuonghieu)
        {
			var item = db.ThuongHieuProducts.OrderByDescending(x => x.Id).Take(1).FirstOrDefault();
			if (item == null)
			{
				var newTH = new ThuongHieuProductDTO()
				{
					TenThuongHieu = thuonghieu.TenThuongHieu,
					UrlAnhThuongHieu = thuonghieu.UrlAnhThuongHieu,
					AnhThuongHieu = thuonghieu.AnhThuongHieu
				};
				db.ThuongHieuProducts.Add(newTH);
				db.SaveChanges();
			}
			else
			{
				var newTH = new ThuongHieuProductDTO()
				{
					TenThuongHieu = thuonghieu.TenThuongHieu,
					UrlAnhThuongHieu = thuonghieu.UrlAnhThuongHieu,
					AnhThuongHieu = thuonghieu.AnhThuongHieu
				};
				db.ThuongHieuProducts.Add(newTH);
				db.SaveChanges();
			}
		}
        public IEnumerable<ThuongHieuProductDTO> ShowListThuongHieu()
        {
            return db.ThuongHieuProducts
                .OrderByDescending(x => x.Id)
                .ToList();
        }
        public ThuongHieuProductDTO GetThuongHieu(int key)
        {
            return db.ThuongHieuProducts.Find(key);
        }
        public void DeleteThuongHieu(int id)
        {
            List<DetailProductDTO> detailProduct = db.DetailProducts
                .Where(x => x.IdThuongHieu == id).ToList();
            foreach (var item in detailProduct)
            {
                item.IdThuongHieu = null;
            }
			var find = db.ThuongHieuProducts.Find(id);
			db.ThuongHieuProducts.Remove(find);
            db.SaveChanges();
        }
    }
}

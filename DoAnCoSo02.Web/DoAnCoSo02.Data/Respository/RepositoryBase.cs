using DoAnCoSo02.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.Data.Respository
{
	public class RepositoryBase
	{
		protected DoAnCoSo2DbContext db;
		public RepositoryBase()
		{
			db = new DoAnCoSo2DbContext();
		}
		public RepositoryBase(DoAnCoSo2DbContext _db)
		{
			db = _db;
		}
		public void Save()
		{
			db.SaveChanges();
		}
		public async void SaveChangesAsync()
		{
			await db.SaveChangesAsync();
		}
	}
}

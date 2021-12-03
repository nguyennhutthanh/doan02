using DoAnCoSo02.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.Data.Respository
{
	public class UserAccountRepo:RepositoryBase
	{

		public UserAccountRepo() : base() { }
		public UserAccountRepo(DoAnCoSo2DbContext _db) : base(_db) { }

		public void CreateAccountUser (CusTomerDTO customer)
		{
			db.CusTomers.Add(customer);
			db.SaveChanges();
		}
		public CusTomerDTO CheckKH(string username, string pass)
		{
			var data = db.CusTomers.Where(x => x.UserName == username && x.PassWp == pass && x.IsBlocked != true).SingleOrDefault();
			if (data != null)
			{
				return data;
			}
			else
			{
				return new CusTomerDTO();
			}
		}
	}
}

using DoAnCoSo02.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.Data.Respository
{
	public class LoginRepo: RepositoryBase
	{
		public LoginRepo() : base() { }
		public LoginRepo(DoAnCoSo2DbContext _db) : base(_db) { }
        public async Task<bool> CheckAccount(string taikhoan, string matkhau)
        {
            return await db.Admins.AnyAsync(x => x.UserName == taikhoan && x.Password == matkhau && x.IsBlocked != true);
        }
        public async Task<AdminDTO> LoginAdmin(string username)
        {
            var admin = await db.Admins.Where(x => x.UserName == username).FirstOrDefaultAsync();
            return admin;
        }
        public async Task<bool> LoginSuccessfully(string username, string hashPassword)
        {
            return await db.Admins.AnyAsync(u => u.UserName.Equals(username)
                && u.Password.Equals(hashPassword)
                && u.IsBlocked != true);
        }
        public async Task<bool> IsSupper(string username)
        {
            var admin = await db.Admins.SingleOrDefaultAsync(item => item.UserName.Equals(username));
            if (admin == null)
            {
                return false;
            }
            return admin.IsSuperAdmin ? true : false;
        }
        public string GetAvatar(string username)
        {
            var data = db.Admins
                .Where(s => s.UserName == username)
                .FirstOrDefault().Avatar;
            return data;
        }
        public AdminDTO GetAdmin(int id)
		{
            var data = db.Admins.Select( s=> new AdminDTO()
			{
                Id = s.Id,
                UserName = s.UserName,
                Salt = s.Salt,
                Email = s.Email,
                Avatar = s.Avatar,
                IsAdmin = s.IsAdmin,
                IsSuperAdmin = s.IsSuperAdmin,
                IsBlocked = s.IsBlocked,
			}).SingleOrDefault(s => s.Id == id);
            return data;
        }
    }
}

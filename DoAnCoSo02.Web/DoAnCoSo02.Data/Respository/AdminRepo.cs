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
	public class AdminRepo:RepositoryBase
	{
		public AdminRepo() : base() { }
		public AdminRepo(DoAnCoSo2DbContext _db) : base(_db) { }
		public async Task<bool> AddAdmin(AdminDTO taikhoan)
		{
			try
			{
				await db.Admins.AddAsync(taikhoan);
				await db.SaveChangesAsync();
				return true;
			}
			catch
			{
				return false;
			}
		}
		public AdminDTO getAdminByUsername(string Username)
		{
			return db.Admins.Where(x => x.UserName == Username).FirstOrDefault();
		}
		public AdminDTO Find(int id)
		{
			return db.Admins.Find(id);
		}
		public void Delete(int id)
		{
			db.Admins.Remove(db.Admins.Find(id));
		}
		public async Task<IEnumerable<AdminDTO>> ShoListAdmin()
		{
			var list = await db.Admins
				.OrderByDescending(s => s.Id)
				.Where(s => s.IsBlocked == false)
				.ToListAsync();
			return list;
		}
		public async Task<IEnumerable<AdminDTO>> ShoListBlockAdmin()
		{
			var list = await db.Admins
				.OrderByDescending(s => s.Id)
				.Where(s => s.IsBlocked == true)
				.ToListAsync();
			return list;
		}
		public async Task<AdminDTO> BlockAdmin(int id)
		{
			var block = await db.Admins.Where(s => s.Id == id).SingleOrDefaultAsync();
			if(block != null)
			{
				block.IsBlocked = true;
			}
			await db.SaveChangesAsync();
			return block;
		}
		public async Task<AdminDTO> UnBlockAdmin(int id)
		{
			var block = await db.Admins.Where(s => s.Id == id).SingleOrDefaultAsync();
			if (block != null)
			{
				block.IsBlocked = false;
			}
			await db.SaveChangesAsync();
			return block;
		}
		public async Task<AdminDTO> UpdateAdmin(AdminDTO admin)
		{
			var obj = await db.Admins.FindAsync(admin.Id);
			if (obj != null)
			{
				obj.UserName = admin.UserName;
				obj.Avatar = admin.Avatar;
				obj.Email = admin.Email;
				obj.IsAdmin = admin.IsAdmin;
				obj.IsBlocked = admin.IsBlocked;
				obj.IsSuperAdmin = admin.IsSuperAdmin;
			}
			return admin;
		}
	}
}

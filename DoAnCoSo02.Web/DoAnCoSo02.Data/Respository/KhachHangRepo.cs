using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DoAnCoSo02.DTOs;
using Microsoft.EntityFrameworkCore;

namespace DoAnCoSo02.Data.Respository
{
	public class KhachHangRepo:RepositoryBase
	{
		public KhachHangRepo() : base() { }
		public KhachHangRepo(DoAnCoSo2DbContext _db) : base(_db) { }

		public async Task<List<CusTomerDTO>> ListUser()
		{
			var list = await db.CusTomers
				.OrderByDescending(s => s.IdKhach)
				.Where(s => s.IsBlocked == false)
				.Select(s => new CusTomerDTO()
				{
					SDT = s.SDT,
					DiaChi = s.DiaChi,
					Email = s.Email,
					HoTen = s.HoTen,
					IsBlocked = s.IsBlocked,
					NgayTaoTK = s.NgayTaoTK,
					PassWp = s.PassWp,
					UserName = s.UserName,
					IdKhach = s.IdKhach
				}).ToListAsync();
			return list;
		}
		public async Task<List<CusTomerDTO>> ListBlockUser()
		{
			var list = await db.CusTomers
				.OrderByDescending(s => s.IdKhach)
				.Where(s => s.IsBlocked == true)
				.Select(s => new CusTomerDTO()
				{
					SDT = s.SDT,
					DiaChi = s.DiaChi,
					Email = s.Email,
					HoTen = s.HoTen,
					IsBlocked = s.IsBlocked,
					NgayTaoTK = s.NgayTaoTK,
					PassWp = s.PassWp,
					UserName = s.UserName,
					IdKhach = s.IdKhach
				}).ToListAsync();
			return list;
		}
		public async Task<CusTomerDTO> BlockUser(int id)
		{
			var block = await db.CusTomers.Where(s => s.IdKhach == id).SingleOrDefaultAsync();
			if (block != null)
			{
				block.IsBlocked = true;
			}
			await db.SaveChangesAsync();
			return block;
		}
		public async Task<CusTomerDTO> UnBlockUser(int id)
		{
			var block = await db.CusTomers.Where(s => s.IdKhach == id).SingleOrDefaultAsync();
			if (block != null)
			{
				block.IsBlocked = false;
			}
			await db.SaveChangesAsync();
			return block;
		}
		public void Delete(int id)
		{
			db.CusTomers.Remove(db.CusTomers.Find(id));
		}
	}
}

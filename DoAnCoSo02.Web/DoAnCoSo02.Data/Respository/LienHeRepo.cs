using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DoAnCoSo02.DTOs;
using Microsoft.EntityFrameworkCore;

namespace DoAnCoSo02.Data.Respository
{
	public class LienHeRepo: RepositoryBase
	{
		public LienHeRepo() : base() { }
		public LienHeRepo(DoAnCoSo2DbContext _db) : base(_db) { }

		public async void AddContact(ContactDTO contact)
		{
			await db.Contacts.AddAsync(contact);
			await db.SaveChangesAsync();
		}
		public async Task<List<ContactDTO>> ListLienHe()
		{
			var list = await db.Contacts
				.OrderByDescending(s => s.Id)
				.Select(s => new ContactDTO()
				{
					DiaChi = s.DiaChi,
					SDT = s.SDT,
					Email = s.Email,
					HoTen = s.HoTen,
					NoiDung = s.NoiDung,
					TrangThai = s.TrangThai,
					Id = s.Id
				}).ToListAsync();
			return list;
		}
		public async Task<ContactDTO> SetViewTrangThai(int id)
		{
			var find = db.Contacts.Where(s => s.Id == id).SingleOrDefault();
			if(find != null)
			{
				find.TrangThai = true;
			}
			db.SaveChanges();
			return find;
		}
		public async Task<ContactDTO> ViewLienHe(int id)
		{
			var list = await db.Contacts
				.Where(s => s.Id == id)
				.Select(s => new ContactDTO()
				{
					DiaChi = s.DiaChi,
					SDT = s.SDT,
					Email = s.Email,
					HoTen = s.HoTen,
					NoiDung= s.NoiDung,
					TrangThai= s.TrangThai,
					Id= s.Id
				})
				.SingleOrDefaultAsync();
			return list;
		}
		public void deleteLienHe(int id)
		{
			var del = db.Contacts.Find(id);
			db.Contacts.Remove(del);
			db.SaveChanges();
		}
	}
}

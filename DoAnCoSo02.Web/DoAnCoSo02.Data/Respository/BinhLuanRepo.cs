using DoAnCoSo02.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.Data.Respository
{
	public class BinhLuanRepo:RepositoryBase
	{
		public BinhLuanRepo() : base() { }
		public BinhLuanRepo(DoAnCoSo2DbContext _db) : base(_db) { }
		#region Client
		public async void CreateComment(CommentDTO comments)
		{
			await db.Comments.AddAsync(comments);
			db.SaveChanges();
		}
		public async Task<List<CommentDTO>> ListComment(int id)
		{
			var list = await db.Comments
				.Where(x => x.IdProduct == id)
				.OrderByDescending(x => x.id)
				.Select(s => new CommentDTO() {
					id = s.id,
					Email = s.Email,
					Name = s.Name,
					NoiDung = s.NoiDung,
					IdProduct =s.IdProduct,
					NgayBinhLuan = s.NgayBinhLuan,
					TrangThai = s.TrangThai,
					Spam= s.Spam,
					IdComment = s.IdComment
				})
				.Take(5).ToListAsync();
			return list;
		}
		public async Task<DetailProductDTO> getProduct(int id)
		{
			return await db.DetailProducts.SingleOrDefaultAsync(x => x.Id == id);
		}
		#endregion

		#region Admin
		// show list coment không khóa
		public async Task<List<CommentDTO>> ShowListComment()
		{
			var list = await db.Comments
				.OrderByDescending(x => x.id)
				.Where(s => s.Spam == false)
				.Select(s => new CommentDTO()
				{
					id = s.id,
					Email = s.Email,
					IdComment = s.IdComment,
					IdProduct = s.IdProduct,
					Name = s.Name,
					NgayBinhLuan = s.NgayBinhLuan,
					NoiDung = s.NoiDung,
					TrangThai = s.TrangThai,
					Spam = s.Spam
				}).ToListAsync();
			return list;
		}
		// show list coment đã khóa
		public async Task<List<CommentDTO>> ShowListSpam()
		{
			var list = await db.Comments
				.OrderByDescending(x => x.id)
				.Where(s => s.Spam == true)
				.Select(s => new CommentDTO()
				{
					id = s.id,
					Email = s.Email,
					IdComment = s.IdComment,
					IdProduct =s.IdProduct,
					Name = s.Name,
					NgayBinhLuan = s.NgayBinhLuan,
					NoiDung = s.NoiDung,
					TrangThai = s.TrangThai,
					Spam = s.Spam
				}).ToListAsync();
			return list;
		}
		// xem review comment
		public async Task<CommentDTO> ViewComment(int id)
		{
			var view = await db.Comments
				.Where(s => s.id == id)
				.Select(s => new CommentDTO()
				{
					id = s.id,
					Email = s.Email,
					IdComment = s.IdComment,
					IdProduct = s.IdProduct,
					Name = s.Name,
					NgayBinhLuan = s.NgayBinhLuan,
					NoiDung = s.NoiDung,
					TrangThai = s.TrangThai,
					Spam = s.Spam
				})
				.SingleOrDefaultAsync();
			return view;
		}
		//chặn bình luận
		public async Task<CommentDTO> SpamBinhLuan(int id)
		{
			var find = await db.Comments.Where(s => s.id == id).SingleOrDefaultAsync();
			if(find != null)
			{
				find.Spam = true;
			}
			await db.SaveChangesAsync();
			return find;
		}
		// mở chặn bình luận
		public async Task<CommentDTO> OpenSpamBinhLuan(int id)
		{
			var find = await db.Comments.Where(s => s.id == id).SingleOrDefaultAsync();
			if (find != null)
			{
				find.Spam = false;
			}
			await db.SaveChangesAsync();
			return find;
		}
		public async Task<CommentDTO> SetOpenView(int id)
		{
			var open = await db.Comments.Where(s => s.id == id).SingleOrDefaultAsync();
			if(open != null)
			{
				open.TrangThai = true;
			}
			await db.SaveChangesAsync();
			return open;
		}
		public void DeleteComment(int id)
		{
			db.Comments.Remove(db.Comments.Find(id));
			db.SaveChanges();
		}
		#endregion

	}
}

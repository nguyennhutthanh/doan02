using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DoAnCoSo02.DTOs;
using DoAnCoSo02.Data.Respository;
using Microsoft.AspNetCore.Hosting;
using DoAnCoSo02.Web.Common;
using System.IO;

namespace DoAnCoSo02.Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AdminController : ControllerBase
	{
		AdminRepo adminRepo;
		IWebHostEnvironment _host;
		public AdminController(IWebHostEnvironment host)
		{
			adminRepo = new AdminRepo();
			_host = host;
		}
		[HttpGet(template: "listadmin")]
		public async Task<IActionResult> GetListAdmin()
		{
			var list = await adminRepo.ShoListAdmin();
			if(list == null)
			{
				return Ok(false);
			}
			return Ok(list);
		}
		[HttpGet(template: "listblock")]
		public async Task<IActionResult> GetListAdminBlock()
		{
			var list = await adminRepo.ShoListBlockAdmin();
			if (list == null)
			{
				return Ok(false);
			}
			return Ok(list);
		}
		[HttpGet(template: "blockadmin/{id}")]
		public async Task<IActionResult> GetBlockAdmin(int id)
		{
			var block =  await adminRepo.BlockAdmin(id);
			if(block != null)
			{
				return Ok(block);
			}
			else
			{
				return Ok(false);
			}
		}
		[HttpGet(template: "unblockadmin/{id}")]
		public async Task<IActionResult> GetUnBlockAdmin(int id)
		{
			var block = await adminRepo.UnBlockAdmin(id);
			if (block != null)
			{
				return Ok(block);
			}
			else
			{
				return Ok(false);
			}
		}
		[HttpPost]
		public async Task<IActionResult> PostAdmin([FromForm] AdminDTO admin)
		{
			admin.Salt = PassWordHelper.CreateSalt(4, 8);
			admin.Password = PassWordHelper.EncryptSHA512(admin.Password, admin.Salt);
			if (admin.UrlAvatar != null)
			{
				var IsImage = ImagesPath.IsImage(admin.UrlAvatar);
				if (IsImage == true)
				{
					var uniqueFileName = ImagesPath.GetUniqueFileName(admin.UrlAvatar.FileName);
					var uploads = Path.Combine(_host.WebRootPath, "ImagesAdmin");
					var filePath = Path.Combine(uploads, uniqueFileName);
					admin.UrlAvatar.CopyTo(new FileStream(filePath, FileMode.Create));
					admin.Avatar = ImagesPath.PathImages("ImagesAdmin/", uniqueFileName);
				}
				else
				{
					throw new Exception("File ảnh không phù hợp");
				}
			}
		 bool issucess = await adminRepo.AddAdmin(admin);
			if (issucess)
			{
				return Ok(true);
			}
			else
			{
				return Ok(false);
			}
		}
		[HttpPut("{id}")]
		public async Task<IActionResult> PutAdmin([FromForm] AdminDTO admin)
		{
			var find = adminRepo.Find(admin.Id);
			if (find != null)
			{
				find.Password = PassWordHelper.EncryptSHA512(admin.Password, find.Salt);
				if (admin.UrlAvatar != null)
				{
					var IsImage = ImagesPath.IsImage(admin.UrlAvatar);
					if (IsImage == true)
					{
						var uniqueFileName = ImagesPath.GetUniqueFileName(admin.UrlAvatar.FileName);
						var uploads = Path.Combine(_host.WebRootPath, "ImagesAdmin");
						var filePath = Path.Combine(uploads, uniqueFileName);
						admin.UrlAvatar.CopyTo(new FileStream(filePath, FileMode.Create));
						admin.Avatar = ImagesPath.PathImages("ImagesAdmin/", uniqueFileName);
					}
					else
					{
						throw new Exception("File ảnh không phù hợp");
					}
				}
				await adminRepo.UpdateAdmin(admin);
				adminRepo.SaveChangesAsync();
				return Ok(true);
			}
			else
			{
				return Ok(false);
			}
		}
		[HttpDelete("{id}")]
		public IActionResult DeleteAccount(int id)
		{
			adminRepo.Delete(id);
			adminRepo.SaveChangesAsync();
			return Ok(true);
		}

	}
}

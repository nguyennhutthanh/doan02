using DoAnCoSo02.Data.Respository;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DoAnCoSo02.DTOs;
using DoAnCoSo02.Web.Common;
using System.IO;

namespace DoAnCoSo02.Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ChatLieuSpController : ControllerBase
	{
		ChatLieuRepo chatlieuRepo;
		IWebHostEnvironment _host;
		public ChatLieuSpController(IWebHostEnvironment host)
		{
			chatlieuRepo = new ChatLieuRepo();
			_host = host;
		}
		[HttpGet]
		public IActionResult GetListChatLieu()
		{
			var list = chatlieuRepo.ShowListChatLieu();
			if(list == null)
			{
				return Ok(false);
			}
			return Ok(list);
		}
		[HttpPost]
		public ActionResult PostChatLieuSp([FromForm]ProductMaterialDTO ChatlieuSp)
		{
			if(ChatlieuSp.TenChatLieu == null)
			{
				return Ok(false);
			}
			if(ChatlieuSp.AnhChatLieu != null)
			{
				var IsImage = ImagesPath.IsImage(ChatlieuSp.AnhChatLieu);
				if (IsImage == true)
				{
					var uniqueFileName = ImagesPath.GetUniqueFileName(ChatlieuSp.AnhChatLieu.FileName);
					var uploads = Path.Combine(_host.WebRootPath, "ImagesChatLieu");
					var filePath = Path.Combine(uploads, uniqueFileName);
					ChatlieuSp.AnhChatLieu.CopyTo(new FileStream(filePath, FileMode.Create));
					ChatlieuSp.TenAnh = uniqueFileName;
					ChatlieuSp.urlAnhChatLieu = ImagesPath.PathImages("ImagesChatLieu/", uniqueFileName);
				}
				else
				{
					throw new Exception("File ảnh không phù hợp");
				}
			}
			chatlieuRepo.AddChatLieu(ChatlieuSp);
			chatlieuRepo.Save();
			return Ok(ChatlieuSp);
		}
		[HttpPut("{id}")]
		public IActionResult PutChatLieuSp([FromForm] ProductMaterialDTO ChatlieuSp)
		{
			var find = chatlieuRepo.GetChatLieu(ChatlieuSp.id);
			if(ChatlieuSp.TenChatLieu != null)
			{
				find.TenChatLieu = ChatlieuSp.TenChatLieu;
			}
			if(ChatlieuSp.AnhChatLieu != null)
			{
				var IsImage = ImagesPath.IsImage(ChatlieuSp.AnhChatLieu);
				if (IsImage == true)
				{
					var uniqueFileName = ImagesPath.GetUniqueFileName(ChatlieuSp.AnhChatLieu.FileName);
					var uploads = Path.Combine(_host.WebRootPath, "ImagesChatLieu");
					var filePath = Path.Combine(uploads, uniqueFileName);
					ChatlieuSp.AnhChatLieu.CopyTo(new FileStream(filePath, FileMode.Create));
					find.TenAnh = uniqueFileName;
					find.urlAnhChatLieu = ImagesPath.PathImages("ImagesChatLieu/",uniqueFileName);
				}
				else
				{
					throw new Exception("File ảnh không phù hợp");
				}
			}
			chatlieuRepo.Save();
			return Ok(ChatlieuSp);
		}
		[HttpDelete("{id}")]
		public IActionResult DeleteChatLieuSp(int id)
		{
			chatlieuRepo.DeleteChatLieu(id);
			chatlieuRepo.Save();
			return Ok(true);
		}
	}
}

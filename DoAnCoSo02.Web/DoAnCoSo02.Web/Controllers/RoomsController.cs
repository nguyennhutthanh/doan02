using DoAnCoSo02.Data.Respository;
using DoAnCoSo02.DTOs;
using DoAnCoSo02.Web.Common;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DoAnCoSo02.Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class RoomsController : ControllerBase
	{
		private readonly RoomRepo roomRepo;
		IWebHostEnvironment _host;
		public RoomsController(IWebHostEnvironment host)
		{
			roomRepo = new RoomRepo();
			_host = host;
		}
		[HttpGet]
		public IActionResult GetListRoom()
		{
			var list = roomRepo.ShowListRoom();
			if (list == null)
			{
				return Ok(false);
			}
			return Ok(list);
		}
		[HttpPost]
		public ActionResult PostAddRoom([FromForm] InterfaceRoomDTO rooms)
		{
			if (rooms.TenRoom == null)
			{
				return Ok(false);
			}
			if (rooms.ImageRoom != null)
			{
				var IsImage = ImagesPath.IsImage(rooms.ImageRoom);
				if (IsImage == true)
				{
					var uniqueFileName = ImagesPath.GetUniqueFileName(rooms.ImageRoom.FileName);
					var uploads = Path.Combine(_host.WebRootPath, "ImageRooms");
					var filePath = Path.Combine(uploads, uniqueFileName);
					rooms.ImageRoom.CopyTo(new FileStream(filePath, FileMode.Create));
					rooms.urlImageRoom = ImagesPath.PathImages("ImageRooms/", uniqueFileName);
				}
				else
				{
					throw new Exception("File ảnh không phù hợp");
				}
			}
			roomRepo.AddRoom(rooms);
			roomRepo.Save();
			return Ok(rooms);
		}
		[HttpPut("{id}")]
		public IActionResult PutEditRoom([FromForm] InterfaceRoomDTO rooms)
		{
			var find = roomRepo.GetRoom(rooms.Id);
			if (rooms.TenRoom != null)
			{
				find.TenRoom = rooms.TenRoom;
			}
			if (rooms.ImageRoom != null)
			{
				var IsImage = ImagesPath.IsImage(rooms.ImageRoom);
				if (IsImage == true)
				{
					var uniqueFileName = ImagesPath.GetUniqueFileName(rooms.ImageRoom.FileName);
					var uploads = Path.Combine(_host.WebRootPath, "ImageRooms");
					var filePath = Path.Combine(uploads, uniqueFileName);
					rooms.ImageRoom.CopyTo(new FileStream(filePath, FileMode.Create));
					find.urlImageRoom = ImagesPath.PathImages("ImageRooms/", uniqueFileName);
				}
				else
				{
					throw new Exception("File ảnh không phù hợp");
				}
			}
			roomRepo.Save();
			return Ok(rooms);
		}
		[HttpDelete("{id}")]
		public IActionResult DeleteRoom(int id)
		{
			roomRepo.DeleteRoom(id);
			roomRepo.Save();
			return Ok(true);
		}
		[HttpGet(template: "GetlistRooms")]
		public IActionResult GetListKhuyenMai()
		{
			var list = roomRepo.GetListRoom();
			return Ok(list);
		}
	}
}

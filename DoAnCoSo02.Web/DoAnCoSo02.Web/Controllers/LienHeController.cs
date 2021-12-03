using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DoAnCoSo02.DTOs;
using DoAnCoSo02.Data.Respository;
using Microsoft.AspNetCore.Hosting;

namespace DoAnCoSo02.Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class LienHeController : ControllerBase
	{
		LienHeRepo lienheRepo;
		IWebHostEnvironment _host;
		public LienHeController(IWebHostEnvironment host)
		{
			lienheRepo = new LienHeRepo();
			_host = host;
		}
		[HttpGet]
		public async Task<IActionResult> GetListLienHe()
		{
			var list = await lienheRepo.ListLienHe();
			if(list != null)
			{
				return Ok(list);
			}
			else
			{
				return Ok(false);
			}	
		}
		[HttpGet("{id}")]
		public async Task<IActionResult> ViewLienHe(int id)
		{
			await lienheRepo.SetViewTrangThai(id);
			var detaillienhe = await lienheRepo.ViewLienHe(id);
			if(detaillienhe != null)
			{
				return Ok(detaillienhe);
			}
			else
			{
				return Ok(false);
			}
		}
		[HttpDelete("{id}")]
		public IActionResult DeleteLienHe(int id)
		{
			lienheRepo.deleteLienHe(id);
			lienheRepo.Save();
			return Ok(true);
		}
		[HttpPost]
		public async Task<IActionResult> AddContact([FromForm] ContactDTO contact)
		{
			lienheRepo.AddContact(contact);
			return Ok(true);
		}
	}
}

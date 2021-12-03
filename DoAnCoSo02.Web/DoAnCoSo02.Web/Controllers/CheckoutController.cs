using DoAnCoSo02.Data.Respository;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DoAnCoSo02.DTOs;
using Newtonsoft.Json;
using DoAnCoSo02.Web.ViewModel;

namespace DoAnCoSo02.Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CheckoutController : ControllerBase
	{
		CheckoutRepo checkoutRepo;
		IWebHostEnvironment _host;
		public CheckoutController(IWebHostEnvironment host)
		{
			checkoutRepo = new CheckoutRepo();

			_host = host;
		}
		[HttpPost(template:"CheckoutNotAccount")]
		public async Task<IActionResult> GetCheckout([FromForm] CheckoutViewModel detailCheckout)
		{
			List<DetailCheckoutDTO> chiTietDonDatHangList = new List<DetailCheckoutDTO>();
			foreach (var temp in detailCheckout.checkoutProduct)
			{
				var result = JsonConvert.DeserializeObject<Test>(temp);
				var thisProduct = await checkoutRepo.getProduct(result.Id);
				var ChiTietDonDatHang = new DetailCheckoutDTO()
				{
					SoLuong = result.CartQuantity,
					CheckoutProduct = thisProduct,
					ThanhTien = (int)(result.GiaSP - (result.GiaSP * result.KhuyenMaiNavigation.Sale) / 100),
				};
				chiTietDonDatHangList.Add(ChiTietDonDatHang);
				checkoutRepo.SoluongSanPham(result.Id, result.CartQuantity);
			}
			CheckoutProductDTO newCheckout = new CheckoutProductDTO()
			{
				HoTen = detailCheckout.HoTen,
				SDT = detailCheckout.SDT,
				Email = detailCheckout.Email,
				GhiChu = detailCheckout.GhiChu,
				TongSanPhamMua = detailCheckout.TongLuongSanPham,
				TongHoaDon = detailCheckout.TongHoaDon,
				DiaChi = detailCheckout.DiaChi + " " + detailCheckout.Huyen + " " + detailCheckout.Tinh,
				NgayDat = DateTime.Now,
				DetailCheckoutNavigation = chiTietDonDatHangList
			};
			checkoutRepo.AddCheckout(newCheckout);
			return Ok(true);
		}
		[HttpPost(template: "CheckoutAccount")]
		public async Task<IActionResult> GetCheckoutAccount([FromForm] CheckoutViewModel detailCheckout)
		{
			List<DetailCheckoutDTO> chiTietDonDatHangList = new List<DetailCheckoutDTO>();
			foreach (var temp in detailCheckout.checkoutProduct)
			{
				var result = JsonConvert.DeserializeObject<Test>(temp);
				var thisProduct = await checkoutRepo.getProduct(result.Id);
				var ChiTietDonDatHang = new DetailCheckoutDTO()
				{
					SoLuong = result.CartQuantity,
					CheckoutProduct = thisProduct,
				};
				chiTietDonDatHangList.Add(ChiTietDonDatHang);
				checkoutRepo.SoluongSanPham(result.Id, result.CartQuantity);
			}
			CheckoutProductDTO newCheckout = new CheckoutProductDTO()
			{
				HoTen = detailCheckout.HoTen,
				SDT = detailCheckout.SDT,
				Email = detailCheckout.Email,
				GhiChu = detailCheckout.GhiChu,
				TongSanPhamMua = detailCheckout.TongLuongSanPham,
				TongHoaDon = detailCheckout.TongHoaDon,
				DiaChi = detailCheckout.DiaChi,
				NgayDat = DateTime.Now,
				DetailCheckoutNavigation = chiTietDonDatHangList
			};
			checkoutRepo.AddCheckout(newCheckout);
			return Ok(true);
		}
	}
}

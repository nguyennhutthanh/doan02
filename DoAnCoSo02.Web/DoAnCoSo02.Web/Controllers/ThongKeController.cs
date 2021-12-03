using DoAnCoSo02.Data.Respository;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DoAnCoSo02.Data;
using Microsoft.EntityFrameworkCore;

namespace DoAnCoSo02.Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ThongKeController : ControllerBase
	{
		ThongkeRepo thongkeRepo;
		IWebHostEnvironment _host;
		DoAnCoSo2DbContext data;
		public ThongKeController(IWebHostEnvironment host)
		{
			thongkeRepo = new ThongkeRepo();
			data = new DoAnCoSo2DbContext();
			_host = host;
		}
		[HttpGet(template: "CountDonHang")]
		public async Task<IActionResult> GetCountDonHang()
		{
			var countDonHang = await thongkeRepo.CountDonHang();
			return Ok(countDonHang);
		}
		[HttpGet(template: "CountChiTietDon")]
		public async Task<IActionResult> GetCountChiTietDon()
		{
			var countChiTietDon = await thongkeRepo.CountChiTietDonHang();
			return Ok(countChiTietDon);
		}
		[HttpGet(template: "CountSanPham")]
		public async Task<IActionResult> GetCountSanPham()
		{
			var countSanPham = await thongkeRepo.CountSanPham();
			return Ok(countSanPham);
		}
		[HttpGet(template: "CountLienHe")]
		public async Task<IActionResult> GetCountLienHe()
		{
			var countLienHe = await thongkeRepo.CountLienHe();
			return Ok(countLienHe);
		}
		[HttpGet(template: "CountBinhLuan")]
		public async Task<IActionResult> GetCountBinhLuan()
		{
			var countBinhLuan = await thongkeRepo.CountBinhLuan();
			return Ok(countBinhLuan);
		}
		[HttpGet(template: "CountDanhMuc")]
		public async Task<IActionResult> GetCountDanhMuc()
		{
			var countDanhMuc = await thongkeRepo.CountDanhMuc();
			return Ok(countDanhMuc);
		}
		[HttpGet(template: "CountThuongHieu")]
		public async Task<IActionResult> GetCountThuongHieu()
		{
			var countThuongHieu = await thongkeRepo.CountThuongHieu();
			return Ok(countThuongHieu);
		}
		[HttpGet(template: "CountSanPhamKhuyenMai")]
		public async Task<IActionResult> GetCountSanPhamKhuyenMai()
		{
			var countKhuyenMai = await thongkeRepo.CountSanPhamKM();
			return Ok(countKhuyenMai);
		}
		[HttpGet(template: "CountKhachHang")]
		public async Task<IActionResult> GetCountKhachHang()
		{
			var countKH = await thongkeRepo.CountKhachHang();
			return Ok(countKH);
		}
		[HttpGet(template: "SumTonKho")]
		public async Task<IActionResult> GetSumTonKho()
		{
			var countTonKho = await thongkeRepo.CountSoLuongSpNhapKho();
			return Ok(countTonKho);
		}
		[HttpGet(template: "SoLuongSpDaBan")]
		public async Task<IActionResult> GetSLSanPhamDaBan()
		{
			var sum = await thongkeRepo.SumSoLuongSanPhamDaBan();
			return Ok(sum);
		}
		//thong ke san pham ban chay
		[HttpGet(template: "ThongKeSanPhamBanChay")]
		public async Task<IActionResult> GetSanPhamBanChay()
		{
			var query = await data.DetailCheckouts
				.Include(s => s.CheckoutNavigation)
				.GroupBy(s => s.CheckoutProduct.TenSP)
				.Select(s => new { name = s.Key, count = s.Sum(x => x.SoLuong) })
				.ToListAsync();
			return Ok(query);
		}
		//thong ke doanh thu cac thang trong nam
		[HttpGet(template: "ThongKeDoanhThuThang")]
		public async Task<IActionResult> GetDoanhThuThang()
		{
			var dt = DateTime.Now;
			var query = await data.CheckoutProducts.Where(s => s.NgayDat <= dt)
			.OrderBy(x => x.NgayDat.Month)
			.Select(g => new
			{
				ngay = g.NgayDat.Day,
				month = g.NgayDat.Month,
				time = g.NgayDat.TimeOfDay,
				total = g.DetailCheckoutNavigation.Sum(s => s.CheckoutProduct.GiaSP * s.SoLuong)
			}).ToListAsync();
			var Revenue = query.GroupBy(s => s.month)
				.Select(s => new { month = s.Key, 
					doanhthu = s.Sum(s => s.total) })
				.ToList();
			return Ok(Revenue);
		}
		[HttpGet(template: "ThongKeDoanhThuNgayTrongThang")]
		public async Task<IActionResult> GetDoanhThuNgayCuaThang()
		{
			var dt = DateTime.Now;
			var query = await data.CheckoutProducts.Where(x => x.NgayDat <= dt)
			.OrderBy(x => x.NgayDat.Month)
			.Select(g => new
			{
				ngay = g.NgayDat.Day,
				month = g.NgayDat.Month,
				time = g.NgayDat.TimeOfDay,
				total = g.DetailCheckoutNavigation.Sum(s => s.CheckoutProduct.GiaSP * s.SoLuong)
			}).ToListAsync();
				var list = query.GroupBy(s => s.ngay)
					.Select(s => new { day = s.Key, thang = s.FirstOrDefault().month, doanhthu = s.Sum(s => s.total) })
					.ToList();
			return Ok(list);
		}
	}
}

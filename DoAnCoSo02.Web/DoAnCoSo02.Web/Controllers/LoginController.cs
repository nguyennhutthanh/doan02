using DoAnCoSo02.Data.Respository;
using DoAnCoSo02.Web.Common;
using DoAnCoSo02.Web.ViewModel;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class LoginController : ControllerBase
	{
		IWebHostEnvironment host;
		private readonly IConfiguration _config;
		private readonly LoginRepo loginRepo;
		public LoginController(IWebHostEnvironment _host, IConfiguration config)
		{
			loginRepo = new LoginRepo();
			host = _host;
			_config = config;
		}
		[HttpPost(template: "Loginadmin")]
		public async Task<IActionResult> PostLogin(LoginViewModel login)
		{
			var JwtToken = new JwtSecurityTokenHandler();
			var pass = await loginRepo.LoginAdmin(login.UserName);
			var hashPassword = PassWordHelper.EncryptSHA512(login.Password, pass.Salt);
			var isLogged = await loginRepo.LoginSuccessfully(pass.UserName, hashPassword);
			var isSupper = await loginRepo.IsSupper(pass.UserName);
			if (isLogged == true)
			{
				var claims = new List<Claim>{
					new Claim(ClaimTypes.Actor, loginRepo.GetAvatar(pass.UserName)),
					new Claim(ClaimTypes.Name, pass.UserName),
					new Claim(ClaimTypes.Role, isSupper ? "SuperAdmin" : "Admin"),
					new Claim("id", pass.Id.ToString()),
					new Claim("Name", pass.UserName),
					new Claim("Url", loginRepo.GetAvatar(pass.UserName)),
					new Claim("Custom", "Login Success"),
				};
				var keyToken = Encoding.UTF8.GetBytes(_config["JwtConfig:Key"]);
				var symmetricSecurityKey = new SymmetricSecurityKey(keyToken);
				var credentials = new SigningCredentials(symmetricSecurityKey,
					SecurityAlgorithms.HmacSha512Signature);

				var SuccessToken = new JwtSecurityToken(
					issuer: _config["JwtConfig:Issuer"],
					audience: _config["JwtConfig:Issuer"],
					claims: claims,
					expires: DateTime.Now.AddDays(7),
					signingCredentials: credentials
					);

				var Jwtoken = JwtToken.WriteToken(SuccessToken);
				CookieOptions option = new CookieOptions
				{
					Expires = DateTime.Now.AddMonths(1),
					HttpOnly = true,
					IsEssential = true,
					Path = "/",
				};
				var token = String(Jwtoken);
				int id = int.Parse(token.Claims.First(x => x.Type == "id").Value);
				var data = loginRepo.GetAdmin(id);
				HttpContext.Response.Cookies.Append("Jwtoken", Jwtoken, option);

				return Ok(new { accessToken = Jwtoken, user = data } );
			}
			else
			{
				ModelState.AddModelError("", "Sai tên đăng nhập hoặc mật khẩu");
				ModelState.AddModelError("", "Hãy liên hệ quản lý BooLap nếu bạn nghĩ đây là lỗi");
				return BadRequest("Error Can not Account");
			}
		}
		[HttpPost(template: "Logout")]
		public async Task<IActionResult> PostLogout()
		{
			Response.Cookies.Delete("Jwtoken");
			return Ok(new { message = "Delete Token Success" });
		}
		[HttpGet]
		public IActionResult GetCookie()
		{
			var resques = Request.Cookies["Jwtoken"];
			var token = String(resques);
			int id = int.Parse(token.Claims.First(x => x.Type == "id").Value);
			var data = loginRepo.GetAdmin(id);
			return Ok(data);
		}
		[NonAction]
		public JwtSecurityToken String(string jwt)
		{
			var JwtToken = new JwtSecurityTokenHandler();
			var keyToken = Encoding.UTF8.GetBytes(_config["JwtConfig:Key"]);
			JwtToken.ValidateToken(jwt, new TokenValidationParameters
			{
				ValidateIssuerSigningKey = true,
				IssuerSigningKey = new SymmetricSecurityKey(keyToken),
				ValidateIssuer = true,
				ValidIssuer = _config["JwtConfig:Issuer"],
				ValidateAudience = true,
				ValidAudience = _config["JwtConfig:Issuer"],
				ValidateLifetime = true,
				RequireExpirationTime = false,
			}, out SecurityToken validate);

			return (JwtSecurityToken)validate;
		}
	} 
}

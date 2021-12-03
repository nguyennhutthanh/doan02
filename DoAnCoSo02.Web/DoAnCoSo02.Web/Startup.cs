using DoAnCoSo02.Data;
using DoAnCoSo02.Data.Respository;
using DoAnCoSo02.Web.Common;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.Web
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			//services.Configure<JwtConfig>(Configuration.GetSection("JwtConfig"));
			services.AddAuthentication(option =>
			{
				option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
				option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

			}).AddJwtBearer(jwt =>
			{
				jwt.SaveToken = true;
				jwt.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuerSigningKey = true,
					IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JwtConfig:Key"])),
					ValidateIssuer = true,
					ValidIssuer = Configuration["JwtConfig:Issuer"],
					ValidateAudience = true,
					ValidAudience = Configuration["JwtConfig:Issuer"],
					ValidateLifetime = true,
					RequireExpirationTime = false,
				};
			});
			services.AddHttpContextAccessor();
			services.AddDbContext<DoAnCoSo2DbContext>();
			services.AddControllers();
			services.AddCors(options =>
			{
				options.AddPolicy("Policy1", builder =>
				{
					builder.WithOrigins("http://localhost:3000", "http://localhost:3001")
					.WithMethods("POST", "GET", "PUT", "DELETE")
					.WithHeaders(HeaderNames.ContentType)
					.AllowCredentials();
				});
			});
			services.AddScoped<ChiTietSanPhamRepo>();
			services.AddScoped<DanhmucSanPhamRepo>();
			services.AddScoped<ChatLieuRepo>();
			services.AddScoped<ThuongHieuRepo>();
			services.AddScoped<AdminRepo>();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseCors("Policy1");

			app.UseStaticFiles();

			app.UseHttpsRedirection();

			app.UseRouting();

			app.UseAuthorization();
			app.UseAuthentication();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}

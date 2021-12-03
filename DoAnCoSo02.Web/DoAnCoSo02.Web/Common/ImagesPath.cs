using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DoAnCoSo02.Web.Common
{
	public class ImagesPath
	{
		public class ImageActive
		{
			public string PNG { get; set; }
			public string JPG { get; set; }
			public string JPEG { get; set; }
			public string BMP { get; set; }
			public string GIF { get; set; }
			public string TIFF { get; set; }
			public string ImagesPath { get; set; }
		}
		public static bool IsImage(IFormFile postedFile)
		{
			var config = new ConfigurationBuilder()
			   .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
			   .AddJsonFile("appsettings.json").Build();
			var IamgeActive = config.GetSection(nameof(ImageActive)).Get<ImageActive>();
			var path = Path.GetExtension(postedFile.FileName).ToLower();
			if (path != IamgeActive.JPG && path != IamgeActive.PNG && path != IamgeActive.GIF &&
			path != IamgeActive.JPEG && path != IamgeActive.BMP && path != IamgeActive.TIFF)
			{
				return false;
			}
			return true;
		}
		public static string PathImages(string forderImages,string imageName)
		{
			var config = new ConfigurationBuilder()
			   .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
			   .AddJsonFile("appsettings.json").Build();
			var IamgeActive = config.GetSection(nameof(ImageActive)).Get<ImageActive>();
			string postedFile = IamgeActive.ImagesPath + forderImages + imageName;
			return postedFile;
		}
		public static string GetUniqueFileName(string fileName)
		{
			fileName = Path.GetFileName(fileName);
			return Path.GetFileNameWithoutExtension(fileName)
				+ "_" + Guid.NewGuid().ToString().Substring(0, 4)
				+ Path.GetExtension(fileName);
		}
	}
}

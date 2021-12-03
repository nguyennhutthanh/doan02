﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.DTOs
{
	[Table("Config")]
	public class ConfigDTO
	{
		[Key]
		public string Name { get; set; }
		public string Value { get; set; }
	}
}

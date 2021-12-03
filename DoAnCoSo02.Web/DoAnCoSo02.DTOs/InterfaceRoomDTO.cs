using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.DTOs
{
	public class InterfaceRoomDTO
	{
        public InterfaceRoomDTO()
        {
            DanhMucRoom = new HashSet<DanhMucProductDTO>();
        }
        [Key]
        public int Id { get; set; }
        public string TenRoom { get; set; }
        public string ImageRoomName { get; set; }
        public string urlImageRoom { get; set; }
        [NotMapped]
        public IFormFile ImageRoom { get; set; }
        public ICollection<DanhMucProductDTO> DanhMucRoom { get; set; }
    }
}

using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.DTOs
{
    [Table("DetailProduct")]
    public class DetailProductDTO
	{
        public DetailProductDTO()
        {
            DanhmucNavigation = new DanhMucProductDTO();
            ThuongHieuNavigation = new ThuongHieuProductDTO();
            ChatLieuNavigation = new ProductMaterialDTO();
            KhuyenMaiNavigation = new KhuyenMaiProductDTO();
            CommentsNavigation = new HashSet<CommentDTO>();
            DetaiCheckoutNavigation = new HashSet<DetailCheckoutDTO>();
            DanhMucHinhNavigation = new HashSet<DanhMucHinhDTO>();
        }
        [Key]
        public int Id { get; set; }
        [DisplayName("Mã Sản Phẩm")]
        public string MaSP { get; set; }
        [DisplayName("Tên Sản Phẩm")]
        public string TenSP { get; set; }
        [DisplayName("Giá Sản Phẩm")]
        public double GiaSP { get; set; }
        public string UrlAnhSanPham { get; set; }
        [NotMapped]
        public IFormFile AnhSanPham { get; set; }
        [NotMapped]
        public List<IFormFile> ListFileAnh { get; set; }
        [DisplayName("Kích Thước")]
        public string Size { get; set; }
        [DisplayName("Số Lượng")]
        public int Soluong { get; set; }
        [DisplayName("Ngày Thêm")]
        public DateTime NgayThem { get; set; }
        [DisplayName("Mô Tả")]
        public string Mota { get; set; }
        [DisplayName("Giới Thiệu")]
        public string Review { get; set; }
        public string XuatXu { get; set; }
        public string BaoHanh { get; set; }
        public string KichThuoc { get; set; }
        public double GiaKhuyenMai { get; set; }
        public bool? TrangThai { get; set; }
        public int? IdDanhmuc { get; set; }
        public int? IdBinhLuan { get; set; }
        public int? IdThuongHieu { get; set; }
        public int? IdDatHang { get; set; }
        public int? IdChatLieu { get; set; }
        public int? IdDanhMucHinh { get; set; }
        public int? IdDiscount { get; set; }
        public virtual DanhMucProductDTO DanhmucNavigation { get; set; }
        public virtual ThuongHieuProductDTO ThuongHieuNavigation { get; set; }
        public virtual ProductMaterialDTO ChatLieuNavigation { get; set; }
        public virtual KhuyenMaiProductDTO KhuyenMaiNavigation { get; set; }
        public virtual ICollection<CommentDTO> CommentsNavigation { get; set; }
        public virtual ICollection<DetailCheckoutDTO> DetaiCheckoutNavigation { get; set; }
        public ICollection<DanhMucHinhDTO> DanhMucHinhNavigation { get; set; }
    }
}

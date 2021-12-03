using DoAnCoSo02.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.Data.Respository
{
	public class RoomRepo: RepositoryBase
	{
		public RoomRepo() : base() { }
		public RoomRepo(DoAnCoSo2DbContext _db) : base(_db) { }

		public void AddRoom(InterfaceRoomDTO room)
		{
			var item = db.danhmucRooms.OrderByDescending(x => x.Id).Take(1).FirstOrDefault();
			if (item == null)
			{
				var newRoom = new InterfaceRoomDTO()
				{
					TenRoom = room.TenRoom,
					urlImageRoom = room.urlImageRoom,
					ImageRoom = room.ImageRoom,
					ImageRoomName = room.ImageRoomName,
				};
				db.danhmucRooms.Add(newRoom);
				db.SaveChanges();
			}
			else
			{
				var newRoom = new InterfaceRoomDTO()
				{
					TenRoom = room.TenRoom,
					urlImageRoom = room.urlImageRoom,
					ImageRoom = room.ImageRoom,
					ImageRoomName = room.ImageRoomName,
				};
				db.danhmucRooms.Add(newRoom);
				db.SaveChanges();
			}
		}
		public List<InterfaceRoomDTO> ShowListRoom()
		{
			var list = db.danhmucRooms
				.OrderByDescending(x => x.Id)
				.Select(s => new InterfaceRoomDTO()
				{
					Id = s.Id,
					ImageRoom = s.ImageRoom,
					ImageRoomName = s.ImageRoomName,
					TenRoom = s.TenRoom,
					urlImageRoom = s.urlImageRoom
				}).ToList();

			return list;
		}
		public InterfaceRoomDTO GetRoom(int key)
		{
			return db.danhmucRooms.Find(key);
		}

		public void DeleteRoom(int id)
		{
			List<DanhMucProductDTO> danhmucProduct = db.DanhMucProducts
				.Where(x => x.IdRoomInterface == id).ToList();
			foreach (var item in danhmucProduct)
			{
				item.IdRoomInterface = null;
				item.InterfaceRoomNavigation = null;
			}
			var find = db.danhmucRooms.Find(id);
			db.danhmucRooms.Remove(find);
			db.SaveChanges();
		}
		public List<InterfaceRoomDTO> GetListRoom()
		{
			return db.danhmucRooms.ToList();
		}
	}
}
